from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.video_info import router as video_info_router
from routes.subtitles import router as subtitles_router
from routes.ask import router as ask_router
from routes.health import router as health_router
from config import get_logger, BACKEND_HOST, BACKEND_PORT

logger = get_logger(__name__)

app = FastAPI(
    title="YouTube Q&A Backend",
    description="FastAPI backend for YouTube video analysis and Q&A",
    version="1.0.0",
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure this properly for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(video_info_router, prefix="/video-info", tags=["video-info"])
app.include_router(subtitles_router, prefix="/subs", tags=["subtitles"])
app.include_router(ask_router, prefix="/ask", tags=["ask"])
app.include_router(health_router, prefix="/health", tags=["health"])

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main_fastapi:app", host=BACKEND_HOST, port=BACKEND_PORT, reload=True)
