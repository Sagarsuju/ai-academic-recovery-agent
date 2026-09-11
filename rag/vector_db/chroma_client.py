class ChromaDBClient:
    def __init__(self, collection_name: str = "university_knowledge_base"):
        self.collection_name = collection_name
        self.documents = [
            {
                "id": "doc-1",
                "text": "Vignan University Academic Regulations Section 4.2: If a course falls > 15% behind scheduled syllabus coverage, HOD is empowered to mandate up to 4 extra recovery lectures.",
                "category": "academic_rules"
            },
            {
                "id": "doc-2",
                "text": "Attendance Policy Section 8.1: Minimum attendance requirement for term examination eligibility is 75%. Faculty must record attendance within 24 hours of lecture completion.",
                "category": "attendance_policy"
            },
            {
                "id": "doc-3",
                "text": "Examination Regulations: Mid-term evaluation covers Unit 1, Unit 2, and 50% of Unit 3. Uncovered topics must be reported to HOD 10 days prior to exam start.",
                "category": "examination_rules"
            }
        ]

    def query(self, query_text: str, top_k: int = 2) -> list:
        # Similarity search matching key terms
        query_words = set(query_text.lower().split())
        scored = []
        for doc in self.documents:
            doc_words = set(doc["text"].lower().split())
            overlap = len(query_words.intersection(doc_words))
            scored.append((overlap, doc))
        
        scored.sort(key=lambda x: x[0], reverse=True)
        return [doc for score, doc in scored[:top_k]]
