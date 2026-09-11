import os
import logging
from datetime import datetime, timezone
from apscheduler.schedulers.background import BackgroundScheduler
from sqlalchemy import text
from app.database.database import SessionLocal
from app.integrations.attendance_system_client import sync_attendance
from app.integrations.lesson_plan_system_client import sync_lesson_plans

logger = logging.getLogger("integrations.scheduler")

# Background scheduler instance
scheduler = BackgroundScheduler()

def record_sync_status(integration_name: str, status: str, records_synced: int = 0, details: str = ""):
    """
    Persists integration synchronization telemetry into the SyncStatus database table.
    
    Why SyncStatus table over a JSON file:
    1. Concurrency Safety: APScheduler executes sync jobs in background worker threads,
       while FastAPI threads concurrently read the status for API responses. Database
       transactions prevent race conditions and corrupt/partial file writes.
    2. Resilience & Cluster Portability: Multi-worker Uvicorn processes and containerized
       environments share a central SQL database without requiring synchronized filesystem volumes.
    3. ACID Guarantees: Updates are atomic and durable across server crashes.
    """
    db = SessionLocal()
    try:
        now_dt = datetime.now(timezone.utc)
        upsert_sql = text("""
            INSERT INTO sync_status (
                integration_name, last_sync_time, last_sync_status, records_synced, details, updated_at
            ) VALUES (
                :name, :time, :status, :synced, :details, :updated
            )
            ON CONFLICT(integration_name) DO UPDATE SET
                last_sync_time = :time,
                last_sync_status = :status,
                records_synced = :synced,
                details = :details,
                updated_at = :updated
        """)
        db.execute(upsert_sql, {
            "name": integration_name,
            "time": now_dt,
            "status": status,
            "synced": records_synced,
            "details": details,
            "updated": now_dt
        })
        db.commit()
    except Exception as e:
        db.rollback()
        logger.error(f"Failed to record sync status for {integration_name}: {e}")
    finally:
        db.close()

def job_sync_attendance():
    """APScheduler task: sync external attendance logs every 15 minutes."""
    logger.info("Executing scheduled attendance sync job...")
    try:
        res = sync_attendance()
        details_msg = f"Synced {res['synced_records']} records, skipped {res['skipped_records']} duplicates."
        record_sync_status(
            integration_name="attendance_system",
            status="SUCCESS",
            records_synced=res["synced_records"],
            details=details_msg
        )
    except Exception as e:
        logger.error(f"Attendance sync failed: {e}", exc_info=True)
        record_sync_status(
            integration_name="attendance_system",
            status="FAILED",
            records_synced=0,
            details=str(e)
        )
        try:
            from app.services.notification_service import create_notification
            create_notification(
                user_id="user-hod",
                type="CRITICAL",
                title="Integration Sync Failed: Attendance System",
                message=f"Scheduled external attendance synchronization failed: {str(e)}",
                link="/hod/integrations"
            )
        except Exception as notif_err:
            logger.warning(f"Could not dispatch failure notification: {notif_err}")

def job_sync_lesson_plans():
    """APScheduler task: sync external lesson plans / topics every 15 minutes."""
    logger.info("Executing scheduled lesson plan sync job...")
    try:
        res = sync_lesson_plans()
        details_msg = f"Synced {res['synced_records']} topics, skipped {res['skipped_records']} existing."
        record_sync_status(
            integration_name="lesson_plan_system",
            status="SUCCESS",
            records_synced=res["synced_records"],
            details=details_msg
        )
    except Exception as e:
        logger.error(f"Lesson plan sync failed: {e}", exc_info=True)
        record_sync_status(
            integration_name="lesson_plan_system",
            status="FAILED",
            records_synced=0,
            details=str(e)
        )
        try:
            from app.services.notification_service import create_notification
            create_notification(
                user_id="user-hod",
                type="CRITICAL",
                title="Integration Sync Failed: Lesson Plan System",
                message=f"Scheduled external lesson plan synchronization failed: {str(e)}",
                link="/hod/integrations"
            )
        except Exception as notif_err:
            logger.warning(f"Could not dispatch failure notification: {notif_err}")

def get_all_sync_status() -> dict:
    """Read latest sync status for both integrations from the sync_status table."""
    db = SessionLocal()
    result = {
        "attendance_system": {
            "integration_name": "attendance_system",
            "last_sync_time": None,
            "last_sync_status": "NEVER_RUN",
            "records_synced": 0,
            "details": "Job scheduled to run every 15 minutes."
        },
        "lesson_plan_system": {
            "integration_name": "lesson_plan_system",
            "last_sync_time": None,
            "last_sync_status": "NEVER_RUN",
            "records_synced": 0,
            "details": "Job scheduled to run every 15 minutes."
        },
        "scheduler_running": scheduler.running
    }

    try:
        rows = db.execute(text("SELECT integration_name, last_sync_time, last_sync_status, records_synced, details FROM sync_status")).fetchall()
        for r in rows:
            name = r[0]
            if name in result:
                result[name] = {
                    "integration_name": name,
                    "last_sync_time": str(r[1]) if r[1] else None,
                    "last_sync_status": r[2] or "UNKNOWN",
                    "records_synced": r[3] or 0,
                    "details": r[4] or ""
                }
    except Exception as e:
        logger.warning(f"Error querying sync_status table: {e}")
    finally:
        db.close()

    result["scheduler_running"] = scheduler.running
    return result

def run_sync_now(integration: str = None) -> dict:
    """Manually trigger immediate synchronization for one or all integrations."""
    out = {}
    if not integration or integration == "attendance_system":
        job_sync_attendance()
        out["attendance_system"] = "triggered"
    if not integration or integration == "lesson_plan_system":
        job_sync_lesson_plans()
        out["lesson_plan_system"] = "triggered"
    return {"status": "success", "results": out, "sync_status": get_all_sync_status()}

def start_scheduler():
    """Initializes and starts the APScheduler background scheduler."""
    if not scheduler.running:
        # Schedule jobs every 15 minutes
        scheduler.add_job(
            job_sync_attendance,
            trigger="interval",
            minutes=15,
            id="sync_attendance_job",
            replace_existing=True
        )
        scheduler.add_job(
            job_sync_lesson_plans,
            trigger="interval",
            minutes=15,
            id="sync_lesson_plans_job",
            replace_existing=True
        )
        scheduler.start()
        logger.info("APScheduler started with 15-minute sync interval for attendance and lesson plans.")

        # Run an initial sync on startup in the background
        scheduler.add_job(
            run_sync_now,
            id="initial_sync_job",
            replace_existing=True
        )

def stop_scheduler():
    """Shuts down the APScheduler background scheduler."""
    if scheduler.running:
        scheduler.shutdown(wait=False)
        logger.info("APScheduler stopped.")
