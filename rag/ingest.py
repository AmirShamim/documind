from typing import Dict
from pathlib import Path
import os

# Try new imports first, fallback to old
try:
    from langchain_community.document_loaders import PyPDFLoader
    from langchain_community.vectorstores import Chroma
except ImportError:
    from langchain.document_loaders import PyPDFLoader
    from langchain.vectorstores import Chroma

try:
    from langchain_openai import OpenAIEmbeddings
except ImportError:
    from langchain.embeddings import OpenAIEmbeddings

# Try new text splitter imports first, fallback to old
try:
    from langchain_text_splitters import RecursiveCharacterTextSplitter
except ImportError:
    try:
        from langchain.text_splitter import RecursiveCharacterTextSplitter
    except ImportError:
        from langchain.text_splitters import RecursiveCharacterTextSplitter

# Use free sentence-transformers if no OpenAI key
try:
    from langchain_community.embeddings import HuggingFaceEmbeddings
except ImportError:
    HuggingFaceEmbeddings = None


def get_embeddings():
    """Return embeddings - use HuggingFace free embeddings first, then try OpenAI if configured."""
    # Try free HuggingFace embeddings first (more reliable for embeddings task)
    if HuggingFaceEmbeddings:
        try:
            return HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
        except Exception as e:
            print(f"HuggingFace embeddings failed: {e}, falling back to OpenAI")
    
    # Fall back to OpenAI if key exists
    if os.getenv("OPENAI_API_KEY"):
        try:
            return OpenAIEmbeddings()
        except Exception as e:
            print(f"OpenAI embeddings failed: {e}")
    
    # Last resort: try OpenAI anyway (will fail if no key)
    try:
        return OpenAIEmbeddings()
    except Exception:
        # If all else fails, return HuggingFace even if it seemed to fail
        if HuggingFaceEmbeddings:
            return HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
        raise RuntimeError("No embeddings provider available")


ROOT_DIR = Path(__file__).resolve().parent.parent
DB_DIR = ROOT_DIR / "rag" / "db"


def ingest_pdf(pdf_path: str, doc_id: str, persist_dir: str = None) -> Dict:
    """Load a PDF, split into chunks, embed once and persist to Chroma under collection `doc_id`.

    This should be run once per document (on upload).
    """
    if persist_dir is None:
        persist_dir = str(DB_DIR)
    
    loader = PyPDFLoader(pdf_path)
    docs = loader.load()

    splitter = RecursiveCharacterTextSplitter(chunk_size=800, chunk_overlap=150)
    chunks = splitter.split_documents(docs)

    embeddings = get_embeddings()
    vectordb = Chroma(
        persist_directory=persist_dir,
        embedding_function=embeddings,
        collection_name=doc_id,
    )

    vectordb.add_documents(chunks)
    try:
        vectordb.persist()
    except Exception:
        pass  # Newer Chroma versions auto-persist

    return {
        "doc_id": doc_id,
        "num_chunks": len(chunks),
        "page_count": len(docs),
    }
