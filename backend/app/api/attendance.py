from fastapi import APIRouter
from typing import List
from app.models.attendance import AttendanceRecordCreate, AttendanceRecordResponse

router = APIRouter(prefix="/attendance", tags=["Attendance"])

@router.get("/today")
def get_today_classes():
    return [
        {
            "id": "cls-1",
            "courseId": "course-dbms-a",
            "courseCode": "CS301",
            "courseName": "Database Management Systems",
            "section": "CSE-A",
            "time": "10:00 AM - 11:00 AM",
            "room": "AB1-302",
            "status": "COMPLETED",
            "plannedTopic": "SQL Joins (Inner, Outer, Cross)",
            "enrolledStudents": 55
        },
        {
            "id": "cls-2",
            "courseId": "course-os-a",
            "courseCode": "CS303",
            "courseName": "Operating Systems",
            "section": "CSE-A",
            "time": "12:00 PM - 1:00 PM",
            "room": "AB2-104",
            "status": "UPCOMING",
            "plannedTopic": "Bankers Algorithm & Deadlock Detection",
            "enrolledStudents": 58
        },
        {
            "id": "cls-3",
            "courseId": "course-java-b",
            "courseCode": "CS302",
            "courseName": "Java & Object Oriented Programming",
            "section": "CSE-B",
            "time": "02:30 PM - 03:30 PM",
            "room": "AB1-205",
            "status": "UPCOMING",
            "plannedTopic": "Custom Exceptions & Throwable Class Hierarchy",
            "enrolledStudents": 52
        }
    ]

@router.post("/submit", response_model=AttendanceRecordResponse)
def submit_attendance(record: AttendanceRecordCreate):
    return AttendanceRecordResponse(
        success=True,
        previousPercentage=68.0,
        updatedPercentage=70.0,
        message="Attendance and syllabus topic completion logged."
    )
