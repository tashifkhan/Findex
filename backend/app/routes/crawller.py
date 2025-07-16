from fastapi import APIRouter, HTTPException
from app.core import get_logger
from app.prompts.crawller import text_chain, get_answer, get_chain
from app.webcrawler.search_agent import web_search_pipeline
from pydantic import BaseModel
from app.models.requests.crawller import CrawlerRequest

router = APIRouter()
logger = get_logger(__name__)
chain = get_chain()


async def generate_crawler_answer(
    question: str,
    chat_history: list,
) -> str:

    try:
        og_question = (
            question
            if not chat_history
            else f"{chat_history[0]['content'] if chat_history[0]['role'] == 'user' else question}"
        )
        crawled_web_data = web_search_pipeline(og_question)
        print(f"Crawled web data: {crawled_web_data}")
        print(f"Number of results: {len(crawled_web_data) if crawled_web_data else 0}")

        if not crawled_web_data:
            return "I couldn't find any relevant information from web search results."

        # preserves source URLs
        structured_content = []
        for item in crawled_web_data:
            url = item.get("url", "Unknown URL")
            content = item.get("md_body_content", "")
            if content.strip():
                structured_content.append({"url": url, "content": content})

        if not structured_content:
            return "I couldn't find any relevant information from web search results."

        formatted_content = ""
        for i, item in enumerate(structured_content, 1):
            formatted_content += f"=== SOURCE {i}: {item['url']} ===\n"
            formatted_content += f"URL: {item['url']}\n"
            formatted_content += f"CONTENT:\n{item['content']}\n\n"

        print(f"Number of sources with content: {len(structured_content)}")
        print(f"Formatted content preview: {formatted_content[:800]}...")

        chat_history_str = ""
        if chat_history:
            for entry in chat_history:
                if isinstance(entry, dict):
                    role = entry.get("role", "")
                    content = entry.get("content", "")
                    chat_history_str += f"{role}: {content}\n"

                else:
                    chat_history_str += f"{entry}\n"

        response = get_answer(
            chain,
            question,
            formatted_content,
            chat_history_str,
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
        chat_history = request.chat_history or []

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
