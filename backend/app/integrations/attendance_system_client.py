import os
import uuid
import logging
from datetime import datetime, timezone
import httpx
from sqlalchemy import text
from app.database.database import SessionLocal

logger = logging.getLogger("integrations.attendance")

MOCK_ATTENDANCE_URL = os.getenv("ATTENDANCE_SYSTEM_URL", "http://localhost:9001")

def sync_attendance(since: str = None) -> dict:
    """
    Calls the mock attendance system and upserts into the Attendance table.
    Skips duplicate records matched by student_id + course_id + date.
    """
    records = []
    endpoint = f"{MOCK_ATTENDANCE_URL}/attendance-records"
    params = {"since": since} if since else {}

    # Attempt to fetch from external attendance HTTP endpoint
    try:
        with httpx.Client(timeout=4.0) as client:
            resp = client.get(endpoint, params=params)
            if resp.status_code == 200:
                records = resp.json()
            else:
                logger.warning(f"Attendance service returned HTTP {resp.status_code}: {resp.text}")
    except Exception as e:
        logger.info(f"Could not connect to external attendance service at {endpoint} ({e}). Using mock dataset fallback.")
        try:
            from mock_services.mock_attendance_system import MOCK_ATTENDANCE_DATA
            records = [r for r in MOCK_ATTENDANCE_DATA if not since or r["date"] >= since]
        except Exception as fallback_err:
            raise RuntimeError(f"Failed to fetch attendance records: {e}; fallback failed: {fallback_err}")

    synced_count = 0
    skipped_count = 0
    now_iso = datetime.now(timezone.utc).isoformat()

    db = SessionLocal()
    try:
        for rec in records:
            student_id = rec.get("student_id")
            course_id = rec.get("course_id")
            date_val = rec.get("date")

            if not student_id or not course_id or not date_val:
                continue

            # Check for existing duplicate by student_id + course_id + date
            check_sql = text("""
                SELECT id FROM attendance
                WHERE student_id = :student_id
                  AND course_id = :course_id
                  AND date = :date_val
            """)
            existing = db.execute(check_sql, {
                "student_id": student_id,
                "course_id": course_id,
                "date_val": date_val
            }).fetchone()

            if existing:
                skipped_count += 1
                continue

            # Insert new record
            record_id = rec.get("id") or f"att-sync-{uuid.uuid4().hex[:8]}"
            status_val = rec.get("status", "PRESENT")
            present_cnt = rec.get("present_count", 1 if status_val == "PRESENT" else 0)
            absent_cnt = rec.get("absent_count", 1 if status_val == "ABSENT" else 0)
            total_cnt = rec.get("total_count", 1)
            topic_status = rec.get("topic_status", "COMPLETED")
            topic_covered = rec.get("actual_topic_covered", "")

            insert_sql = text("""
                INSERT INTO attendance (
                    id, student_id, course_id, date, status,
                    present_count, absent_count, total_count,
                    topic_status, actual_topic_covered
                ) VALUES (
                    :id, :student_id, :course_id, :date, :status,
                    :present_count, :absent_count, :total_count,
                    :topic_status, :actual_topic_covered
                )
            """)

            db.execute(insert_sql, {
                "id": record_id,
                "student_id": student_id,
                "course_id": course_id,
                "date": date_val,
                "status": status_val,
                "present_count": present_cnt,
                "absent_count": absent_cnt,
                "total_count": total_cnt,
                "topic_status": topic_status,
                "actual_topic_covered": topic_covered
            })
            synced_count += 1

        db.commit()
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()

    result = {
        "status": "SUCCESS",
        "synced_records": synced_count,
        "skipped_records": skipped_count,
        "total_records_processed": len(records),
        "timestamp": now_iso
    }
    logger.info(f"Attendance sync completed: {result}")
    return result
