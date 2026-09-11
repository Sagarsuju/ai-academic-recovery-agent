from datetime import datetime, timedelta
from typing import Optional
from sqlalchemy import text
from app.models.progress import RecoveryPlanResponse, WhatIfSimulationResponse
from app.services.notification_service import create_notification
from app.database.database import SessionLocal

def prioritize_course_topics(course_id_or_code: str) -> list:
    """
    Returns prioritized list of pending syllabus topics for a course,
    ordered by priority (HIGH, then MEDIUM, then LOW) and unit number.
    """
    db = SessionLocal()
    try:
        # Resolve course_id if code given (e.g. CS301)
        cid = course_id_or_code
        c_row = db.execute(
            text("SELECT id FROM courses WHERE id = :c OR code = :c"),
            {"c": course_id_or_code}
        ).fetchone()
        if c_row:
            cid = c_row[0]

        topics_rows = db.execute(
            text("""
                SELECT id, unit_number, unit_title, topic_title, estimated_hours, priority 
                FROM topics 
                WHERE course_id = :cid AND is_completed = 0 
                ORDER BY unit_number ASC
            """),
            {"cid": cid}
        ).fetchall()

        priority_map = {"HIGH": 1, "MEDIUM": 2, "LOW": 3}
        topics = [
            {
                "id": r[0],
                "unit_number": r[1],
                "unit_title": r[2],
                "topic_title": r[3],
                "estimated_hours": r[4],
                "priority": r[5]
            }
            for r in topics_rows
        ]
        sorted_topics = sorted(topics, key=lambda t: (priority_map.get(t["priority"], 2), t["unit_number"]))
        return sorted_topics
    finally:
        db.close()

