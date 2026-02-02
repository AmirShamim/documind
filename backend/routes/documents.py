import sys
import os
from pathlib import Path
from fastapi import APIRouter, BackgroundTasks, File, Form, HTTPException, UploadFile
from fastapi.responses import JSONResponse

# Add parent directory to path for imports
ROOT_DIR = Path(__file__).resolve().parent.parent.parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

try:
    from core.logging import setup_logging
    from services.documents import save_upload, process_document
except ImportError:  # fallback when running as backend.app
    from backend.core.logging import setup_logging
    from backend.services.documents import save_upload, process_document

router = APIRouter()
logger = setup_logging()


@router.post("/upload")
async def upload(background_tasks: BackgroundTasks, file: UploadFile = File(...)) -> dict:
    saved = save_upload(file)
    background_tasks.add_task(process_document, saved["path"], saved["doc_id"], logger)
    return {"doc_id": saved["doc_id"], "filename": saved["filename"]}


@router.post("/query")
async def query(question: str = Form(...), doc_id: str = Form(...)) -> JSONResponse:
    if not doc_id:
        raise HTTPException(status_code=400, detail="doc_id is required")

    try:
        from rag.query import query_doc
    except ImportError as exc:
        logger.error(f"Failed to import query_doc: {exc}")
        raise HTTPException(status_code=500, detail=f"Query backend unavailable: {exc}") from exc

    try:
        logger.info(f"Querying doc {doc_id} with question: {question}")
        answer = query_doc(doc_id, question)
        logger.info(f"Query succeeded for doc {doc_id}")
        return JSONResponse(content=answer)
    except Exception as exc:
        logger.exception(f"Query failed for doc {doc_id}: {exc}")
        raise HTTPException(status_code=500, detail=str(exc)) from exc


@router.get("/insights/{doc_id}")
async def insights(doc_id: str) -> JSONResponse:
    if not doc_id:
        raise HTTPException(status_code=400, detail="doc_id is required")

    try:
        from rag.insights import get_saved_insights
    except ImportError as exc:
        logger.error(f"Failed to import get_saved_insights: {exc}")
        raise HTTPException(status_code=500, detail=f"Insights backend unavailable: {exc}") from exc

    try:
        logger.info(f"Fetching insights for doc {doc_id}")
        saved = get_saved_insights(doc_id)
        if not saved:
            logger.info(f"No saved insights for doc {doc_id}, still processing")
            return JSONResponse({"status": "processing", "doc_id": doc_id})

        metadata = {
            "num_chunks": saved.get("num_chunks"),
            "page_count": saved.get("page_count"),
            "word_count": saved.get("word_count"),
        }

        logger.info(f"Returning ready insights for doc {doc_id}")
        return JSONResponse({
            "status": "ready",
            "doc_id": doc_id,
            "insights": saved.get("insights"),
            "metadata": metadata,
        })
    except Exception as exc:
        logger.exception(f"Insights endpoint failed for doc {doc_id}: {exc}")
        raise HTTPException(status_code=500, detail=str(exc)) from exc
