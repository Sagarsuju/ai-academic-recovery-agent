import os
import chromadb
from chromadb.utils import embedding_functions

# Define persistent storage path for ChromaDB
RAG_DIR = os.path.dirname(os.path.abspath(__file__))
custom_chroma_path = os.getenv("CHROMA_PATH")
CHROMA_DATA_DIR = os.path.abspath(custom_chroma_path) if custom_chroma_path else os.path.join(RAG_DIR, "chroma_data")
os.makedirs(CHROMA_DATA_DIR, exist_ok=True)

# Initialize DefaultEmbeddingFunction (ONNX-based all-MiniLM-L6-v2, memory-efficient < 50MB)
try:
    embedding_func = embedding_functions.DefaultEmbeddingFunction()
except Exception as e:
    print(f"Note: DefaultEmbeddingFunction error ({e}); using None")
    embedding_func = None

# Persistent ChromaDB Client
client = chromadb.PersistentClient(path=CHROMA_DATA_DIR)

COLLECTION_NAME = "university_kb"

def get_collection():
    """Retrieve or create the university_kb persistent collection."""
    return client.get_or_create_collection(
        name=COLLECTION_NAME,
        embedding_function=embedding_func,
        metadata={"hnsw:space": "cosine"}
    )

def upsert_chunks(ids: list[str], documents: list[str], metadatas: list[dict]):
    """Upsert document text chunks with metadatas into university_kb."""
    collection = get_collection()
    if ids and documents and metadatas:
        collection.upsert(
            ids=ids,
            documents=documents,
            metadatas=metadatas
        )

def query_similar(query_text: str, top_k: int = 4, doc_type_filter: str = None) -> list[dict]:
    """Query university_kb collection for top_k relevant text chunks."""
    collection = get_collection()
    where_filter = None
    if doc_type_filter:
        where_filter = {"doc_type": doc_type_filter}

    results = collection.query(
        query_texts=[query_text],
        n_results=top_k,
        where=where_filter
    )

    formatted = []
    if results and results.get("documents") and len(results["documents"]) > 0:
        docs = results["documents"][0]
        ids = results["ids"][0]
        metadatas = results["metadatas"][0] if results.get("metadatas") else [{}] * len(docs)
        distances = results["distances"][0] if results.get("distances") else [0.0] * len(docs)

        for doc, doc_id, meta, dist in zip(docs, ids, metadatas, distances):
            formatted.append({
                "id": doc_id,
                "text": doc,
                "metadata": meta,
                "distance": round(float(dist), 4)
            })

    return formatted

def delete_by_filename(filename: str) -> int:
    """Delete all chunks associated with source_filename matching filename."""
    collection = get_collection()
    existing = collection.get(where={"source_filename": filename})
    if existing and existing.get("ids"):
        ids_to_delete = existing["ids"]
        collection.delete(ids=ids_to_delete)
        return len(ids_to_delete)
    return 0

def list_documents() -> list[dict]:
    """List distinct document metadata summaries ingested in university_kb."""
    collection = get_collection()
    all_data = collection.get(include=["metadatas"])
    
    docs_summary = {}
    if all_data and all_data.get("metadatas"):
        for meta in all_data["metadatas"]:
            if meta and "source_filename" in meta:
                fn = meta["source_filename"]
                if fn not in docs_summary:
                    docs_summary[fn] = {
                        "source_filename": fn,
                        "doc_type": meta.get("doc_type", "general"),
                        "upload_date": meta.get("upload_date", "Unknown"),
                        "chunk_count": 0
                    }
                docs_summary[fn]["chunk_count"] += 1

    return list(docs_summary.values())
