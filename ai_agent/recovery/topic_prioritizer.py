class TopicPrioritizer:
    def prioritize_topics(self, topics: list) -> list:
        # Sort by priority ('HIGH' first) and unit number
        priority_map = {"HIGH": 1, "MEDIUM": 2, "LOW": 3}
        return sorted(topics, key=lambda t: (priority_map.get(t.get("priority", "MEDIUM"), 2), t.get("unit_number", 1)))
