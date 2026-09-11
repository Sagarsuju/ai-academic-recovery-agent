from fastapi import APIRouter
from typing import List
from app.models.timetable import TimetableSlotResponse, TimetableApproveRequest, TimetableApproveResponse
from app.services.timetable_service import get_recommended_slots, approve_timetable

router = APIRouter(prefix="/timetable", tags=["Timetable"])

@router.get("/slots", response_model=List[TimetableSlotResponse])
def get_slots(course_id: str = "course-os-a"):
    return get_recommended_slots(course_id)

@router.post("/approve", response_model=TimetableApproveResponse)
def approve(req: TimetableApproveRequest):
    return approve_timetable(req.selectedSlotIds)
