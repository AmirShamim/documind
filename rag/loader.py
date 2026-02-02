"""loader.py

Functions to load PDF content into plain text.
"""
from typing import List
from pathlib import Path

try:
    from pypdf import PdfReader
except Exception:
    # fallback: pypdf might not be installed in the environment yet
    PdfReader = None


def load_pdf_text(path: str) -> str:
    """Load a PDF and return the extracted text as a single string.

    Note: Uses pypdf (install via `pip install pypdf`) for lightweight extraction.
    For more robust extraction (layout / images) consider `pdfplumber`.
    """
    path = Path(path)
    if not path.exists():
        raise FileNotFoundError(path)

    if PdfReader is None:
        raise RuntimeError("pypdf not available. Install with `pip install pypdf`.")

    reader = PdfReader(str(path))
    pages = []
    for p in reader.pages:
        try:
            pages.append(p.extract_text() or '')
        except Exception:
            pages.append('')

    return "\n\n".join(pages)
