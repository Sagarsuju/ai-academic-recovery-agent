from fastapi import APIRouter
from typing import List
from app.models.progress import ProgressTrendPointModel
from app.services.progress_service import get_department_progress_trends

router = APIRouter(prefix="/progress", tags=["Progress Tracking"])

@router.get("/trends", response_model=List[ProgressTrendPointModel])
def get_progress_trends():
    return get_department_progress_trends()
