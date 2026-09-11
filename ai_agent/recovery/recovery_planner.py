class RecoveryPlanner:
    def create_plan(self, gap_hours: int, weeks_remaining: int) -> dict:
        extra_classes = max(1, round(gap_hours / 2))
        recommended_pace = f"{min(4, round(extra_classes / max(1, weeks_remaining)) + 2)} topics/week"

        return {
            "additional_classes_required": extra_classes,
            "weeks_remaining": weeks_remaining,
            "recommended_pace": recommended_pace
        }
