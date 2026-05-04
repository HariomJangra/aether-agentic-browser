from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from agent import start_agent_init
from routes import router


# Path to the built React frontend (sibling folder: ../frontend/dist)
FRONTEND_DIST = Path(__file__).resolve().parent.parent / "frontend" / "dist"


def create_app() -> FastAPI:
    app = FastAPI()

    # Allow all origins so the React dev server can talk to this API
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Start loading the AI agent in the background as soon as server starts
    @app.on_event("startup")
    async def startup():
        start_agent_init()

    # Register all API routes (prefixed with nothing, so /chat, /stop, etc.)
    app.include_router(router)

    # Serve the built React frontend if the dist folder exists
    if FRONTEND_DIST.is_dir():
        app.mount(
            "/assets",
            StaticFiles(directory=FRONTEND_DIST / "assets"),
            name="assets",
        )

        @app.get("/{full_path:path}")
        async def serve_spa(full_path: str):
            file = FRONTEND_DIST / full_path
            if file.is_file():
                return FileResponse(file)
            return FileResponse(FRONTEND_DIST / "index.html")

    return app