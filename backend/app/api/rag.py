import os
import shutil
import tempfile
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Path
from typing import List, Optional
from pydantic import BaseModel

from app.rag.ingest import ingest_document
from app.rag.vectorstore import list_documents, delete_by_filename
from app.rag.retriever import retrieve, answer_from_kb, retrieve_relevant_chunks

router = APIRouter(prefix="/api/rag", tags=["RAG Module"])

class QueryKBRequest(BaseModel):
    question: str
    doc_type: Optional[str] = None

class QueryKBResponse(BaseModel):
    answer: str
    sources: List[str]

ALLOWED_DOC_TYPES = [
    "syllabus",
    "regulations",
    "academic_policy",
    "attendance_policy",
    "examination_rules",
    "recovery_policy"
]

class DocumentMetadataResponse(BaseModel):
    source_filename: str
    doc_type: str
    upload_date: str
    chunk_count: int

class SearchQueryRequest(BaseModel):
    query: str
    top_k: Optional[int] = 4
    doc_type: Optional[str] = None

class SearchResultChunk(BaseModel):
    id: str
    text: str
    metadata: dict
    distance: float

@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    doc_type: str = Form(...)
):
    """Upload a document (.pdf, .docx, .txt, .md) and ingest into offline ChromaDB vectorstore."""
    if doc_type not in ALLOWED_DOC_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid doc_type '{doc_type}'. Allowed types: {', '.join(ALLOWED_DOC_TYPES)}"
        )

    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in [".pdf", ".docx", ".doc", ".txt", ".md"]:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file format '{ext}'. Allowed extensions: .pdf, .docx, .txt, .md"
        )

    # Save to temporary file for parsing
    temp_dir = tempfile.mkdtemp()
    temp_path = os.path.join(temp_dir, file.filename)

    try:
        with open(temp_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        result = ingest_document(
            file_path=temp_path,
            doc_type=doc_type,
            custom_filename=file.filename
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to ingest document: {str(e)}")
    finally:
        shutil.rmtree(temp_dir, ignore_errors=True)

@router.get("/documents", response_model=List[DocumentMetadataResponse])
def get_ingested_documents():
    """List all ingested documents and their metadata summaries."""
    try:
        docs = list_documents()
        return docs
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error listing documents: {str(e)}")

@router.delete("/documents/{filename}")
def delete_document(filename: str = Path(..., description="The source_filename to delete")):
    """Delete an ingested document and all its chunks from vectorstore."""
    try:
        deleted_count = delete_by_filename(filename)
        if deleted_count == 0:
            raise HTTPException(status_code=444 if False else 404, detail=f"Document '{filename}' not found in vectorstore.")
        return {
            "status": "success",
            "message": f"Deleted document '{filename}' and {deleted_count} associated text chunks.",
            "deleted_chunks": deleted_count
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting document: {str(e)}")

@router.post("/search", response_model=List[SearchResultChunk])
def search_vectorstore(req: SearchQueryRequest):
    """Retrieve relevant document chunks matching user query."""
    try:
        chunks = retrieve(
            question=req.query,
            k=req.top_k or 4,
            doc_type=req.doc_type
        )
        return chunks
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error performing vector search: {str(e)}")

@router.post("/query", response_model=QueryKBResponse)
def query_rag_kb(req: QueryKBRequest):
    """Answer question strictly from the university knowledge base using RAG."""
    try:
        res = answer_from_kb(question=req.question, doc_type=req.doc_type)
        return res
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error querying knowledge base: {str(e)}")

def seed_initial_rag_documents():
    """Seed sample policy text files into ChromaDB if vectorstore is empty."""
    try:
        existing = list_documents()
        if existing and len(existing) > 0:
            return

        seed_dir = os.path.join(os.path.dirname(__file__), "..", "rag", "seed_docs")
        if not os.path.exists(seed_dir):
            return

        seed_map = {
            "attendance_policy.txt": "attendance_policy",
            "recovery_policy.txt": "recovery_policy",
            "academic_regulations.txt": "regulations"
        }

        for filename, doc_type in seed_map.items():
            path = os.path.join(seed_dir, filename)
            if os.path.exists(path):
                ingest_document(file_path=path, doc_type=doc_type, custom_filename=filename)
                print(f"[RAG] Seeded policy document: {filename}")
    except Exception as e:
        print(f"RAG initial seeding note: {e}")
