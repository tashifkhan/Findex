from langchain_community.tools import tool
from app.routes.crawller import generate_crawler_answer


@tool
async def websearch_agent(query: str) -> str:
    """Web Search Tool for getting response using search query, it would return the answer from the web search only, if data is not available it would return a message saying that data is not available."""

    res = await generate_crawler_answer(
        question=query,
        chat_history=[],
    )

    return res
