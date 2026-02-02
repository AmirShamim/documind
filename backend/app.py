import logging
from pathlib import Path
import shutil
import uuid

from fastapi import FastAPI, UploadFile, File, Form, HTTPException, BackgroundTasks
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

logger = logging.getLogger("documind")
logging.basicConfig(level=logging.INFO)

ROOT_DIR = Path(__file__).resolve().parent.parent
UPLOAD_DIR = ROOT_DIR / "rag" / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

app = FastAPI(title="DocuMind Backend (Demo)")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def _process_document(file_path: str, doc_id: str) -> None:
    try:
        from rag.insights import extract_insights
        extract_insights(file_path, doc_id)
        logger.info("Document %s processed", doc_id)
    except Exception as exc:
        logger.exception("Failed to process document %s: %s", doc_id, exc)


@app.get("/health")
async def health() -> dict:
    return {"status": "ok"}


@app.get("/")
async def root() -> dict:
    return {"status": "ok", "message": "DocuMind Backend (demo) — see /health"}


@app.post("/upload")
async def upload(background_tasks: BackgroundTasks, file: UploadFile = File(...)) -> dict:
    if not file or not file.filename:
        raise HTTPException(status_code=400, detail="file is required")

    ext = Path(file.filename).suffix or ".pdf"
    doc_id = uuid.uuid4().hex
    dest = UPLOAD_DIR / f"{doc_id}{ext}"

    try:
        with dest.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc

    background_tasks.add_task(_process_document, str(dest), doc_id)

    return {"doc_id": doc_id, "filename": dest.name}


@app.post("/query")
async def query(question: str = Form(...), doc_id: str = Form(...)) -> JSONResponse:
    if not doc_id:
        raise HTTPException(status_code=400, detail="doc_id is required")

    try:
        from rag.query import query_doc
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Query backend unavailable: {exc}") from exc

    try:
        answer = query_doc(doc_id, question)
        return JSONResponse(content=answer)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc


@app.get("/insights/{doc_id}")
async def insights(doc_id: str) -> JSONResponse:
    if not doc_id:
        raise HTTPException(status_code=400, detail="doc_id is required")

    try:
        from rag.insights import get_saved_insights
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Insights backend unavailable: {exc}") from exc

    saved = get_saved_insights(doc_id)
    if not saved:
        return JSONResponse({"status": "processing", "doc_id": doc_id})

    metadata = {
        "num_chunks": saved.get("num_chunks"),
        "page_count": saved.get("page_count"),
        "word_count": saved.get("word_count"),
    }

    return JSONResponse({
        "status": "ready",
        "doc_id": doc_id,
        "insights": saved.get("insights"),
        "metadata": metadata,
    })
