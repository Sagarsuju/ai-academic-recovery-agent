from typing import List, Optional
from app.services.recovery_service import prioritize_course_topics

class TopicPrioritizer:
    def prioritize_topics(self, topics: Optional[List[dict]] = None, course_id_or_code: Optional[str] = None) -> List[dict]:
        if course_id_or_code:
            return prioritize_course_topics(course_id_or_code)
        if topics:
            priority_map = {"HIGH": 1, "MEDIUM": 2, "LOW": 3}
            return sorted(topics, key=lambda t: (priority_map.get(t.get("priority", "MEDIUM"), 2), t.get("unit_number", 1)))
        return []
