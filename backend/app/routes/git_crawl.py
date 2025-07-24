from fastapi import APIRouter, HTTPException
from pydantic import HttpUrl
from app.core import get_logger
from app.prompts.github import main_chain, prompt_template_str
from app.github_crawler import convert_github_repo_to_markdown
from app.webcrawler.search_agent import web_search_pipeline

router = APIRouter()
logger = get_logger(__name__)


async def generate_github_answer(
    url: HttpUrl,
    question: str,
    chat_history: list[dict] = [],
) -> str:
    """Generate answer using GitHub repository information and prompt"""
    try:

        content_obj = await convert_github_repo_to_markdown(url)

        response = main_chain.invoke(
            {
                "summary": content_obj.summary,
                "tree": content_obj.tree,
                "text": content_obj.content,  
                "question": question,
                "chat_history": chat_history if chat_history else "",
            }
        )

        if isinstance(response, str):
            return response

        return response.content

    except Exception as e:
        logger.error(f"Error generating answer with LLM: {e}")
        return f"I apologize, but I encountered an error processing your question about the GitHub repository. Please try again."


@router.post("/", response_model=dict)
async def github_crawler(request: dict):
    try:
        question = request.get("question")
        chat_history = request.get("chat_history", [])

        if not question:
            raise HTTPException(
                status_code=400,
                detail="question is required",
            )

        url = request.get("url")
        if not url:
            raise HTTPException(
                status_code=400,
                detail="url is required",
            )

        response = await generate_github_answer(
            url=HttpUrl(url),
            question=question,
            chat_history=chat_history,
        )

        return {"content": response}

    except Exception as e:
        logger.error(f"Error in GitHub crawler: {e}")
        raise HTTPException(status_code=500, detail=str(e))
