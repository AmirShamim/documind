"""vectordb.py

A thin FAISS-based vector store wrapper for demo purposes.
"""
from typing import List, Tuple
import numpy as np

try:
    import faiss
except Exception:
    faiss = None


class FaissVectorDB:
    def __init__(self, dim: int):
        if faiss is None:
            raise RuntimeError('faiss not installed. pip install faiss-cpu')
        self.dim = dim
        # Using IndexFlatIP + normalized vectors to emulate cosine similarity
        self.index = faiss.IndexFlatIP(dim)
        self.texts: List[str] = []

    def add(self, embeddings: np.ndarray, texts: List[str]):
        # normalize for cosine similarity
        norms = np.linalg.norm(embeddings, axis=1, keepdims=True)
        norms[norms == 0] = 1.0
        embs = embeddings / norms
        self.index.add(embs.astype('float32'))
        self.texts.extend(texts)

    def search(self, embedding: np.ndarray, top_k: int = 5) -> List[Tuple[str, float]]:
        vec = embedding.reshape(1, -1).astype('float32')
        # normalize
        norm = np.linalg.norm(vec)
        if norm == 0:
            return []
        vec = vec / norm
        D, I = self.index.search(vec, top_k)
        results = []
        for score, idx in zip(D[0], I[0]):
            if idx < 0 or idx >= len(self.texts):
                continue
            results.append((self.texts[idx], float(score)))
        return results
