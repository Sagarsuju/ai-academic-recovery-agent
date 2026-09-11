from fastapi import APIRouter, Query, Body, HTTPException
from typing import Optional
from pydantic import BaseModel
from sqlalchemy import text
from app.models.progress import RecoveryPlanResponse, WhatIfSimulationRequest, WhatIfSimulationResponse
from app.services.recovery_service import generate_recovery_plan, simulate_what_if, propose_recovery_plan
from app.services.notification_service import create_notification
from app.database.database import SessionLocal

router = APIRouter(prefix="/recovery", tags=["Academic Recovery"])

class PlanActionRequest(BaseModel):
    courseId: str
    planId: Optional[str] = None
    notes: Optional[str] = None
    reason: Optional[str] = None

@router.get("/plan", response_model=RecoveryPlanResponse)
def get_plan(courseId: str = "course-os-a"):
    return generate_recovery_plan(courseId)

@router.post("/propose", response_model=RecoveryPlanResponse)
def propose_plan(courseId: str = Query("course-os-a")):
    """Explicitly propose a recovery plan and trigger notification."""
    return propose_recovery_plan(courseId, notify=True)

@router.post("/what-if", response_model=WhatIfSimulationResponse)
def what_if_simulation(req: WhatIfSimulationRequest):
    return simulate_what_if(req.additionalClasses, req.currentCoverage)

@router.post("/approve")
def approve_recovery_plan(req: PlanActionRequest):
    """
    HOD action: approve a proposed recovery plan.
    Updates status in database and fires an automatic SUCCESS notification.
    """
    course_id = req.courseId
    plan_id = req.planId or f"plan-{course_id}"

    db = SessionLocal()
    try:
        db.execute(
            text("UPDATE recovery_plans SET status = 'APPROVED' WHERE course_id = :cid OR id = :pid"),
            {"cid": course_id, "pid": plan_id}
        )
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed updating recovery plan: {e}")
    finally:
        db.close()

    # Automatically trigger notification
    notif = create_notification(
        user_id="user-hod",
        type="SUCCESS",
        title=f"Recovery Plan Approved: {course_id}",
        message=(
            f"The academic recovery plan for {course_id} has been approved by the Head of Department. "
            f"Remedial timetable slots are now confirmed."
        ),
        link="/hod/timetable"
    )

    return {
        "status": "success",
        "action": "approved",
        "courseId": course_id,
        "planId": plan_id,
        "notification": notif
    }

@router.post("/reject")
def reject_recovery_plan(req: PlanActionRequest):
    """
    HOD action: reject a proposed recovery plan.
    Updates status in database and fires an automatic WARNING notification.
    """
    course_id = req.courseId
    plan_id = req.planId or f"plan-{course_id}"
    reason = req.reason or req.notes or "Requires adjusted remedial pace and topic prioritisation."

    db = SessionLocal()
    try:
        db.execute(
            text("UPDATE recovery_plans SET status = 'REJECTED' WHERE course_id = :cid OR id = :pid"),
            {"cid": course_id, "pid": plan_id}
        )
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed updating recovery plan: {e}")
    finally:
        db.close()

    # Automatically trigger notification
    notif = create_notification(
        user_id="user-hod",
        type="WARNING",
        title=f"Recovery Plan Rejected: {course_id}",
        message=f"The proposed recovery plan for {course_id} was rejected by HOD. Reason: {reason}",
        link=f"/hod/recovery?courseId={course_id}"
    )

    return {
        "status": "success",
        "action": "rejected",
        "courseId": course_id,
        "planId": plan_id,
        "notification": notif
    }
