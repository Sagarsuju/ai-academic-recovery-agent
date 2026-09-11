from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class NotificationCreate(BaseModel):
    user_id: str
    type: str  # CRITICAL, WARNING, INFO, SUCCESS
    title: str
    message: str
    link: Optional[str] = None

class NotificationResponse(BaseModel):
    id: str
    user_id: str
    type: str
    title: str
    message: str
    is_read: bool = False
    link: Optional[str] = None
    created_at: Optional[str] = None
