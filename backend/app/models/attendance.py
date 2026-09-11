from pydantic import BaseModel
from typing import Optional

class AttendanceRecordCreate(BaseModel):
    courseId: str
    date: str
    presentCount: int
    absentCount: int
    totalCount: int
    topicStatus: str
    actualTopicCovered: Optional[str] = None

class AttendanceRecordResponse(BaseModel):
    success: bool
    previousPercentage: float
    updatedPercentage: float
    message: str = "Attendance and topic logged successfully."
