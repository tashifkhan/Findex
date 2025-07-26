from langchain_community.tools import tool
from pydantic import HttpUrl
from app.routes.git_crawl import generate_github_answer


@tool
async def github_agent(url: HttpUrl, question: str) -> str:
    """
    GitHub Tool for getting response using GitHub repository link and stuff, like provide the url of the GitHub repository you need information for and the relevant question, it would return the answer from the repository only, if data is not available it would return a message saying that data is not available.

    Args:
        url (HttpUrl): The URL of the GitHub repository.
        question (str): The question to ask about the repository.

    Returns:
        str: The answer to the question based on the repository content.
    """

    res = await generate_github_answer(
        url=url,
        question=question,
        chat_history=[],
    )

    return res
