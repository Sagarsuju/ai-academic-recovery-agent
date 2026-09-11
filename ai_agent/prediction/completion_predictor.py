class CompletionPredictor:
    def predict(self, actual_hours: int, total_hours: int = 60, target_date_days: int = 90) -> dict:
        velocity = actual_hours / max(1, target_date_days)
        estimated_total_days = total_hours / max(0.1, velocity)
        delay_days = max(0, int(estimated_total_days - target_date_days))
        
        return {
            "velocity": round(velocity, 2),
            "estimated_total_days": int(estimated_total_days),
            "delay_days": delay_days
        }
