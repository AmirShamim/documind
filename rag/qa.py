"""qa.py

High-level QA flow that ties loader, chunker, embedder, and vectordb together.

This module exposes a `answer_question_from_pdf` convenience function that:
- loads a PDF
- chunks text
- embeds chunks and builds/uses a FAISS index
- retrieves top contexts and (optionally) calls an LLM to generate a final answer

For hackathon/demo speed we keep this self-contained and simple.
"""
from typing import List
from .loader import load_pdf_text
from .chunker import chunk_text
from .embedder import Embedder
from .vectordb import FaissVectorDB


def answer_question_from_pdf(pdf_path: str, question: str, top_k: int = 5) -> dict:
    """Return a basic QA response dictionary.

    NOTE: Integrate an LLM (OpenAI / other) where indicated to generate high-quality answers from contexts.
    """
    text = load_pdf_text(pdf_path)
    chunks = chunk_text(text)

    embedder = Embedder()
    embeddings = embedder.embed(chunks)

    db = FaissVectorDB(dim=embeddings.shape[1])
    db.add(embeddings, chunks)

    q_emb = embedder.embed_single(question)
    hits = db.search(q_emb, top_k=top_k)

    # For a simple demo, combine top contexts and return them with scores.
    top_texts = [h[0] for h in hits]

    # TODO: Call LLM here with a prompt like:
    #    "Given the following contexts: {top_texts} and the question: {question} produce a concise answer and cite context lines."
    # For now, return the contexts to be displayed or passed to a front-end LLM step.

    return {
        'question': question,
        'answers': [{'text': t, 'score': s} for (t, s) in hits],
        'combined_context': '\n\n'.join(top_texts[:3])
    }
