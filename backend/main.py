from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.video_info import router as video_info_router
from routes.subtitles import router as subtitles_router
from routes.ask import router as ask_router
from routes.health import router as health_router
from core import get_logger, BACKEND_HOST, BACKEND_PORT

logger = get_logger(__name__)

app = FastAPI(
    title="Findex Backend",
    description="FastAPI backend for Findex Q&A AIIIIIIIIII",
    version="1.0.0",
)

#  cors
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#  routes
app.include_router(
    video_info_router,
    prefix="/video-info",
    tags=["video-info"],
)
app.include_router(
    subtitles_router,
    prefix="/subs",
    tags=["subtitles"],
)
app.include_router(
    ask_router,
    prefix="/ask",
    tags=["ask"],
)
app.include_router(
    health_router,
    prefix="/health",
    tags=["health"],
)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host=BACKEND_HOST,
        port=BACKEND_PORT,
        reload=True,
    )
