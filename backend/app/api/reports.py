from fastapi import APIRouter

router = APIRouter(prefix="/reports", tags=["Reports"])

@router.get("/summary")
def get_report_summary():
    return {
        "report_title": "Weekly Academic Progress Audit - Week 9",
        "department": "Computer Science & Engineering",
        "total_courses": 24,
        "on_track": 16,
        "minor_slippage": 4,
        "significant_slippage": 3,
        "critical": 1,
        "faculty_summary": [
            {"name": "Dr. Ramesh Kumar", "courses": "DBMS, CN", "coverage": "89%", "status": "ON_TRACK"},
            {"name": "Prof. Ananya Sharma", "courses": "Java, SE", "coverage": "84%", "status": "MINOR_SLIPPAGE"},
            {"name": "Dr. Vikramaditya Rao", "courses": "Operating Systems", "coverage": "64%", "status": "SIGNIFICANT_SLIPPAGE"},
            {"name": "Prof. Suresh Verma", "courses": "Artificial Intelligence", "coverage": "48%", "status": "CRITICAL"}
        ]
    }
