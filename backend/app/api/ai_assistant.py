from fastapi import APIRouter
from pydantic import BaseModel
from rag.rag_pipeline import RAGPipeline

router = APIRouter(prefix="/ai-assistant", tags=["AI Assistant"])

rag_pipeline = RAGPipeline()

class QueryRequest(BaseModel):
    query: str

class QueryResponse(BaseModel):
    answer: str
    sources: list

@router.post("/query", response_model=QueryResponse)
def query_ai_assistant(req: QueryRequest):
    result = rag_pipeline.query(req.query)
    return QueryResponse(
        answer=result["answer"],
        sources=result["sources"]
    )
