from app.services.prediction_service import predict_course_completion

class CompletionPredictor:
    def predict(self, actual_hours: int = None, total_hours: int = 60, target_date_days: int = 90, course_id_or_code: str = None) -> dict:
        return predict_course_completion(
            course_id_or_code=course_id_or_code,
            actual_hours=actual_hours,
            total_hours=total_hours,
            target_date_days=target_date_days
        )
