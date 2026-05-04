"""Static server for the aether-search frontend UI."""

from pathlib import Path

import uvicorn
from fastapi import FastAPI
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles


app = FastAPI()

frontend_dist = Path(__file__).resolve().parent.parent / "frontend" / "dist"

if frontend_dist.is_dir():
    app.mount("/assets", StaticFiles(directory=frontend_dist / "assets"), name="assets")

    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        file = frontend_dist / full_path
        if file.is_file():
            return FileResponse(file)
        return FileResponse(frontend_dist / "index.html")
else:
    @app.get("/")
    async def missing_build():
        return JSONResponse(
            {
                "detail": "Frontend build not found. Run npm install && npm run build in Agentic AI/aether-search/frontend.",
            },
            status_code=503,
        )


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
