import os
import sys
from typing import Optional, List, Dict, Any
from fastapi import APIRouter
from pydantic import BaseModel

# Ensure root directory is available for ai_agent imports
current_dir = os.path.dirname(os.path.abspath(__file__))
root_dir = os.path.abspath(os.path.join(current_dir, "..", "..", ".."))
if root_dir not in sys.path:
    sys.path.insert(0, root_dir)

from app.rag.retriever import answer_from_kb
from ai_agent.agent import AcademicRecoveryAgent

router = APIRouter(prefix="/ai-assistant", tags=["AI Assistant"])

agent = AcademicRecoveryAgent()

class QueryRequest(BaseModel):
    query: str
    live_data: Optional[Dict[str, Any]] = None

class QueryResponse(BaseModel):
    answer: str
    sources: List[str] = []
    tool_used: Optional[str] = None
    data: Optional[Dict[str, Any]] = None

@router.post("/query", response_model=QueryResponse)
def query_ai_assistant(req: QueryRequest):
    """
    Query the AI Assistant.
    Automatically invokes `answer_from_kb` whenever the query relates to
    policy, regulations, rules, or syllabus content.
    If live telemetry data is passed, invokes live course recovery analysis.
    """
    result = agent.handle_query(user_query=req.query, live_data=req.live_data)
    return QueryResponse(
        answer=result["answer"],
        sources=result.get("sources", []),
        tool_used=result.get("tool_used"),
        data=result.get("data")
    )
