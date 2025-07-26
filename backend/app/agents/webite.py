from langchain_core.tools import tool
from pydantic import HttpUrl
from app.routes.website import generate_website_answer


@tool
async def website_agent(url: HttpUrl, question: str) -> str:
    """
    Website Tool for getting response using website link and stuff, like provide the url of the website you need information for and the relevant question, it would return the answer from the website only, if data is not available it would return a message saying that data is not available.

    Args:
        url (HttpUrl): The URL of the website.
        question (str): The question to ask about the website.

    Returns:
        str: The answer to the question based on the website content.
    """

    res = await generate_website_answer(
        url=str(url),
        question=question,
        chat_history=[],
    )

    return res
