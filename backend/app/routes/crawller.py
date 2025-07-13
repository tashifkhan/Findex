from fastapi import APIRouter, HTTPException
from app.core import get_logger
from app.prompts.crawller import text_chain, get_answer, get_chain
from app.webcrawler.search_agent import web_search_pipeline
from pydantic import BaseModel
from app.models.requests.crawller import CrawlerRequest
import json

router = APIRouter()
logger = get_logger(__name__)
chain = get_chain()

# Remove test code and variables


async def generate_crawler_answer(question: str, chat_history: list) -> str:
    try:
        crawled_web_data = web_search_pipeline(question)
        # Format chat_history as a string for get_answer
        chat_history_str = json.dumps(chat_history)
        response = get_answer(
            chain,
            f"what was previously discussed+ {chat_history_str}",
            crawled_web_data,
        )

        if isinstance(response, str):
            return response

        return response.content

    except Exception as e:
        logger.error(f"Error generating crawler answer: {e}")
        return f"I apologize, but I encountered an error processing your question. Please try again."


@router.post("/", response_model=dict)
async def crawller(request: CrawlerRequest):
    try:
        question = request.question
        chat_history = request.chat_history or "[]"
        # Ensure chat_history is a list
        if isinstance(chat_history, str):
            try:
                chat_history = json.loads(chat_history)
            except Exception:
                chat_history = []
        if not question:
            raise HTTPException(
                status_code=400,
                detail="question is required",
            )
        answer = await generate_crawler_answer(question, chat_history)
        return {
            "answer": answer,
        }

    except HTTPException:
        raise

    except Exception as e:
        logger.error(f"Error processing crawler request: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error \n{str(e)}",
        )
