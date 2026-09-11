from app.services.timetable_service import get_recommended_slots

class TimetableOptimizer:
    def optimize(self, faculty_id: str = None, section: str = None, required_slots_count: int = 3, course_id: str = None) -> list:
        slots = get_recommended_slots(
            course_id=course_id,
            faculty_id=faculty_id,
            section=section,
            count=required_slots_count
        )
        return [s.model_dump() if hasattr(s, "model_dump") else s.__dict__ for s in slots]
