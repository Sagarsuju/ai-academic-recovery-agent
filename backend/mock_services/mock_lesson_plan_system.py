from fastapi import FastAPI, Query
from typing import List, Optional
from pydantic import BaseModel
import uvicorn

app = FastAPI(
    title="Mock University Lesson Plan System",
    description="Simulates external syllabus & lesson planning portal on port 9002",
    version="1.0.0"
)

class MockLessonPlanTopic(BaseModel):
    course_id: str
    unit_number: int
    unit_title: str
    title: str
    estimated_hours: int
    priority: str = "MEDIUM"
    is_completed: bool = False

# Realistic external lesson plans for seeded courses
MOCK_LESSON_PLANS = [
    {
        "course_id": "course-ai-c",
        "unit_number": 5,
        "unit_title": "Deep Learning & NLP",
        "title": "Transformer Attention Mechanisms & BERT",
        "estimated_hours": 3,
        "priority": "HIGH",
        "is_completed": False
    },
    {
        "course_id": "course-ai-c",
        "unit_number": 5,
        "unit_title": "Deep Learning & NLP",
        "title": "Large Language Models & Prompt Engineering",
        "estimated_hours": 4,
        "priority": "HIGH",
        "is_completed": False
    },
    {
        "course_id": "course-os-a",
        "unit_number": 5,
        "unit_title": "Distributed File Systems",
        "title": "NFS Architecture and RPC Caching",
        "estimated_hours": 2,
        "priority": "MEDIUM",
        "is_completed": False
    },
    {
        "course_id": "course-os-a",
        "unit_number": 5,
        "unit_title": "Distributed File Systems",
        "title": "Google File System & HDFS Chunk Replication",
        "estimated_hours": 3,
        "priority": "MEDIUM",
        "is_completed": False
    },
    {
        "course_id": "course-dbms-a",
        "unit_number": 5,
        "unit_title": "Distributed & Cloud Databases",
        "title": "CAP Theorem & Spanner Consensus",
        "estimated_hours": 3,
        "priority": "HIGH",
        "is_completed": False
    },
    {
        "course_id": "course-java-b",
        "unit_number": 5,
        "unit_title": "Reactive Programming",
        "title": "CompletableFuture and Asynchronous Pipelines",
        "estimated_hours": 2,
        "priority": "HIGH",
        "is_completed": False
    },
    {
        "course_id": "course-cn-b",
        "unit_number": 5,
        "unit_title": "Network Security & Cryptography",
        "title": "TLS/SSL Handshake & Public Key Infrastructure",
        "estimated_hours": 3,
        "priority": "HIGH",
        "is_completed": False
    }
]

@app.get("/lesson-plans", response_model=List[MockLessonPlanTopic])
def get_lesson_plans(course_id: Optional[str] = Query(None, description="Course ID filter")):
    """
    Returns planned topic syllabus data from external lesson plan system.
    If course_id is supplied, filters for that course.
    """
    if course_id:
        return [p for p in MOCK_LESSON_PLANS if p["course_id"] == course_id]
    return MOCK_LESSON_PLANS

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "mock_lesson_plan_system", "port": 9002}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=9002)
