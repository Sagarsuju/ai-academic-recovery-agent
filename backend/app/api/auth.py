from fastapi import APIRouter
from app.models.user import LoginRequest, LoginResponse, UserResponse, RoleEnum

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/login", response_model=LoginResponse)
def login(req: LoginRequest):
    user_id = "user-hod" if req.role == RoleEnum.HOD else "user-fac1"
    name = "Dr. R. K. Prasad" if req.role == RoleEnum.HOD else "Prof. Ananya Sharma"
    
    return LoginResponse(
        success=True,
        user=UserResponse(
            id=user_id,
            email=req.email,
            role=req.role,
            name=name,
            department="Computer Science & Engineering"
        ),
        token="mock_jwt_token_academic_recovery"
    )
