class SlotFinder:
    def find_free_slots(self, faculty_id: str, section: str) -> list:
        return [
            {"day": "Tuesday", "startTime": "11:00 AM", "endTime": "12:00 PM", "room": "AB1-Lab3"},
            {"day": "Thursday", "startTime": "02:00 PM", "endTime": "03:00 PM", "room": "AB2-104"},
            {"day": "Saturday", "startTime": "10:00 AM", "endTime": "11:00 AM", "room": "AB1-Seminar Hall"}
        ]
