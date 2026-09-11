from typing import List
from app.models.timetable import TimetableSlotResponse, TimetableApproveResponse

def get_recommended_slots(course_id: str) -> List[TimetableSlotResponse]:
    return [
        TimetableSlotResponse(
            id="slot-1",
            day="Tuesday",
            startTime="11:00 AM",
            endTime="12:00 PM",
            room="AB1-Lab3",
            facultyAvailable=True,
            studentsAvailable=True,
            roomAvailable=True,
            noConflict=True,
            selected=True
        ),
        TimetableSlotResponse(
            id="slot-2",
            day="Thursday",
            startTime="02:00 PM",
            endTime="03:00 PM",
            room="AB2-104",
            facultyAvailable=True,
            studentsAvailable=True,
            roomAvailable=True,
            noConflict=True,
            selected=True
        ),
        TimetableSlotResponse(
            id="slot-3",
            day="Saturday",
            startTime="10:00 AM",
            endTime="11:00 AM",
            room="AB1-Seminar Hall",
            facultyAvailable=True,
            studentsAvailable=True,
            roomAvailable=True,
            noConflict=True,
            selected=True
        )
    ]

def approve_timetable(selected_slot_ids: List[str]) -> TimetableApproveResponse:
    return TimetableApproveResponse(
        success=True,
        message=f"Recovery Schedule Approved! {len(selected_slot_ids)} extra classes added to timetable."
    )
