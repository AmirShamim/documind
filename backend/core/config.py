import os
from pathlib import Path

# Load .env file if python-dotenv is available
try:
    from dotenv import load_dotenv
    ROOT_DIR = Path(__file__).resolve().parent.parent.parent
    env_path = ROOT_DIR / ".env"
    if env_path.exists():
        load_dotenv(env_path)
except ImportError:
    pass

ROOT_DIR = Path(__file__).resolve().parent.parent.parent
RAG_DIR = ROOT_DIR / "rag"
UPLOAD_DIR = RAG_DIR / "uploads"
DB_DIR = RAG_DIR / "db"


def init_storage() -> None:
    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
    DB_DIR.mkdir(parents=True, exist_ok=True)


def configure_api_env() -> None:
    """Normalize API key environment variables.

    Supports SIRAY_* fallbacks so the user only needs to provide one key.
    """
    siray_key = os.getenv("SIRAY_API_KEY")
    if not os.getenv("OPENAI_API_KEY") and siray_key:
        os.environ["OPENAI_API_KEY"] = siray_key

    siray_base = os.getenv("SIRAY_BASE_URL") or os.getenv("SIRAY_API_BASE")
    if not os.getenv("OPENAI_API_BASE") and siray_base:
        os.environ["OPENAI_API_BASE"] = siray_base
    if not os.getenv("OPENAI_BASE_URL") and siray_base:
        os.environ["OPENAI_BASE_URL"] = siray_base
