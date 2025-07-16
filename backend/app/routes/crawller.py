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


async def generate_crawler_answer(
    question: str,
    chat_history: list,
) -> str:

    try:
        crawled_web_data = web_search_pipeline(question)
        print(f"Crawled web data: {crawled_web_data}")
        print(f"Number of results: {len(crawled_web_data) if crawled_web_data else 0}")

        if not crawled_web_data:
            return "I couldn't find any relevant information from web search results."

        # Create a structured format that preserves source URLs
        structured_content = []
        for item in crawled_web_data:
            url = item.get("url", "Unknown URL")
            content = item.get("md_body_content", "")
            if content.strip():  # Only include non-empty content
                structured_content.append({"url": url, "content": content})

        if not structured_content:
            return "I couldn't find any relevant information from web search results."

        # Format the content in a way that preserves source information
        formatted_content = ""
        for i, item in enumerate(structured_content, 1):
            formatted_content += f"=== SOURCE {i}: {item['url']} ===\n"
            formatted_content += f"URL: {item['url']}\n"
            formatted_content += f"CONTENT:\n{item['content']}\n\n"

        print(f"Number of sources with content: {len(structured_content)}")
        print(f"Formatted content preview: {formatted_content[:800]}...")

        if chat_history:
            chat_history_str = json.dumps(chat_history)
            full_question = f"Previous conversation context:\n{chat_history_str}\n\nCurrent question: {question}"

        else:
            full_question = question

        response = get_answer(
            chain,
            full_question,
            formatted_content,
        )

        print(f"LLM response type: {type(response)}")
        print(f"LLM response: {response}")

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
