import os
import re
from app.rag.vectorstore import query_similar
from app.config.settings import settings

STRICT_SYSTEM_PROMPT = (
    "You are the official Vignan University Academic Knowledge Base Assistant.\n"
    "Answer the user's question STRICTLY using ONLY the provided context below.\n"
    "If the context does not contain the answer, you must say: 'I don't have that information in the university knowledge base.'\n"
    "Do NOT make up information, assume details, or answer from general outside knowledge.\n"
    "Always cite the source document name(s) in your response."
)

def retrieve(question: str, doc_type: str | None = None, k: int = 4) -> list[dict]:
    """
    Retrieve top-k relevant chunks from the persistent ChromaDB collection.
    Returns a list of dicts with {text, source, doc_type}.
    """
    if not question or not question.strip():
        return []

    raw_chunks = query_similar(
        query_text=question.strip(),
        top_k=k,
        doc_type_filter=doc_type
    )

    results = []
    for chunk in raw_chunks:
        meta = chunk.get("metadata") or {}
        results.append({
            "text": chunk.get("text", ""),
            "source": meta.get("source_filename", "unknown"),
            "doc_type": meta.get("doc_type", "general"),
            "distance": chunk.get("distance", 0.0),
            "id": chunk.get("id", "")
        })
    return results

# Alias for backwards compatibility
retrieve_relevant_chunks = retrieve

def _offline_grounded_answer(question: str, chunks: list[dict]) -> dict:
    """
    Deterministic offline response generator adhering strictly to the university knowledge base context.
    If the context does not contain the answer, responds with the strict fallback.
    """
    if not chunks:
        return {
            "answer": "I don't have that information in the university knowledge base.",
            "sources": []
        }

    q_lower = question.lower()
    # Tokenize question into meaningful search keywords (length >= 3, excluding stop words)
    stop_words = {
        "what", "is", "the", "for", "and", "a", "an", "in", "of", "to", "how",
        "are", "do", "does", "can", "should", "with", "from", "on", "at", "by", "this", "that"
    }
    q_words = [w for w in re.findall(r'\b[a-zA-Z]{3,}\b', q_lower) if w not in stop_words]

    relevant_sentences = []
    cited_sources = []

    for c in chunks:
        # Cosine distance check - above 0.70 indicates poor semantic match
        if c.get("distance", 0.0) > 0.70:
            continue

        text = c["text"]
        source = c["source"]
        
        # Split text into sentences/paragraphs
        lines = [s.strip() for s in re.split(r'(?<=[.!?])\s+|\n+', text) if s.strip()]
        for line in lines:
            line_clean = line.strip()
            # Skip short pure headers / section numbers without substantive content
            if len(line_clean) < 30 or line_clean.isupper() or re.match(r'^\d+\.\s+[A-Z\s&]+$', line_clean):
                continue

            line_lower = line_clean.lower()
            # Count keyword matches
            matches = sum(1 for word in q_words if word in line_lower)
            if matches >= 1:
                # Give weight to regulatory directives (must, shall, between, condonation, remedial, slots)
                regulatory_boost = sum(1 for kw in ["must", "shall", "percent", "%", "condonation", "remedial", "recovery", "slots", "eligible", "allocated"] if kw in line_lower)
                score = matches * 2 + regulatory_boost
                relevant_sentences.append((score, source, line_clean))
                if source not in cited_sources:
                    cited_sources.append(source)

    if not relevant_sentences:
        return {
            "answer": "I don't have that information in the university knowledge base.",
            "sources": []
        }

    # Sort matching sentences by relevance score and length
    relevant_sentences.sort(key=lambda x: (x[0], len(x[2])), reverse=True)
    
    # Pick the top unique informative sentences
    seen_texts = set()
    unique_lines = []
    for _, src, line in relevant_sentences:
        normalized = re.sub(r'\s+', ' ', line).strip()
        if normalized not in seen_texts:
            seen_texts.add(normalized)
            unique_lines.append(f"- {normalized} (Source: {src})")
            if len(unique_lines) >= 4:
                break

    if not unique_lines:
        return {
            "answer": "I don't have that information in the university knowledge base.",
            "sources": []
        }

    formatted_answer = (
        "According to official Vignan University policies:\n\n"
        + "\n".join(unique_lines)
    )

    return {
        "answer": formatted_answer,
        "sources": cited_sources
    }

def answer_from_kb(question: str, doc_type: str | None = None, k: int = 4) -> dict:
    """
    Answer user question strictly using university knowledge base.
    Retrieves top-k chunks, prompts the LLM with strict context grounding,
    and returns {answer, sources}.
    """
    if not question or not question.strip():
        return {
            "answer": "Please provide a question to query the university knowledge base.",
            "sources": []
        }

    chunks = retrieve(question=question, doc_type=doc_type, k=k)

    if not chunks:
        return {
            "answer": "I don't have that information in the university knowledge base.",
            "sources": []
        }

    # Build context representation
    context_blocks = []
    sources = []
    for c in chunks:
        src = c["source"]
        if src not in sources:
            sources.append(src)
        context_blocks.append(f"[Document: {src} | Type: {c['doc_type']}]\n{c['text']}")

    context_str = "\n\n---\n\n".join(context_blocks)

    # Check for live OpenAI configuration
    api_key = os.getenv("OPENAI_API_KEY") or getattr(settings, "OPENAI_API_KEY", "")
    is_live_key = bool(
        api_key and
        api_key not in ["mock_openai_api_key", "your_openai_api_key_here"] and
        api_key.startswith("sk-")
    )

    if is_live_key:
        try:
            from openai import OpenAI
            client = OpenAI(api_key=api_key)
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": STRICT_SYSTEM_PROMPT},
                    {
                        "role": "user",
                        "content": f"Context:\n{context_str}\n\nQuestion: {question}"
                    }
                ],
                temperature=0.0
            )
            raw_answer = response.choices[0].message.content.strip()
            
            if "don't have that information" in raw_answer.lower():
                return {
                    "answer": "I don't have that information in the university knowledge base.",
                    "sources": []
                }

            return {
                "answer": raw_answer,
                "sources": sources
            }
        except Exception as e:
            print(f"[RAG] OpenAI call failed or unavailable ({e}); falling back to offline grounded extractor.")

    # Fallback offline deterministic context extractor
    return _offline_grounded_answer(question, chunks)
