import os
import sys
from typing import Optional, List, Dict, Any
from fastapi import APIRouter
from pydantic import BaseModel

# Ensure backend and root directories are available for ai_agent imports
current_dir = os.path.dirname(os.path.abspath(__file__))
backend_dir = os.path.abspath(os.path.join(current_dir, "..", ".."))
root_dir = os.path.abspath(os.path.join(current_dir, "..", "..", ".."))
for p in [backend_dir, root_dir]:
    if p not in sys.path:
        sys.path.insert(0, p)

from app.rag.retriever import answer_from_kb

try:
    from ai_agent.agent import AcademicRecoveryAgent
    agent = AcademicRecoveryAgent()
except Exception as e:
    print(f"Notice: AcademicRecoveryAgent lazy initialization note: {e}")
    agent = None

router = APIRouter(prefix="/ai-assistant", tags=["AI Assistant"])

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
    if agent is None:
        kb_res = answer_from_kb(req.query)
        return QueryResponse(
            answer=kb_res.get("answer", "AI Assistant is running in KB mode."),
            sources=kb_res.get("sources", []),
            tool_used="knowledge_base"
        )
    result = agent.handle_query(user_query=req.query, live_data=req.live_data)
    return QueryResponse(
        answer=result["answer"],
        sources=result.get("sources", []),
        tool_used=result.get("tool_used"),
        data=result.get("data")
    )
