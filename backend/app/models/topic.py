from pydantic import BaseModel

class TopicBase(BaseModel):
    course_id: str
    unit_number: int
    unit_title: str
    topic_title: str
    estimated_hours: int = 2
    priority: str = "MEDIUM"

class TopicResponse(TopicBase):
    id: str
    is_completed: bool = False

    class Config:
        from_attributes = True
