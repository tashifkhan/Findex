from fastapi import APIRouter, HTTPException
from app.core import get_logger
from app.agents.agent import GraphBuilder, AgentState
from app.models.response.crawller import CrawllerResponse
from app.models.requests.crawller import CrawlerRequest
from langchain_core.messages import HumanMessage, AIMessage
from typing import cast


router = APIRouter()
logger = get_logger(__name__)


async def generate_answer(
    question: str,
    chat_history: list,
) -> str:
    try:
        graph = GraphBuilder()()

        # Build messages list with chat history
        messages_list = []

        # Add chat history to messages
        if chat_history:
            for entry in chat_history:
                if isinstance(entry, dict):
                    role = entry.get("role", "")
                    content = entry.get("content", "")

                    if role == "user":
                        messages_list.append(HumanMessage(content=content))

                    elif role in ["assistant", "bot", "ai"]:
                        messages_list.append(AIMessage(content=content))

        # Add current question
        messages_list.append(HumanMessage(content=question))

        # Create state with proper message history and cast to AgentState
        state = cast(AgentState, {"messages": messages_list})

        logger.info(
            f"Invoking React agent with {len(messages_list)} messages in history"
        )

        # Debug: Log the actual messages being passed
        for i, msg in enumerate(messages_list):
            logger.info(f"Message {i}: {type(msg).__name__} - {msg.content[:100]}...")

        output = await graph.ainvoke(state)

        if isinstance(output, dict) and "messages" in output:
            final_output = output["messages"][-1].content
        else:
            final_output = str(output)

        logger.info(f"React agent response: {final_output}")
        return final_output

    except Exception as e:
        logger.error(f"Error generating react agent answer: {e}")
        return f"I apologize, but I encountered an error processing your question. Please try again."


@router.post("/", response_model=CrawllerResponse)
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
