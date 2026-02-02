from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

try:
    from core.config import configure_api_env, init_storage
    from core.logging import setup_logging
    from routes.health import router as health_router
    from routes.documents import router as documents_router
except Exception:  # fallback for running as backend.app
    from backend.core.config import configure_api_env, init_storage
    from backend.core.logging import setup_logging
    from backend.routes.health import router as health_router
    from backend.routes.documents import router as documents_router


def create_app() -> FastAPI:
    setup_logging()
    configure_api_env()
    init_storage()

    app = FastAPI(title="DocuMind Backend (Demo)")
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(health_router)
    app.include_router(documents_router)
    return app


app = create_app()

