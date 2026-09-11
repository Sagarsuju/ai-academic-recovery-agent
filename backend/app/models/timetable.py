from pydantic import BaseModel
from typing import List

class TimetableSlotResponse(BaseModel):
    id: str
    day: str
    startTime: str
    endTime: str
    room: str
    facultyAvailable: bool = True
    studentsAvailable: bool = True
    roomAvailable: bool = True
    noConflict: bool = True
    selected: bool = True

class TimetableApproveRequest(BaseModel):
    selectedSlotIds: List[str]

class TimetableApproveResponse(BaseModel):
    success: bool
    message: str
