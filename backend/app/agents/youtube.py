from langchain_community.tools import tool
from pydantic import HttpUrl
from app.routes.ask import generate_answer as get_youtube_answer


@tool
async def youtube_agent(url: HttpUrl, question: str) -> str:
    """YouTube Agent for getting response using youtube link and stuff."""

    res = await get_youtube_answer(
        url=str(url),
        question=question,
        chat_history="",
    )

    return res
