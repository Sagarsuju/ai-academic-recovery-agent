from pydantic import BaseModel
from typing import List

class ProgressTrendPointModel(BaseModel):
    week: str
    expectedPercentage: float
    actualPercentage: float

class RecoveryPlanResponse(BaseModel):
    courseId: str
    courseCode: str
    courseName: str
    facultyName: str
    section: str
    currentCoverage: float
    expectedCoverage: float
    gap: float
    weeksRemaining: int
    predictedDelayWeeks: int
    additionalClassesRequired: int
    priorityTopics: List[str]
    recommendedPace: str

class WhatIfSimulationRequest(BaseModel):
    additionalClasses: int
    currentCoverage: float = 62.0

class WhatIfSimulationResponse(BaseModel):
    additionalClasses: int
    newCoverage: float
    newCompletionDate: str
    isBackOnTrack: bool
    statusText: str
