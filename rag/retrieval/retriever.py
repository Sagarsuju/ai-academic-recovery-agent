from rag.vector_db.chroma_client import ChromaDBClient

class DocumentRetriever:
    def __init__(self):
        self.chroma_client = ChromaDBClient()

    def retrieve(self, query: str, top_k: int = 2) -> list:
        return self.chroma_client.query(query, top_k=top_k)
