import os
import sys
import unittest
from fastapi.testclient import TestClient

# Add backend directory to sys.path
backend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend"))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from app.services.notification_service import (
    create_notification,
    get_user_notifications,
    mark_notification_as_read,
    send_email_notification,
    manager
)
from app.services.prediction_service import assess_course_risk
from app.services.risk_service import evaluate_course_risk
from app.services.recovery_service import propose_recovery_plan
from app.integrations.scheduler import job_sync_attendance
from app.database.database import SessionLocal
from sqlalchemy import text
from main import app

class TestNotificationsSuite(unittest.TestCase):
    def test_01_create_and_fetch_notification(self):
        """Test creating a notification in the Notification table and fetching it."""
        notif = create_notification(
            user_id="user-hod",
            type="CRITICAL",
            title="Automated Test Alert",
            message="This is a test notification message for database persistence.",
            link="/test/link"
        )
        self.assertIn("id", notif)
        self.assertEqual(notif["type"], "CRITICAL")
        self.assertFalse(notif["is_read"])

        # Fetch from DB
        user_notifs = get_user_notifications("user-hod")
        found = [n for n in user_notifs if n["id"] == notif["id"]]
        self.assertEqual(len(found), 1)
        self.assertEqual(found[0]["title"], "Automated Test Alert")

        # Mark read
        success = mark_notification_as_read(notif["id"])
        self.assertTrue(success)

    def test_02_trigger_course_newly_at_risk(self):
        """Trigger 1: AI agent flags course as newly at-risk from prediction/risk service."""
        res = assess_course_risk(
            course_id="course-ai-c",
            course_name="Artificial Intelligence & Machine Learning",
            actual_pct=48.0,
            expected_pct=80.0,
            section="CSE-C",
            faculty_user_id="user-fac4",
            notify=True
        )
        self.assertEqual(res["risk_level"], "CRITICAL")
        self.assertTrue(res["notification_sent"])
        self.assertIsNotNone(res["notification"])
        self.assertEqual(res["notification"]["type"], "CRITICAL")
        self.assertIn("Course Risk Alert", res["notification"]["title"])

        # Test evaluate_course_risk alias
        res_alias = evaluate_course_risk(
            course_id="course-java-b",
            course_name="Java & OOP",
            actual_pct=78.0,
            expected_pct=88.0,
            section="CSE-B",
            notify=True
        )
        self.assertEqual(res_alias["risk_level"], "MINOR_SLIPPAGE")
        self.assertTrue(res_alias["notification_sent"])

    def test_03_trigger_recovery_plan_proposed(self):
        """Trigger 2: Recovery plan is proposed in recovery_service."""
        plan = propose_recovery_plan(course_id="course-ai-c", notify=True)
        self.assertEqual(plan.courseId, "course-ai-c")

        # Verify notification in database for HOD
        notifs = get_user_notifications("user-hod")
        proposed_notifs = [n for n in notifs if "Recovery Plan Proposed" in n["title"] and "Artificial Intelligence" in n["title"]]
        self.assertGreater(len(proposed_notifs), 0)

    def test_04_trigger_recovery_plan_approved_rejected(self):
        """Trigger 3: Recovery plan is approved or rejected via API route (HOD action)."""
        with TestClient(app) as client:
            # 1. Approve
            r_app = client.post("/recovery/approve", json={
                "courseId": "course-os-a",
                "notes": "Approved for 3 weekend recovery lecture sessions."
            })
            self.assertEqual(r_app.status_code, 200)
            data_app = r_app.json()
            self.assertEqual(data_app["status"], "success")
            self.assertEqual(data_app["action"], "approved")
            self.assertEqual(data_app["notification"]["type"], "SUCCESS")

            # 2. Reject
            r_rej = client.post("/recovery/reject", json={
                "courseId": "course-java-b",
                "reason": "Excessive slot conflict on Saturday morning."
            })
            self.assertEqual(r_rej.status_code, 200)
            data_rej = r_rej.json()
            self.assertEqual(data_rej["status"], "success")
            self.assertEqual(data_rej["action"], "rejected")
            self.assertEqual(data_rej["notification"]["type"], "WARNING")

    def test_05_trigger_integration_sync_failure(self):
        """Trigger 4: Integration sync fails from scheduler."""
        import app.integrations.scheduler as sched_mod
        orig_sync = sched_mod.sync_attendance

        # Simulate exception during sync
        def mock_failing_sync():
            raise ConnectionError("Simulated external biometric server timeout at 192.168.1.100")

        sched_mod.sync_attendance = mock_failing_sync
        try:
            sched_mod.job_sync_attendance()
            # Verify failure status recorded
            status = sched_mod.get_all_sync_status()
            self.assertEqual(status["attendance_system"]["last_sync_status"], "FAILED")

            # Verify notification created
            notifs = get_user_notifications("user-hod")
            fail_notifs = [n for n in notifs if "Integration Sync Failed: Attendance System" in n["title"]]
            self.assertGreater(len(fail_notifs), 0)
            self.assertEqual(fail_notifs[0]["type"], "CRITICAL")
        finally:
            sched_mod.sync_attendance = orig_sync

    def test_06_websocket_live_notifications(self):
        """Verify WebSocket endpoint /ws/notifications/{user_id} receives live alerts."""
        with TestClient(app) as client:
            with client.websocket_connect("/ws/notifications/user-hod") as websocket:
                # 1. Initial connection payload
                init_msg = websocket.receive_json()
                self.assertEqual(init_msg["event"], "connected")
                self.assertEqual(init_msg["user_id"], "user-hod")
                self.assertIn("unread_count", init_msg)

                # 2. Trigger notification while user is connected
                test_notif = create_notification(
                    user_id="user-hod",
                    type="WARNING",
                    title="Live WebSocket Alert",
                    message="Live push event test.",
                    link="/live"
                )

                # 3. Receive pushed notification over WebSocket
                pushed_msg = websocket.receive_json()
                self.assertEqual(pushed_msg["event"], "new_notification")
                self.assertEqual(pushed_msg["notification"]["id"], test_notif["id"])
                self.assertEqual(pushed_msg["notification"]["title"], "Live WebSocket Alert")

                # 4. Test heartbeat
                websocket.send_text("ping")
                pong_msg = websocket.receive_json()
                self.assertEqual(pong_msg["event"], "pong")

    def test_07_email_stub_safety(self):
        """Confirm email sending is safely stubbed in dev mode without crashing when SMTP is unset."""
        # Ensure SMTP env vars are unset
        os.environ.pop("SMTP_SERVER", None)
        os.environ.pop("SMTP_USER", None)

        # Should log safely and return True
        res = send_email_notification(
            recipient_email="hod.cse@vignan.edu.in",
            title="Safe Email Test",
            message="This should log safely in dev mode."
        )
        self.assertTrue(res)

if __name__ == "__main__":
    unittest.main()
