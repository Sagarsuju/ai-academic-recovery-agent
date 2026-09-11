from fastapi import APIRouter, Query
from typing import Optional, Dict, Any
from pydantic import BaseModel
from app.integrations.scheduler import get_all_sync_status, run_sync_now

router = APIRouter(prefix="/api/integrations", tags=["Integrations"])

class IntegrationSyncItem(BaseModel):
    integration_name: str
    last_sync_time: Optional[str] = None
    last_sync_status: str
    records_synced: int
    details: Optional[str] = None

class IntegrationsStatusResponse(BaseModel):
    attendance_system: IntegrationSyncItem
    lesson_plan_system: IntegrationSyncItem
    scheduler_running: bool

@router.get("/status", response_model=IntegrationsStatusResponse)
def get_integrations_status():
    """
    Get synchronization health, last execution timestamp, and status
    for external Attendance and Lesson Plan integrations.
    """
    status_data = get_all_sync_status()
    return status_data

@router.post("/sync")
def trigger_manual_sync(integration: Optional[str] = Query(None, description="attendance_system | lesson_plan_system | all")):
    """
    Trigger immediate synchronization on-demand.
    """
    result = run_sync_now(integration=integration if integration != "all" else None)
    return result
