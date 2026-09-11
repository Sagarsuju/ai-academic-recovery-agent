from pydantic import BaseModel
from typing import List, Optional
from enum import Enum

class RiskLevelEnum(str, Enum):
    ON_TRACK = "ON_TRACK"
    MINOR_SLIPPAGE = "MINOR_SLIPPAGE"
    SIGNIFICANT_SLIPPAGE = "SIGNIFICANT_SLIPPAGE"
    CRITICAL = "CRITICAL"

class UnitProgressModel(BaseModel):
    unitNumber: int
    unitTitle: str
    percentage: float
    status: str

class PendingTopicModel(BaseModel):
    id: str
    topicTitle: str
    unitNumber: int
    estimatedHours: int
    priority: str

class CourseResponse(BaseModel):
    id: str
    code: str
    name: str
    department: str
    section: str
    facultyId: str
    facultyName: str
    totalHours: int
    completedHours: int
    expectedPercentage: float
    actualPercentage: float
    gapPercentage: float
    riskLevel: RiskLevelEnum
    riskScore: int
    riskReasons: List[str] = []
    predictedCompletionDate: str
    plannedCompletionDate: str
    delayDays: int
    units: List[UnitProgressModel] = []
    pendingTopics: List[PendingTopicModel] = []

    class Config:
        from_attributes = True

class DepartmentSummaryResponse(BaseModel):
    department: str
    totalCourses: int
    onTrack: int
    minorSlippage: int
    significantSlippage: int
    critical: int
    overallSyllabusCoverage: float
