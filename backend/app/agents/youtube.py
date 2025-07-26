from langchain_community.tools import tool
from pydantic import HttpUrl
from app.routes.ask import generate_answer as get_youtube_answer


@tool
async def youtube_agent(url: HttpUrl, question: str) -> str:
    """
    YouTube Tool for getting response using youtube link and stuff, like provide the url of the youtube video you need information for and the relevant question, it would return the answer from the video only, if data is not available it would return a message saying that data is not available.

    Args:
        url (HttpUrl): The URL of the YouTube video.
        question (str): The question to ask about the video.

    Returns:
        str: The answer to the question based on the video content.
    """

    res = await get_youtube_answer(
        url=str(url),
        question=question,
        chat_history="",
    )

    return res
