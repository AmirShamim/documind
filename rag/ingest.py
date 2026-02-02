from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings
from typing import Dict


def ingest_pdf(pdf_path: str, doc_id: str, persist_dir: str = "rag/db") -> Dict:
    """Load a PDF, split into chunks, embed once and persist to Chroma under collection `doc_id`.

    This should be run once per document (on upload).
    """
    loader = PyPDFLoader(pdf_path)
    docs = loader.load()

    splitter = RecursiveCharacterTextSplitter(chunk_size=800, chunk_overlap=150)
    chunks = splitter.split_documents(docs)

    vectordb = Chroma(
        persist_directory=persist_dir,
        embedding_function=OpenAIEmbeddings(),
        collection_name=doc_id,
    )

    vectordb.add_documents(chunks)
    vectordb.persist()

    return {
        "doc_id": doc_id,
        "num_chunks": len(chunks),
        "page_count": len(docs),
    }
