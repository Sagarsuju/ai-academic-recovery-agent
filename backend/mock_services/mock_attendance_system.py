from fastapi import FastAPI, Query
from typing import List, Optional
from pydantic import BaseModel
import uvicorn

app = FastAPI(
    title="Mock University Attendance System",
    description="Simulates external attendance management system hardware / bio-metric logs on port 9001",
    version="1.0.0"
)

class MockAttendanceRecord(BaseModel):
    id: str
    student_id: str
    course_id: str
    date: str
    status: str
    present_count: int
    absent_count: int
    total_count: int
    topic_status: str
    actual_topic_covered: Optional[str] = None

# Realistic fake attendance records for seeded students and courses
MOCK_ATTENDANCE_DATA = [
    # 2026-09-11
    {
        "id": "att-ext-001",
        "student_id": "std-101",
        "course_id": "course-dbms-a",
        "date": "2026-09-11",
        "status": "PRESENT",
        "present_count": 1,
        "absent_count": 0,
        "total_count": 1,
        "topic_status": "COMPLETED",
        "actual_topic_covered": "Relational Calculus & Query Optimization"
    },
    {
        "id": "att-ext-002",
        "student_id": "std-102",
        "course_id": "course-dbms-a",
        "date": "2026-09-11",
        "status": "PRESENT",
        "present_count": 1,
        "absent_count": 0,
        "total_count": 1,
        "topic_status": "COMPLETED",
        "actual_topic_covered": "Relational Calculus & Query Optimization"
    },
    {
        "id": "att-ext-003",
        "student_id": "std-105",
        "course_id": "course-ai-c",
        "date": "2026-09-11",
        "status": "ABSENT",
        "present_count": 0,
        "absent_count": 1,
        "total_count": 1,
        "topic_status": "PARTIALLY_COMPLETED",
        "actual_topic_covered": "Decision Tree Pruning and ID3 Algorithm"
    },
    # 2026-09-10
    {
        "id": "att-ext-004",
        "student_id": "std-103",
        "course_id": "course-java-b",
        "date": "2026-09-10",
        "status": "PRESENT",
        "present_count": 1,
        "absent_count": 0,
        "total_count": 1,
        "topic_status": "COMPLETED",
        "actual_topic_covered": "Generics, Wildcards, and Type Erasure"
    },
    {
        "id": "att-ext-005",
        "student_id": "std-104",
        "course_id": "course-java-b",
        "date": "2026-09-10",
        "status": "PRESENT",
        "present_count": 1,
        "absent_count": 0,
        "total_count": 1,
        "topic_status": "COMPLETED",
        "actual_topic_covered": "Generics, Wildcards, and Type Erasure"
    },
    # 2026-09-09
    {
        "id": "att-ext-006",
        "student_id": "std-101",
        "course_id": "course-os-a",
        "date": "2026-09-09",
        "status": "PRESENT",
        "present_count": 1,
        "absent_count": 0,
        "total_count": 1,
        "topic_status": "COMPLETED",
        "actual_topic_covered": "Deadlock Characterization and Resource Allocation Graphs"
    },
    {
        "id": "att-ext-007",
        "student_id": "std-102",
        "course_id": "course-os-a",
        "date": "2026-09-09",
        "status": "ABSENT",
        "present_count": 0,
        "absent_count": 1,
        "total_count": 1,
        "topic_status": "COMPLETED",
        "actual_topic_covered": "Deadlock Characterization and Resource Allocation Graphs"
    }
]

@app.get("/attendance-records", response_model=List[MockAttendanceRecord])
def get_attendance_records(since: Optional[str] = Query(None, description="ISO date YYYY-MM-DD filter")):
    """
    Returns realistic attendance records from external attendance system.
    Supports filtering records after or equal to `since` date.
    """
    if since:
        return [r for r in MOCK_ATTENDANCE_DATA if r["date"] >= since]
    return MOCK_ATTENDANCE_DATA

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "mock_attendance_system", "port": 9001}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=9001)
