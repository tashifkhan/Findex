from fastapi import APIRouter, HTTPException
from app.core import get_logger
from app.prompts.crawller import crawler_chain
from app.webcrawler.search_agent import web_search_pipeline
from pydantic import BaseModel

router = APIRouter()
logger = get_logger(__name__)


class CrawlerRequest(BaseModel):
    question: str


async def generate_crawler_answer(question: str) -> str:
    try:
        crawled_web_data = web_search_pipeline(question)
        response = crawler_chain.invoke(
            {
                "crawled_web_data": str(crawled_web_data),
                "user_question": question,
            }
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

        if not question:
            raise HTTPException(
                status_code=400,
                detail="question is required",
            )

        answer = await generate_crawler_answer(question)
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
