from pydantic import BaseModel
from typing import Optional

class FacultyBase(BaseModel):
    name: str
    email: str
    department: str
    designation: Optional[str] = "Assistant Professor"

class FacultyResponse(FacultyBase):
    id: str
    user_id: str

    class Config:
        from_attributes = True
