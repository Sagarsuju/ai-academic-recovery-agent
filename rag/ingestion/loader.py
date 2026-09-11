import os

class DocumentLoader:
    def load_documents(self, doc_dir: str = "rag/documents") -> list:
        documents = []
        if not os.path.exists(doc_dir):
            return documents
        
        for root, dirs, files in os.walk(doc_dir):
            for file in files:
                if file.endswith(('.txt', '.md', '.pdf', '.doc')):
                    file_path = os.path.join(root, file)
                    try:
                        with open(file_path, 'r', encoding='utf-8') as f:
                            content = f.read()
                        documents.append({
                            "filename": file,
                            "path": file_path,
                            "content": content,
                            "category": os.path.basename(root)
                        })
                    except Exception:
                        pass
        return documents
