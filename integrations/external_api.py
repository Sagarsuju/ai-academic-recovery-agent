# External University ERP API Integration

class UniversityERPClient:
    def sync_academic_calendar(self) -> list:
        return [
            {"event": "Mid-Term Examinations", "start": "2026-10-15", "end": "2026-10-22"},
            {"event": "End-Semester Examinations", "start": "2026-12-15", "end": "2026-12-30"}
        ]
