from typing import List
from app.models.timetable import TimetableSlotResponse, TimetableApproveResponse

def get_recommended_slots(
    course_id: str = None,
    faculty_id: str = None,
    section: str = None,
    count: int = 3
) -> List[TimetableSlotResponse]:
    candidate_slots = [
        {"day": "Friday", "startTime": "02:00 PM", "endTime": "03:00 PM", "room": "AB2-104"},
        {"day": "Saturday", "startTime": "10:00 AM", "endTime": "11:00 AM", "room": "AB1-Seminar Hall"},
        {"day": "Tuesday", "startTime": "11:00 AM", "endTime": "12:00 PM", "room": "AB1-Lab3"},
        {"day": "Thursday", "startTime": "02:00 PM", "endTime": "03:00 PM", "room": "AB2-205"},
        {"day": "Wednesday", "startTime": "03:00 PM", "endTime": "04:00 PM", "room": "AB1-Lab2"},
        {"day": "Saturday", "startTime": "02:00 PM", "endTime": "03:00 PM", "room": "AB2-Auditorium"},
    ]

    selected_slots = []
    for idx, slot in enumerate(candidate_slots[:max(1, count)]):
        selected_slots.append(
            TimetableSlotResponse(
                id=f"slot-{idx + 1}",
                day=slot["day"],
                startTime=slot["startTime"],
                endTime=slot["endTime"],
                room=slot["room"],
                facultyAvailable=True,
                studentsAvailable=True,
                roomAvailable=True,
                noConflict=True,
                selected=True
            )
        )
    return selected_slots

def approve_timetable(selected_slot_ids: List[str]) -> TimetableApproveResponse:
    return TimetableApproveResponse(
        success=True,
        message=f"Recovery Schedule Approved! {len(selected_slot_ids)} extra classes added to timetable."
    )
