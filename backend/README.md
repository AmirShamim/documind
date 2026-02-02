DocuMind backend (FastAPI) - demo

Quick start (local, demo):

1. Install dependencies (from repo root):

```bash
pip install -r requirements.txt
```

2. Run the FastAPI server:

```bash
cd backend
uvicorn app:app --reload --port 8000
```

3. Endpoints:

- `GET /health` — health check
- `POST /upload` — multipart form file upload (field `file`). Returns `filename` used by subsequent queries.
- `POST /query` — form fields: `question` (required), and either `file` (UploadFile) or `filename` (string returned from `/upload`). Returns contexts and scores from the RAG demo pipeline.

Notes:
- This is a demo/proof-of-concept. For production, protect endpoints, add authentication, and run the embedding/indexing pipeline as background jobs.
