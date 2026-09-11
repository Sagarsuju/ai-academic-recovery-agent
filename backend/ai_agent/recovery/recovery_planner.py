from app.services.recovery_service import propose_recovery_plan

class RecoveryPlanner:
    def create_plan(self, gap_hours: int = None, weeks_remaining: int = 4, course_id_or_code: str = "course-os-a") -> dict:
        override_gap = float(gap_hours * 1.5) if gap_hours is not None else None
        res = propose_recovery_plan(course_id=course_id_or_code, notify=False, gap_override=override_gap)
        return {
            "additional_classes_required": res.additionalClassesRequired,
            "weeks_remaining": res.weeksRemaining,
            "recommended_pace": res.recommendedPace,
            "priority_topics": res.priorityTopics,
            "gap": res.gap
        }
