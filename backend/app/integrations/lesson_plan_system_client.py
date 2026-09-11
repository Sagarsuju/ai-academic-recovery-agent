import os
import uuid
import logging
from datetime import datetime, timezone
import httpx
from sqlalchemy import text
from app.database.database import SessionLocal

logger = logging.getLogger("integrations.lesson_plans")

MOCK_LESSON_PLAN_URL = os.getenv("LESSON_PLAN_SYSTEM_URL", "http://localhost:9002")

def sync_lesson_plans(course_id: str = None) -> dict:
    """
    Calls the mock lesson plan system and upserts planned topics into the Topic table.
    Only adds topics not already present, matched by course_id + title.
    """
    plans = []
    endpoint = f"{MOCK_LESSON_PLAN_URL}/lesson-plans"
    params = {"course_id": course_id} if course_id else {}

    # Attempt to fetch from external lesson plan HTTP endpoint
    try:
        with httpx.Client(timeout=4.0) as client:
            resp = client.get(endpoint, params=params)
            if resp.status_code == 200:
                plans = resp.json()
            else:
                logger.warning(f"Lesson plan service returned HTTP {resp.status_code}: {resp.text}")
    except Exception as e:
        logger.info(f"Could not connect to external lesson plan service at {endpoint} ({e}). Using mock dataset fallback.")
        try:
            from mock_services.mock_lesson_plan_system import MOCK_LESSON_PLANS
            plans = [p for p in MOCK_LESSON_PLANS if not course_id or p["course_id"] == course_id]
        except Exception as fallback_err:
            raise RuntimeError(f"Failed to fetch lesson plan topics: {e}; fallback failed: {fallback_err}")

    added_count = 0
    skipped_count = 0
    now_iso = datetime.now(timezone.utc).isoformat()

    db = SessionLocal()
    try:
        for item in plans:
            cid = item.get("course_id")
            title = item.get("title") or item.get("topic_title")

            if not cid or not title:
                continue

            # Check if topic already exists for this course by title
            check_sql = text("""
                SELECT id FROM topics
                WHERE course_id = :course_id
                  AND LOWER(topic_title) = LOWER(:title)
            """)
            existing = db.execute(check_sql, {
                "course_id": cid,
                "title": title.strip()
            }).fetchone()

            if existing:
                skipped_count += 1
                continue

            # Insert new planned topic
            topic_id = item.get("id") or f"top-sync-{uuid.uuid4().hex[:8]}"
            unit_num = item.get("unit_number", 1)
            unit_ttl = item.get("unit_title", "Unit Topic")
            est_hours = item.get("estimated_hours", 2)
            priority = item.get("priority", "MEDIUM")
            is_done = item.get("is_completed", False)

            insert_sql = text("""
                INSERT INTO topics (
                    id, course_id, unit_number, unit_title,
                    topic_title, estimated_hours, priority, is_completed
                ) VALUES (
                    :id, :course_id, :unit_number, :unit_title,
                    :topic_title, :estimated_hours, :priority, :is_completed
                )
            """)

            db.execute(insert_sql, {
                "id": topic_id,
                "course_id": cid,
                "unit_number": unit_num,
                "unit_title": unit_ttl,
                "topic_title": title.strip(),
                "estimated_hours": est_hours,
                "priority": priority,
                "is_completed": is_done
            })
            added_count += 1

        db.commit()
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()

    result = {
        "status": "SUCCESS",
        "synced_records": added_count,
        "skipped_records": skipped_count,
        "total_records_processed": len(plans),
        "timestamp": now_iso
    }
    logger.info(f"Lesson plan sync completed: {result}")
    return result
