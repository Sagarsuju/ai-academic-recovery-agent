from fastapi import APIRouter, HTTPException
from typing import List
from app.models.course import CourseResponse, DepartmentSummaryResponse, RiskLevelEnum, UnitProgressModel, PendingTopicModel
from app.services.prediction_service import predict_completion_date

router = APIRouter(prefix="/courses", tags=["Courses"])

MOCK_COURSES_DATA: List[CourseResponse] = [
    CourseResponse(
        id="course-dbms-a",
        code="CS301",
        name="Database Management Systems",
        department="Computer Science & Engineering",
        section="CSE-A",
        facultyId="fac-101",
        facultyName="Dr. Ramesh Kumar",
        totalHours=60,
        completedHours=55,
        expectedPercentage=90.0,
        actualPercentage=92.0,
        gapPercentage=-2.0,
        riskLevel=RiskLevelEnum.ON_TRACK,
        riskScore=12,
        riskReasons=["Syllabus progress is on track with scheduled timeline"],
        predictedCompletionDate="December 08, 2026",
        plannedCompletionDate="December 10, 2026",
        delayDays=-2,
        units=[
            UnitProgressModel(unitNumber=1, unitTitle="Introduction & ER Modeling", percentage=100.0, status="COMPLETED"),
            UnitProgressModel(unitNumber=2, unitTitle="Relational Model & SQL", percentage=100.0, status="COMPLETED"),
            UnitProgressModel(unitNumber=3, unitTitle="Normalization & Dependencies", percentage=100.0, status="COMPLETED"),
            UnitProgressModel(unitNumber=4, unitTitle="Transaction Processing & Concurrency", percentage=80.0, status="IN_PROGRESS"),
            UnitProgressModel(unitNumber=5, unitTitle="NoSQL & Distributed Databases", percentage=0.0, status="NOT_STARTED")
        ],
        pendingTopics=[
            PendingTopicModel(id="t1", topicTitle="Two-Phase Locking Protocol", unitNumber=4, estimatedHours=2, priority="HIGH"),
            PendingTopicModel(id="t2", topicTitle="MongoDB Document Data Model", unitNumber=5, estimatedHours=3, priority="MEDIUM")
        ]
    ),
    CourseResponse(
        id="course-java-b",
        code="CS302",
        name="Java & Object Oriented Programming",
        department="Computer Science & Engineering",
        section="CSE-B",
        facultyId="fac-102",
        facultyName="Prof. Ananya Sharma",
        totalHours=60,
        completedHours=46,
        expectedPercentage=88.0,
        actualPercentage=78.0,
        gapPercentage=10.0,
        riskLevel=RiskLevelEnum.MINOR_SLIPPAGE,
        riskScore=42,
        riskReasons=["10% gap from expected syllabus timeline", "Complex Unit 3 topics required extra explanation hours"],
        predictedCompletionDate="December 14, 2026",
        plannedCompletionDate="December 10, 2026",
        delayDays=4,
        units=[
            UnitProgressModel(unitNumber=1, unitTitle="Java Fundamentals & OOP Concepts", percentage=100.0, status="COMPLETED"),
            UnitProgressModel(unitNumber=2, unitTitle="Inheritance, Interfaces & Packages", percentage=100.0, status="COMPLETED"),
            UnitProgressModel(unitNumber=3, unitTitle="Multithreading & Exception Handling", percentage=70.0, status="IN_PROGRESS"),
            UnitProgressModel(unitNumber=4, unitTitle="Java Collections Framework", percentage=20.0, status="BEHIND"),
            UnitProgressModel(unitNumber=5, unitTitle="JavaFX & GUI Application Dev", percentage=0.0, status="NOT_STARTED")
        ],
        pendingTopics=[
            PendingTopicModel(id="t3", topicTitle="Thread Synchronization Internals", unitNumber=3, estimatedHours=2, priority="HIGH"),
            PendingTopicModel(id="t4", topicTitle="HashMap & Concurrent HashMap", unitNumber=4, estimatedHours=3, priority="HIGH")
        ]
    ),
    CourseResponse(
        id="course-os-a",
        code="CS303",
        name="Operating Systems",
        department="Computer Science & Engineering",
        section="CSE-A",
        facultyId="fac-103",
        facultyName="Dr. Vikramaditya Rao",
        totalHours=60,
        completedHours=38,
        expectedPercentage=82.0,
        actualPercentage=64.0,
        gapPercentage=18.0,
        riskLevel=RiskLevelEnum.SIGNIFICANT_SLIPPAGE,
        riskScore=82,
        riskReasons=["18% behind expected syllabus progress", "Low recent teaching pace due to departmental duties"],
        predictedCompletionDate="December 22, 2026",
        plannedCompletionDate="December 10, 2026",
        delayDays=12,
        units=[
            UnitProgressModel(unitNumber=1, unitTitle="OS Structures & Process Management", percentage=100.0, status="COMPLETED"),
            UnitProgressModel(unitNumber=2, unitTitle="CPU Scheduling Algorithms", percentage=100.0, status="COMPLETED"),
            UnitProgressModel(unitNumber=3, unitTitle="Process Synchronization & Deadlocks", percentage=50.0, status="BEHIND"),
            UnitProgressModel(unitNumber=4, unitTitle="Memory Management & Paging", percentage=20.0, status="BEHIND"),
            UnitProgressModel(unitNumber=5, unitTitle="File System Implementation & Storage", percentage=0.0, status="NOT_STARTED")
        ],
        pendingTopics=[
            PendingTopicModel(id="t5", topicTitle="Bankers Algorithm for Deadlock Avoidance", unitNumber=3, estimatedHours=2, priority="HIGH"),
            PendingTopicModel(id="t6", topicTitle="Virtual Memory & Page Replacement (LRU)", unitNumber=4, estimatedHours=4, priority="HIGH"),
            PendingTopicModel(id="t7", topicTitle="File Allocation Methods & Inode Structure", unitNumber=5, estimatedHours=3, priority="MEDIUM")
        ]
    ),
    CourseResponse(
        id="course-ai-c",
        code="CS304",
        name="Artificial Intelligence & Machine Learning",
        department="Computer Science & Engineering",
        section="CSE-C",
        facultyId="fac-104",
        facultyName="Prof. Suresh Verma",
        totalHours=60,
        completedHours=29,
        expectedPercentage=80.0,
        actualPercentage=48.0,
        gapPercentage=32.0,
        riskLevel=RiskLevelEnum.CRITICAL,
        riskScore=94,
        riskReasons=["32% critical progress deficit", "4 consecutive classes missed due to leave"],
        predictedCompletionDate="January 05, 2027",
        plannedCompletionDate="December 10, 2026",
        delayDays=26,
        units=[
            UnitProgressModel(unitNumber=1, unitTitle="Problem Solving & State Space Search", percentage=100.0, status="COMPLETED"),
            UnitProgressModel(unitNumber=2, unitTitle="Knowledge Representation & Logic", percentage=60.0, status="BEHIND"),
            UnitProgressModel(unitNumber=3, unitTitle="Supervised Learning Algorithms", percentage=0.0, status="NOT_STARTED"),
            UnitProgressModel(unitNumber=4, unitTitle="Neural Networks & Deep Learning Intro", percentage=0.0, status="NOT_STARTED"),
            UnitProgressModel(unitNumber=5, unitTitle="Natural Language Processing & Ethics", percentage=0.0, status="NOT_STARTED")
        ],
        pendingTopics=[
            PendingTopicModel(id="t8", topicTitle="First Order Logic & Resolution Inference", unitNumber=2, estimatedHours=3, priority="HIGH"),
            PendingTopicModel(id="t9", topicTitle="Decision Trees & Random Forests", unitNumber=3, estimatedHours=4, priority="HIGH"),
            PendingTopicModel(id="t10", topicTitle="Backpropagation Neural Networks", unitNumber=4, estimatedHours=5, priority="HIGH")
        ]
    )
]

@router.get("/", response_model=List[CourseResponse])
def get_courses():
    return MOCK_COURSES_DATA

@router.get("/summary", response_model=DepartmentSummaryResponse)
def get_department_summary():
    return DepartmentSummaryResponse(
        department="Computer Science & Engineering",
        totalCourses=24,
        onTrack=16,
        minorSlippage=4,
        significantSlippage=3,
        critical=1,
        overallSyllabusCoverage=76.0
    )

@router.get("/{course_id}", response_model=CourseResponse)
def get_course_by_id(course_id: str):
    for course in MOCK_COURSES_DATA:
        if course.id == course_id or course.code.lower() == course_id.lower():
            return course
    raise HTTPException(status_code=404, detail="Course not found")
