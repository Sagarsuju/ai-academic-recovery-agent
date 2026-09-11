from datetime import datetime, timedelta
from app.models.progress import RecoveryPlanResponse, WhatIfSimulationResponse

def generate_recovery_plan(course_id: str) -> RecoveryPlanResponse:
    if course_id == "course-ai-c":
        return RecoveryPlanResponse(
            courseId="course-ai-c",
            courseCode="CS304",
            courseName="Artificial Intelligence & Machine Learning",
            facultyName="Prof. Suresh Verma",
            section="CSE-C",
            currentCoverage=48.0,
            expectedCoverage=80.0,
            gap=32.0,
            weeksRemaining=4,
            predictedDelayWeeks=4,
            additionalClassesRequired=6,
            priorityTopics=[
                "First Order Logic & Resolution Principles",
                "Supervised Learning: Decision Trees & SVMs",
                "Neural Networks & Backpropagation Algorithm"
            ],
            recommendedPace="4 topics per week"
        )
    
    # Default OS course plan
    return RecoveryPlanResponse(
        courseId="course-os-a",
        courseCode="CS303",
        courseName="Operating Systems",
        facultyName="Dr. Vikramaditya Rao",
        section="CSE-A",
        currentCoverage=64.0,
        expectedCoverage=82.0,
        gap=18.0,
        weeksRemaining=4,
        predictedDelayWeeks=2,
        additionalClassesRequired=3,
        priorityTopics=[
            "Deadlocks & Banker's Avoidance Algorithm",
            "Virtual Memory & Page Replacement Strategies (LRU)",
            "File System Implementation & Inodes"
        ],
        recommendedPace="3 topics per week"
    )

def simulate_what_if(additional_classes: int, current_coverage: float = 62.0) -> WhatIfSimulationResponse:
    bonus_coverage = additional_classes * 5.0
    new_coverage = min(100.0, current_coverage + bonus_coverage)
    days_saved = round(additional_classes * 3.5)

    base_target = datetime(2027, 1, 15)
    new_date = base_target - timedelta(days=days_saved)
    formatted_date = new_date.strftime("%B %d, %Y")
    is_on_track = new_coverage >= 80.0

    return WhatIfSimulationResponse(
        additionalClasses=additional_classes,
        newCoverage=new_coverage,
        newCompletionDate=formatted_date,
        isBackOnTrack=is_on_track,
        statusText="✓ Back on track" if is_on_track else "⚠ Partial Recovery (More classes recommended)"
    )
