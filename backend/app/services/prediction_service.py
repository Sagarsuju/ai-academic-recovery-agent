from datetime import datetime, timedelta
from typing import Optional, Tuple
from app.services.notification_service import create_notification

def predict_completion_date(actual_pct: float, expected_pct: float, target_date_str: str = "December 10, 2026") -> Tuple[str, int]:
    gap = expected_pct - actual_pct
    if gap <= 0:
        return "December 08, 2026", -2

    # Estimate ~0.7 days delay per 1% gap
    delay_days = int(gap * 0.7)
    try:
        base_date = datetime.strptime("2026-12-10", "%Y-%m-%d")
        predicted_date = base_date + timedelta(days=delay_days)
        return predicted_date.strftime("%B %d, %Y"), delay_days
    except Exception:
        return "December 22, 2026", 12

def predict_course_completion(
    course_id_or_code: Optional[str] = None,
    actual_pct: Optional[float] = None,
    expected_pct: Optional[float] = None,
    actual_hours: Optional[int] = None,
    total_hours: int = 60,
    target_date_days: int = 90
) -> dict:
    """
    Consolidated completion prediction: calculates velocity, estimated total days,
    delay days, predicted completion date, and on-track status.
    If course_id_or_code is passed, fetches current progress from the database.
    """
    from app.database.database import SessionLocal
    from sqlalchemy import text

    course_data = None
    if course_id_or_code:
        db = SessionLocal()
        try:
            row = db.execute(
                text("""
                    SELECT id, code, name, section, actual_percentage, expected_percentage,
                           completed_hours, total_hours, delay_days, predicted_completion_date, risk_level
                    FROM courses
                    WHERE id = :c OR code = :c
                """),
                {"c": course_id_or_code}
            ).fetchone()
            if row:
                course_data = {
                    "course_id": row[0],
                    "course_code": row[1],
                    "course_name": row[2],
                    "section": row[3],
                    "actual_percentage": float(row[4] or 0),
                    "expected_percentage": float(row[5] or 0),
                    "completed_hours": int(row[6] or 0),
                    "total_hours": int(row[7] or total_hours),
                    "delay_days": int(row[8] or 0),
                    "predicted_date": row[9] or "December 10, 2026",
                    "status": row[10] or "ON_TRACK"
                }
        finally:
            db.close()

    if course_data:
        act_pct = course_data["actual_percentage"]
        exp_pct = course_data["expected_percentage"]
        tot_hrs = course_data["total_hours"]
        act_hrs = course_data["completed_hours"]
        pred_date = course_data["predicted_date"]
        delay_days = course_data["delay_days"]
        code = course_data["course_code"]
        name = course_data["course_name"]
        sec = course_data["section"]
    else:
        act_pct = actual_pct if actual_pct is not None else 60.0
        exp_pct = expected_pct if expected_pct is not None else 75.0
        tot_hrs = total_hours
        act_hrs = actual_hours if actual_hours is not None else int((act_pct / 100.0) * tot_hrs)
        pred_date, delay_days = predict_completion_date(act_pct, exp_pct)
        code = course_id_or_code or "CS30X"
        name = f"Course {code}"
        sec = "CSE-A"

    velocity = round(act_hrs / max(1, target_date_days), 2)
    estimated_total_days = int(tot_hrs / max(0.1, velocity)) if velocity > 0 else 120
    gap = round(exp_pct - act_pct, 1)
    is_on_track = gap <= 0 and delay_days <= 0

    return {
        "course_code": code,
        "course_name": name,
        "section": sec,
        "actual_percentage": act_pct,
        "expected_percentage": exp_pct,
        "gap_percentage": gap,
        "actual_hours": act_hrs,
        "total_hours": tot_hrs,
        "velocity": velocity,
        "estimated_total_days": estimated_total_days,
        "predicted_completion_date": pred_date,
        "delay_days": delay_days,
        "is_on_track": is_on_track,
        "status": "ON_TRACK" if is_on_track else ("CRITICAL" if gap > 25 else "SLIPPAGE")
    }

def assess_course_risk(
    course_id: str,
    course_name: str,
    actual_pct: float,
    expected_pct: float,
    section: Optional[str] = None,
    faculty_user_id: Optional[str] = None,
    notify: bool = True
) -> dict:
    """
    Evaluates course progress deficit, computes risk tier,
    and automatically triggers a notification if the course is flagged as at-risk.
    """
    gap = round(expected_pct - actual_pct, 1)
    predicted_date, delay_days = predict_completion_date(actual_pct, expected_pct)

    if gap > 25.0:
        risk_level = "CRITICAL"
        notif_type = "CRITICAL"
    elif gap > 12.0:
        risk_level = "SIGNIFICANT_SLIPPAGE"
        notif_type = "WARNING"
    elif gap > 5.0:
        risk_level = "MINOR_SLIPPAGE"
        notif_type = "WARNING"
    else:
        risk_level = "ON_TRACK"
        notif_type = "INFO"

    notification = None
    # Trigger notification automatically when flagged as at-risk
    if notify and risk_level != "ON_TRACK":
        sec_label = f" ({section})" if section else ""
        title = f"Course Risk Alert: {course_name}{sec_label}"
        message = (
            f"Course {course_name} has been flagged as {risk_level}. "
            f"Syllabus coverage is {actual_pct}% vs expected {expected_pct}% ({gap}% gap). "
            f"Predicted completion delay: {delay_days} days."
        )
        link = f"/hod/recovery?courseId={course_id}"
        
        # Notify HOD
        notification = create_notification(
            user_id="user-hod",
            type=notif_type,
            title=title,
            message=message,
            link=link
        )

        # Notify Faculty if assigned
        if faculty_user_id and faculty_user_id != "user-hod":
            create_notification(
                user_id=faculty_user_id,
                type="WARNING",
                title=f"Syllabus Slippage Notice: {course_name}",
                message=f"Your course {course_name}{sec_label} is {gap}% behind expected syllabus milestones.",
                link=link
            )

    return {
        "course_id": course_id,
        "course_name": course_name,
        "actual_percentage": actual_pct,
        "expected_percentage": expected_pct,
        "gap_percentage": gap,
        "risk_level": risk_level,
        "predicted_completion_date": predicted_date,
        "delay_days": delay_days,
        "notification_sent": notification is not None,
        "notification": notification
    }