def propose_recovery_plan(course_id: str, notify: bool = True, gap_override: Optional[float] = None) -> RecoveryPlanResponse:
    """
    Proposes an academic recovery plan and automatically triggers a notification.
    Loads real course, faculty, and topic data from the database.
    """
    db = SessionLocal()
    try:
        # Try finding course in database
        course_row = db.execute(
            text("""
                SELECT c.id, c.code, c.name, c.section, c.actual_percentage, c.expected_percentage,
                       c.delay_days, f.name as faculty_name
                FROM courses c
                LEFT JOIN faculty f ON c.faculty_id = f.id
                WHERE c.id = :c OR c.code = :c
            """),
            {"c": course_id}
        ).fetchone()
    finally:
        db.close()

    if course_row:
        cid = course_row[0]
        code = course_row[1]
        name = course_row[2]
        sec = course_row[3] or "CSE-A"
        actual_cov = float(course_row[4] or 60.0)
        expected_cov = float(course_row[5] or 80.0)
        gap = gap_override if gap_override is not None else max(0.0, round(expected_cov - actual_cov, 1))
        # If user explicitly requests a recovery plan even if gap <= 0, provide a proactive recovery intervention (e.g. 10% gap / 2 extra classes)
        effective_gap = gap if gap > 0 else 10.0
        
        delay_days = int(course_row[6] or 0)
        delay_weeks = max(1, round(delay_days / 7)) if delay_days > 0 else 2
        extra_classes = max(2, round(effective_gap / 5.0))
        weeks_rem = 4
        pace = f"{min(4, round(extra_classes / weeks_rem) + 2)} topics per week"
        faculty_name = course_row[7] or "Course Faculty"

        # Fetch priority topics dynamically from DB
        db_topics = prioritize_course_topics(cid)
        if db_topics:
            priority_topic_titles = [f"{t['topic_title']} (Unit {t['unit_number']})" for t in db_topics[:3]]
        else:
            priority_topic_titles = [
                f"{name} Core Architecture & Fundamentals",
                f"{name} Advanced Design Patterns & Protocols",
                f"{name} Lab Case Studies & Semester Review"
            ]

        plan = RecoveryPlanResponse(
            courseId=cid,
            courseCode=code,
            courseName=name,
            facultyName=faculty_name,
            section=sec,
            currentCoverage=actual_cov,
            expectedCoverage=expected_cov,
            gap=gap,
            weeksRemaining=weeks_rem,
            predictedDelayWeeks=delay_weeks,
            additionalClassesRequired=extra_classes,
            priorityTopics=priority_topic_titles,
            recommendedPace=pace
        )
    elif course_id == "course-ai-c" or course_id == "CS304":
        plan = RecoveryPlanResponse(
            courseId="course-ai-c",
            courseCode="CS304",
            courseName="Artificial Intelligence & Machine Learning",
            facultyName="Prof. Suresh Verma",
            section="CSE-C",
            currentCoverage=48.0,
            expectedCoverage=80.0,
            gap=32.0,
            weeksRemaining=4,
            predictedDelayWeeks=4,
            additionalClassesRequired=6,
            priorityTopics=[
                "First Order Logic & Resolution Principles",
                "Supervised Learning: Decision Trees & SVMs",
                "Neural Networks & Backpropagation Algorithm"
            ],
            recommendedPace="4 topics per week"
        )
    else:
        # Default OS course plan
        plan = RecoveryPlanResponse(
            courseId=course_id,
            courseCode="CS303" if course_id == "course-os-a" else "CS30X",
            courseName="Operating Systems" if course_id == "course-os-a" else f"Course {course_id}",
            facultyName="Dr. Vikramaditya Rao",
            section="CSE-A",
            currentCoverage=64.0,
            expectedCoverage=82.0,
            gap=18.0,
            weeksRemaining=4,
            predictedDelayWeeks=2,
            additionalClassesRequired=3,
            priorityTopics=[
                "Deadlocks & Banker's Avoidance Algorithm",
                "Virtual Memory & Page Replacement Strategies (LRU)",
                "File System Implementation & Inodes"
            ],
            recommendedPace="3 topics per week"
        )

    # Persist or update recovery plan in database
    db = SessionLocal()
    try:
        plan_id = f"plan-{plan.courseId}"
        priority_str = ", ".join(plan.priorityTopics)
        upsert_sql = text("""
            INSERT INTO recovery_plans (
                id, course_id, current_coverage, expected_coverage, gap,
                weeks_remaining, predicted_delay_weeks, additional_classes_required,
                priority_topics, recommended_pace, status
            ) VALUES (
                :id, :course_id, :curr, :exp, :gap,
                :wks, :delay, :add_cls, :topics, :pace, 'PENDING'
            )
            ON CONFLICT(id) DO UPDATE SET
                current_coverage = :curr,
                expected_coverage = :exp,
                gap = :gap,
                weeks_remaining = :wks,
                predicted_delay_weeks = :delay,
                additional_classes_required = :add_cls,
                priority_topics = :topics,
                recommended_pace = :pace,
                status = 'PENDING'
        """)
        db.execute(upsert_sql, {
            "id": plan_id,
            "course_id": plan.courseId,
            "curr": plan.currentCoverage,
            "exp": plan.expectedCoverage,
            "gap": plan.gap,
            "wks": plan.weeksRemaining,
            "delay": plan.predictedDelayWeeks,
            "add_cls": plan.additionalClassesRequired,
            "topics": priority_str,
            "pace": plan.recommendedPace
        })
        db.commit()
    except Exception:
        db.rollback()
    finally:
        db.close()

    # Trigger notification automatically when proposed
    if notify:
        create_notification(
            user_id="user-hod",
            type="INFO",
            title=f"Recovery Plan Proposed: {plan.courseName} ({plan.section})",
            message=(
                f"A recovery plan has been proposed for {plan.courseName}. "
                f"Requires {plan.additionalClassesRequired} extra recovery classes over {plan.weeksRemaining} weeks "
                f"at {plan.recommendedPace}."
            ),
            link=f"/hod/recovery?courseId={plan.courseId}"
        )

    return plan

def generate_recovery_plan(course_id: str) -> RecoveryPlanResponse:
    """Alias for backwards compatibility."""
    return propose_recovery_plan(course_id=course_id, notify=True)

def simulate_what_if(additional_classes: int, current_coverage: float = 62.0) -> WhatIfSimulationResponse:
    bonus_coverage = additional_classes * 5.0
    new_coverage = min(100.0, current_coverage + bonus_coverage)
    days_saved = round(additional_classes * 3.5)

    base_target = datetime(2027, 1, 15)
    new_date = base_target - timedelta(days=days_saved)
    formatted_date = new_date.strftime("%B %d, %Y")
    is_on_track = new_coverage >= 80.0

    return WhatIfSimulationResponse(
        additionalClasses=additional_classes,
        newCoverage=new_coverage,
        newCompletionDate=formatted_date,
        isBackOnTrack=is_on_track,
        statusText="✓ Back on track" if is_on_track else "⚠ Partial Recovery (More classes recommended)"
    )
