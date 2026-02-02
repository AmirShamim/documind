"""embedder.py

Embeddings wrapper using SentenceTransformers.
"""
from typing import List
import numpy as np

try:
    from sentence_transformers import SentenceTransformer
except Exception:
    SentenceTransformer = None


class Embedder:
    def __init__(self, model_name: str = 'all-MiniLM-L6-v2'):
        if SentenceTransformer is None:
            raise RuntimeError('sentence-transformers not installed. pip install sentence-transformers')
        self.model = SentenceTransformer(model_name)

    def embed(self, texts: List[str]) -> np.ndarray:
        """Return embeddings as a 2D numpy array."""
        embs = self.model.encode(texts, show_progress_bar=False)
        return np.array(embs)

    def embed_single(self, text: str) -> np.ndarray:
        return self.embed([text])[0]
