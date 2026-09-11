from rag.retrieval.retriever import DocumentRetriever
from rag.retrieval.reranker import DocumentReranker

class RAGPipeline:
    def __init__(self):
        self.retriever = DocumentRetriever()
        self.reranker = DocumentReranker()

    def query(self, user_query: str) -> dict:
        retrieved_docs = self.retriever.retrieve(user_query, top_k=2)
        reranked_docs = self.reranker.rerank(user_query, retrieved_docs)

        context_text = "\n".join([doc["text"] for doc in reranked_docs])

        # Generate intelligent contextual response
        answer = f"Based on Vignan University academic guidelines:\n\n{context_text}"
        return {
            "answer": answer,
            "sources": [doc["id"] for doc in reranked_docs]
        }
