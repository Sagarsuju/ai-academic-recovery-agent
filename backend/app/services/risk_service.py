"""
Course Progress Risk Evaluation Service
"""
from app.services.prediction_service import assess_course_risk

def evaluate_course_risk(
    course_id: str,
    course_name: str,
    actual_pct: float,
    expected_pct: float,
    section: str = None,
    faculty_user_id: str = None,
    notify: bool = True
) -> dict:
    """Evaluates risk and automatically fires notification if newly at-risk."""
    return assess_course_risk(
        course_id=course_id,
        course_name=course_name,
        actual_pct=actual_pct,
        expected_pct=expected_pct,
        section=section,
        faculty_user_id=faculty_user_id,
        notify=notify
    )
