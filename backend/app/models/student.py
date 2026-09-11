from pydantic import BaseModel

class StudentBase(BaseModel):
    name: str
    roll_number: str
    department: str
    section: str
    email: str

class StudentResponse(StudentBase):
    id: str

    class Config:
        from_attributes = True
