from fastapi import APIRouter, HTTPException
from app.core import get_logger
from app.prompts.website import website_chain
from app.models.requests import WebsiteRequest
from app.website_context import markdown_fetcher

router = APIRouter()
logger = get_logger(__name__)


async def generate_website_answer(url: str, question: str) -> str:
    try:
        markdown_page_info = markdown_fetcher(url)
        response = website_chain.invoke(
            {
                "markdown_page_info": markdown_page_info,
                "user_question": question,
            }
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

        if not url or not question:
            raise HTTPException(
                status_code=400,
                detail="url and question are required",
            )

        answer = await generate_website_answer(
            url,
            question,
        )
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
