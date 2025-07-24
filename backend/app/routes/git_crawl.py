from fastapi import APIRouter
from app.core import get_logger
from app.prompts.github import main_chain, prompt_template_str
from app.github_crawler import convert_github_repo_to_markdown
from langchain_core.runnables import RunnableLambda, RunnableParallel
from app.webcrawler.search_agent import web_search_pipeline

router = APIRouter()
logger = get_logger(__name__)


async def generate_github_answer(
    url: str,
    question: str,
    chat_history: list[dict] = [],
):
    """Generate answer using GitHub repository information and prompt"""
    try:

        content_obj = convert_github_repo_to_markdown(request.url)

        response = main_chain.invoke(
            {
                "text": request.text,
                "question": request.question,
            }
        )

        if isinstance(response, str):
            return response

        return response.content

    except Exception as e:
        logger.error(f"Error generating answer with LLM: {e}")
        return f"I apologize, but I encountered an error processing your question about the GitHub repository. Please try again."
