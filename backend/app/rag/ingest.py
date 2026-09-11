import os
import re
from datetime import datetime, timezone
from app.rag.vectorstore import upsert_chunks

def load_text_from_file(file_path: str) -> str:
    """Extract raw text from PDF, DOCX, or plain text file."""
    ext = os.path.splitext(file_path)[1].lower()

    if ext == ".pdf":
        try:
            import pypdf
            reader = pypdf.PdfReader(file_path)
            pages_text = [page.extract_text() or "" for page in reader.pages]
            return "\n".join(pages_text)
        except Exception as e:
            raise ValueError(f"Failed to extract text from PDF '{file_path}': {e}")

    elif ext in [".docx", ".doc"]:
        try:
            import docx
            doc = docx.Document(file_path)
            paragraphs = [p.text for p in doc.paragraphs if p.text.strip()]
            return "\n".join(paragraphs)
        except Exception as e:
            raise ValueError(f"Failed to extract text from DOCX '{file_path}': {e}")

    elif ext in [".txt", ".md"]:
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            return f.read()

    else:
        # Fallback text reading
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            return f.read()

def clean_text(text: str) -> str:
    """Clean text by stripping excess whitespace, headers, footers, and redundant newlines."""
    if not text:
        return ""
    # Replace tabs and multiple spaces with a single space
    cleaned = re.sub(r'[ \t]+', ' ', text)
    # Remove repetitive page headers/footers pattern (e.g. Page 1 of 10)
    cleaned = re.sub(r'(?i)page\s+\d+\s+of\s+\d+', '', cleaned)
    # Reduce 3+ consecutive newlines to double newline
    cleaned = re.sub(r'\n{3,}', '\n\n', cleaned)
    return cleaned.strip()

def recursive_chunk_text(text: str, chunk_size: int = 500, overlap: int = 50) -> list[str]:
    """Recursively split text into ~500 character chunks with 50 character overlap."""
    if not text:
        return []

    # First attempt splitting by paragraphs
    paragraphs = text.split("\n\n")
    chunks = []
    current_chunk = ""

    for para in paragraphs:
        para = para.strip()
        if not para:
            continue
        
        if len(current_chunk) + len(para) + 2 <= chunk_size:
            current_chunk = f"{current_chunk}\n\n{para}".strip()
        else:
            if current_chunk:
                chunks.append(current_chunk)
            
            # If paragraph itself exceeds chunk_size, split by sentences/lines
            if len(para) > chunk_size:
                sentences = re.split(r'(?<=[.!?])\s+', para)
                sub_chunk = ""
                for sentence in sentences:
                    if len(sub_chunk) + len(sentence) + 1 <= chunk_size:
                        sub_chunk = f"{sub_chunk} {sentence}".strip()
                    else:
                        if sub_chunk:
                            chunks.append(sub_chunk)
                        # Overlap from previous end
                        overlap_text = sub_chunk[-overlap:] if len(sub_chunk) > overlap else ""
                        sub_chunk = f"{overlap_text} {sentence}".strip()
                if sub_chunk:
                    chunks.append(sub_chunk)
                current_chunk = ""
            else:
                overlap_text = current_chunk[-overlap:] if len(current_chunk) > overlap else ""
                current_chunk = f"{overlap_text}\n\n{para}".strip()

    if current_chunk:
        chunks.append(current_chunk)

    return chunks

def ingest_document(file_path: str, doc_type: str, custom_filename: str = None) -> dict:
    """Load, clean, chunk, and ingest document into persistent ChromaDB collection."""
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"File not found: {file_path}")

    filename = custom_filename or os.path.basename(file_path)
    raw_text = load_text_from_file(file_path)
    cleaned = clean_text(raw_text)

    if not cleaned:
        raise ValueError(f"Extracted document text from '{filename}' is empty.")

    chunks = recursive_chunk_text(cleaned, chunk_size=500, overlap=50)
    upload_timestamp = datetime.now(timezone.utc).isoformat()

    ids = []
    documents = []
    metadatas = []

    for idx, chunk in enumerate(chunks):
        chunk_id = f"{filename}#chunk_{idx+1}"
        ids.append(chunk_id)
        documents.append(chunk)
        metadatas.append({
            "source_filename": filename,
            "doc_type": doc_type,
            "upload_date": upload_timestamp,
            "chunk_index": idx + 1,
            "total_chunks": len(chunks)
        })

    upsert_chunks(ids=ids, documents=documents, metadatas=metadatas)

    return {
        "status": "success",
        "source_filename": filename,
        "doc_type": doc_type,
        "upload_date": upload_timestamp,
        "chunk_count": len(chunks)
    }
