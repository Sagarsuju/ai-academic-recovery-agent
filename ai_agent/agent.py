from ai_agent.prediction.completion_predictor import CompletionPredictor
from ai_agent.recovery.recovery_planner import RecoveryPlanner
from ai_agent.timetable.timetable_optimizer import TimetableOptimizer

class AcademicRecoveryAgent:
    def __init__(self):
        self.predictor = CompletionPredictor()
        self.recovery_planner = RecoveryPlanner()
        self.timetable_optimizer = TimetableOptimizer()

    def analyze_course(self, actual_pct: float, expected_pct: float, faculty_id: str, section: str) -> dict:
        gap = expected_pct - actual_pct
        completion_info = self.predictor.predict(actual_hours=int(actual_pct * 0.6))
        
        recovery_info = {}
        if gap > 10:
            recovery_info = self.recovery_planner.create_plan(gap_hours=int(gap * 0.6), weeks_remaining=4)
            recommended_slots = self.timetable_optimizer.optimize(
                faculty_id=faculty_id,
                section=section,
                required_slots_count=recovery_info.get("additional_classes_required", 3)
            )
            recovery_info["recommended_slots"] = recommended_slots

        return {
            "prediction": completion_info,
            "recovery": recovery_info
        }
