from pydantic import BaseModel

class LessonPlanBase(BaseModel):
    course_id: str
    total_hours: int

class LessonPlanResponse(LessonPlanBase):
    id: str

    class Config:
        from_attributes = True
