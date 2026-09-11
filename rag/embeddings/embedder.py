import hashlib

class DocumentEmbedder:
    def embed(self, text: str) -> list:
        # Generate deterministic mock vector embedding (384 dimensional)
        hash_digest = hashlib.sha256(text.encode('utf-8')).digest()
        vector = [(b / 255.0) - 0.5 for b in hash_digest]
        # Pad to 384 dimensions
        while len(vector) < 384:
            vector.extend(vector[:min(384 - len(vector), len(vector))])
        return vector[:384]
