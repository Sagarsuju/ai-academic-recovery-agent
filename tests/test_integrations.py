import os
import sys
import unittest
from datetime import datetime, timezone
from fastapi.testclient import TestClient

# Add backend directory to sys.path
backend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend"))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from mock_services.mock_attendance_system import app as mock_att_app
from mock_services.mock_lesson_plan_system import app as mock_lp_app
from app.integrations.attendance_system_client import sync_attendance
from app.integrations.lesson_plan_system_client import sync_lesson_plans
from app.integrations.scheduler import get_all_sync_status, run_sync_now, start_scheduler, stop_scheduler
from app.database.database import SessionLocal
from sqlalchemy import text
from main import app

class TestIntegrationsSuite(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        start_scheduler()

    @classmethod
    def tearDownClass(cls):
        stop_scheduler()

    def test_01_mock_attendance_service(self):
        """Verify mock attendance service on port 9001 logic."""
        client = TestClient(mock_att_app)
        r = client.get("/attendance-records")
        self.assertEqual(r.status_code, 200)
        records = r.json()
        self.assertGreater(len(records), 0)
        first = records[0]
        self.assertIn("student_id", first)
        self.assertIn("course_id", first)
        self.assertIn("date", first)

        # Test with since filter
        r_since = client.get("/attendance-records?since=2026-09-11")
        self.assertEqual(r_since.status_code, 200)
        for rec in r_since.json():
            self.assertGreaterEqual(rec["date"], "2026-09-11")

    def test_02_mock_lesson_plan_service(self):
        """Verify mock lesson plan service on port 9002 logic."""
        client = TestClient(mock_lp_app)
        r = client.get("/lesson-plans")
        self.assertEqual(r.status_code, 200)
        plans = r.json()
        self.assertGreater(len(plans), 0)
        first = plans[0]
        self.assertIn("course_id", first)
        self.assertIn("title", first)

        # Test course_id filter
        r_filtered = client.get("/lesson-plans?course_id=course-ai-c")
        self.assertEqual(r_filtered.status_code, 200)
        for p in r_filtered.json():
            self.assertEqual(p["course_id"], "course-ai-c")

    def test_03_sync_attendance_and_deduplication(self):
        """Verify sync_attendance upserts records and skips duplicates by student_id+course_id+date."""
        res1 = sync_attendance()
        self.assertEqual(res1["status"], "SUCCESS")
        
        # Second run should skip duplicates
        res2 = sync_attendance()
        self.assertEqual(res2["status"], "SUCCESS")
        self.assertEqual(res2["synced_records"], 0)
        self.assertGreater(res2["skipped_records"], 0)

        # Verify records exist in database
        db = SessionLocal()
        try:
            row = db.execute(text("SELECT count(*) FROM attendance WHERE student_id IS NOT NULL")).scalar()
            self.assertGreater(row, 0)
        finally:
            db.close()

    def test_04_sync_lesson_plans_and_deduplication(self):
        """Verify sync_lesson_plans adds topics not already present, matched by course_id+title."""
        res1 = sync_lesson_plans()
        self.assertEqual(res1["status"], "SUCCESS")

        # Second run should find them all existing and skip them
        res2 = sync_lesson_plans()
        self.assertEqual(res2["status"], "SUCCESS")
        self.assertEqual(res2["synced_records"], 0)
        self.assertGreater(res2["skipped_records"], 0)

        # Verify topics exist in database
        db = SessionLocal()
        try:
            row = db.execute(text("SELECT count(*) FROM topics WHERE topic_title LIKE '%Transformer Attention%'")).scalar()
            self.assertEqual(row, 1)
        finally:
            db.close()

    def test_05_scheduler_sync_status(self):
        """Verify scheduler records status in SyncStatus table."""
        run_res = run_sync_now()
        self.assertEqual(run_res["status"], "success")

        status = get_all_sync_status()
        self.assertIn("attendance_system", status)
        self.assertIn("lesson_plan_system", status)
        self.assertEqual(status["attendance_system"]["last_sync_status"], "SUCCESS")
        self.assertEqual(status["lesson_plan_system"]["last_sync_status"], "SUCCESS")
        self.assertIsNotNone(status["attendance_system"]["last_sync_time"])
        self.assertIsNotNone(status["lesson_plan_system"]["last_sync_time"])

    def test_06_integrations_api_endpoints(self):
        """Verify GET /api/integrations/status and POST /api/integrations/sync."""
        with TestClient(app) as client:
            r = client.get("/api/integrations/status")
            self.assertEqual(r.status_code, 200)
            data = r.json()
            self.assertIn("attendance_system", data)
            self.assertIn("lesson_plan_system", data)
            self.assertTrue(data["scheduler_running"])
            self.assertEqual(data["attendance_system"]["last_sync_status"], "SUCCESS")

            # Test manual trigger
            r_sync = client.post("/api/integrations/sync?integration=attendance_system")
            self.assertEqual(r_sync.status_code, 200)
            sync_data = r_sync.json()
            self.assertEqual(sync_data["status"], "success")

if __name__ == "__main__":
    unittest.main()
