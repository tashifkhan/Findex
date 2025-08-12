from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.video_info import router as video_info_router
from app.routes.subtitles import router as subtitles_router
from app.routes.ask import router as ask_router
from app.routes.health import router as health_router
from app.routes.website import router as website_router
from app.routes.crawller import router as crawller_router
from app.routes.git_crawl import router as git_crawl_router
from app.routes.react_ask import router as agent_router
from app.core import get_logger, BACKEND_HOST, BACKEND_PORT

logger = get_logger(__name__)

backend = FastAPI(
    title="Findex Backend",
    description="FastAPI backend for Findex Q&A AIIIIIIIIII",
    version="1.0.0",
)

#  cors
backend.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://findex.tashif.codes",
        "https://tashif.codes",
        "https://*.tashif.codes",
        "https://*.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#  routes
backend.include_router(
    video_info_router,
    prefix="/video-info",
    tags=["video-info"],
)
backend.include_router(
    subtitles_router,
    prefix="/subs",
    tags=["subtitles"],
)
backend.include_router(
    ask_router,
    prefix="/ask",
    tags=["ask"],
)
backend.include_router(
    health_router,
    prefix="/health",
    tags=["health"],
)
backend.include_router(
    website_router,
    prefix="/website",
    tags=["website"],
)
backend.include_router(
    crawller_router,
    prefix="/crawller",
    tags=["crawller"],
)
backend.include_router(
    git_crawl_router,
    prefix="/git-crawl",
    tags=["git-crawl"],
)
backend.include_router(
    agent_router,
    prefix="/agent",
    tags=["agent"],
)


def mainfn():
    """Entry point for the findex-backend command."""
    import uvicorn

    uvicorn.run(
        backend,
        host=BACKEND_HOST,
        port=BACKEND_PORT,
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host=BACKEND_HOST,
        port=BACKEND_PORT,
        reload=True,
    )
