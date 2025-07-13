from fastapi import APIRouter, HTTPException
from app.core import get_logger
from app.prompts.website import text_chain, get_answer, get_chain
from app.models.requests import WebsiteRequest
from app.website_context import markdown_fetcher
import json

router = APIRouter()
logger = get_logger(__name__)

chain = get_chain()


async def generate_website_answer(url: str, question: str, chat_history: list) -> str:
    try:
        markdown_page_info = markdown_fetcher(url)
        chat_history_str = json.dumps(chat_history)
        response = get_answer(
            chain,
            f"what was previously discussed+ {chat_history_str}",
            markdown_page_info,
        )
        if isinstance(response, str):
            return response
        return response.content
    except Exception as e:
        logger.error(f"Error generating website answer: {e}")
        return f"I apologize, but I encountered an error processing your question. Please try again."


@router.post("/", response_model=dict)
async def website(request: WebsiteRequest):
    try:
        url = request.url
        question = request.question
        chat_history = request.chat_history or "[]"
        # Ensure chat_history is a list
        if isinstance(chat_history, str):
            try:
                chat_history = json.loads(chat_history)
            except Exception:
                chat_history = []
        if not url or not question:
            raise HTTPException(
                status_code=400,
                detail="url and question are required",
            )
        answer = await generate_website_answer(url, question, chat_history)
        return {
            "answer": answer,
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing website request: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error \n{str(e)}",
        )
