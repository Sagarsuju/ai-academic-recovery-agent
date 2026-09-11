from typing import List, Dict, Any

def get_user_notifications(user_id: str) -> List[Dict[str, Any]]:
    return [
        {
            "id": "n-1",
            "type": "CRITICAL",
            "title": "Critical Progress Deficit Alert",
            "message": "Artificial Intelligence (CS304 - CSE-C) is 32% behind expected progress. 4 lectures missed.",
            "timestamp": "10 minutes ago",
            "read": False,
            "link": "/hod/courses/course-ai-c"
        },
        {
            "id": "n-2",
            "type": "WARNING",
            "title": "Syllabus Lag Warning",
            "message": "Operating Systems (CS303 - CSE-A) is 18% behind expected schedule.",
            "timestamp": "1 hour ago",
            "read": False,
            "link": "/hod/recovery?courseId=course-os-a"
        },
        {
            "id": "n-3",
            "type": "INFO",
            "title": "Pending Topics Reminder",
            "message": "DBMS (CS301) has 2 pending topics remaining in Unit 4.",
            "timestamp": "3 hours ago",
            "read": True,
            "link": "/hod/courses/course-dbms-a"
        },
        {
            "id": "n-4",
            "type": "SUCCESS",
            "title": "Recovery Plan Approved",
            "message": "Recovery schedule for Operating Systems has been approved and added to Tuesday/Thursday timetable.",
            "timestamp": "Yesterday at 4:30 PM",
            "read": True,
            "link": "/hod/timetable"
        }
    ]

def send_alert_notification(recipient: str, title: str, message: str) -> bool:
    # Notification dispatcher simulation
    return True
