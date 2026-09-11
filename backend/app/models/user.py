from pydantic import BaseModel
from typing import Optional
from enum import Enum

class RoleEnum(str, Enum):
    HOD = "HOD"
    FACULTY = "FACULTY"
    STUDENT = "STUDENT"
    ADMIN = "ADMIN"

class UserBase(BaseModel):
    email: str
    role: RoleEnum
    name: str
    department: str

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: str

    class Config:
        from_attributes = True

class LoginRequest(BaseModel):
    email: str
    password: str
    role: RoleEnum

class LoginResponse(BaseModel):
    success: bool
    user: UserResponse
    token: str
