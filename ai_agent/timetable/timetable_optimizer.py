class TimetableOptimizer:
    def optimize(self, faculty_id: str, section: str, required_slots_count: int) -> list:
        from ai_agent.timetable.slot_finder import SlotFinder
        from ai_agent.timetable.conflict_checker import ConflictChecker

        finder = SlotFinder()
        checker = ConflictChecker()

        raw_slots = finder.find_free_slots(faculty_id, section)
        optimized = []
        for idx, slot in enumerate(raw_slots[:required_slots_count]):
            c = checker.check_conflicts(slot)
            slot.update({
                "id": f"slot-{idx + 1}",
                "facultyAvailable": c["faculty_available"],
                "studentsAvailable": c["students_available"],
                "roomAvailable": c["room_available"],
                "noConflict": c["no_conflict"],
                "selected": True
            })
            optimized.append(slot)
        return optimized
