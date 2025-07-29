from fastapi import APIRouter, HTTPException
from app.core import get_logger
from app.agents.agent import GraphBuilder
from app.models.response.crawller import CrawlerResponse
from app.models.requests.crawller import CrawlerRequest


router = APIRouter()
logger = get_logger(__name__)


async def generate_answer(
    question: str,
    chat_history: list,
) -> str:
    try:
        graph = GraphBuilder()()

        messages = {"messages": [question]}

        output = await graph.ainvoke(messages)

        if isinstance(output, dict) and "messages" in output:
            final_output = output["messages"][-1].content
        else:
            final_output = str(output)

        return final_output

    except Exception as e:
        logger.error(f"Error generating react agent answer: {e}")
        return f"I apologize, but I encountered an error processing your question. Please try again."


@router.post("/", response_model=CrawlerResponse)
async def agent_bhai(request: CrawlerRequest):
    try:
        question = request.question
        chat_history = request.chat_history or []

        if not question:
            raise HTTPException(
                status_code=400,
                detail="question is required",
            )

        answer = await generate_answer(question, chat_history)
        return {
            "answer": answer,
        }

    except HTTPException:
        raise

    except Exception as e:
        logger.error(f"Error processing agent request: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error \n{str(e)}",
        )
