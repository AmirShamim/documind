import shutil
import uuid
from pathlib import Path
from fastapi import HTTPException, UploadFile

try:
    from core.config import UPLOAD_DIR
except Exception:  # fallback when running as backend.app
    from backend.core.config import UPLOAD_DIR


def save_upload(file: UploadFile) -> dict:
    if not file or not file.filename:
        raise HTTPException(status_code=400, detail="file is required")

    ext = Path(file.filename).suffix.lower() or ".pdf"
    if ext not in [".pdf", ".xps"]:
        # allow unknown extensions to pass but force .pdf to avoid crashes in ingestion
        ext = ".pdf"

    doc_id = uuid.uuid4().hex
    dest = UPLOAD_DIR / f"{doc_id}{ext}"

    try:
        with dest.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc

    return {"doc_id": doc_id, "filename": dest.name, "path": str(dest)}


def process_document(file_path: str, doc_id: str, logger) -> None:
    """Process a document in the background - extract insights and index."""
    try:
        # Ensure environment is configured
        try:
            from core.config import configure_api_env
            configure_api_env()
        except:
            try:
                from backend.core.config import configure_api_env
                configure_api_env()
            except Exception as config_err:
                logger.warning(f"Could not load config: {config_err}")
        
        from rag.insights import extract_insights
        result = extract_insights(file_path, doc_id)
        logger.info(f"Document {doc_id} processed successfully. Insights summary: {result.get('insights', {}).get('summary', '')[:100]}")
    except Exception as exc:
        logger.exception(f"Failed to process document {doc_id}: {exc}")
        # Don't raise - background tasks should complete gracefully
