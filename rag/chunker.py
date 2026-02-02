"""chunker.py

Simple text chunking utilities for RAG.
"""
from typing import List


def chunk_text(text: str, chunk_size: int = 1000, overlap: int = 200) -> List[str]:
    """Break text into chunks of approximately `chunk_size` characters with `overlap`.

    This is a simple, tokenizer-agnostic approach suitable for quick demos.
    """
    if len(text) <= chunk_size:
        return [text]

    chunks = []
    start = 0
    L = len(text)
    while start < L:
        end = min(start + chunk_size, L)
        chunks.append(text[start:end])
        start = max(start + chunk_size - overlap, end)
    return chunks
