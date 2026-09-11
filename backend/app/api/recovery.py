from fastapi import APIRouter
from app.models.progress import RecoveryPlanResponse, WhatIfSimulationRequest, WhatIfSimulationResponse
from app.services.recovery_service import generate_recovery_plan, simulate_what_if

router = APIRouter(prefix="/recovery", tags=["Academic Recovery"])

@router.get("/plan", response_model=RecoveryPlanResponse)
def get_plan(courseId: str = "course-os-a"):
    return generate_recovery_plan(courseId)

@router.post("/what-if", response_model=WhatIfSimulationResponse)
def what_if_simulation(req: WhatIfSimulationRequest):
    return simulate_what_if(req.additionalClasses, req.currentCoverage)
