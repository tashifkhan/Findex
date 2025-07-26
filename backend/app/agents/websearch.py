from langchain_core.tools import tool
from app.routes.crawller import generate_crawler_answer


@tool
async def websearch_agent(query: str) -> str:
    """
    Web Search Tool for getting response using search query, it would return the answer from the web search only, if data is not available it would return a message saying that data is not available.

    Args:
        query (str): The search query to ask about.

    Returns:
        str: The answer to the question based on the web search results.
    """

    res = await generate_crawler_answer(
        question=query,
        chat_history=[],
    )

    return res
