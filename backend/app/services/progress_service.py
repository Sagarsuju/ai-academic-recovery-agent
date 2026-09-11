from typing import List
from app.models.progress import ProgressTrendPointModel

def calculate_course_progress(actual_hours: int, total_hours: int = 60) -> float:
    if total_hours == 0:
        return 0.0
    return round((actual_hours / total_hours) * 100, 1)

def get_department_progress_trends() -> List[ProgressTrendPointModel]:
    return [
        ProgressTrendPointModel(week="Week 1", expectedPercentage=10.0, actualPercentage=10.0),
        ProgressTrendPointModel(week="Week 2", expectedPercentage=20.0, actualPercentage=19.0),
        ProgressTrendPointModel(week="Week 3", expectedPercentage=30.0, actualPercentage=28.0),
        ProgressTrendPointModel(week="Week 4", expectedPercentage=40.0, actualPercentage=36.0),
        ProgressTrendPointModel(week="Week 5", expectedPercentage=50.0, actualPercentage=45.0),
        ProgressTrendPointModel(week="Week 6", expectedPercentage=60.0, actualPercentage=54.0),
        ProgressTrendPointModel(week="Week 7", expectedPercentage=70.0, actualPercentage=62.0),
        ProgressTrendPointModel(week="Week 8", expectedPercentage=80.0, actualPercentage=70.0),
        ProgressTrendPointModel(week="Week 9 (Current)", expectedPercentage=90.0, actualPercentage=76.0)
    ]
