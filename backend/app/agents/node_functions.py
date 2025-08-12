from typing import Annotated, Sequence
from typing_extensions import TypedDict
from typing import Annotated, Sequence
from langchain_core.messages import BaseMessage, SystemMessage
from langgraph.graph.message import add_messages
from app.agents.github import github_agent
from app.agents.websearch import websearch_agent
from app.agents.webite import website_agent
from app.agents.youtube import youtube_agent
from app.core.llm import LargeLanguageModel

llm_model = LargeLanguageModel().client

tools = [
    github_agent,
    websearch_agent,
    website_agent,
    youtube_agent,
]


class AgentState(TypedDict):
    messages: Annotated[Sequence[BaseMessage], add_messages]


def agent(state):
    """
    Invokes the agent model to generate a response based on the current state. Given the question,
    it will decide to retrieve using the retriever tool or simply end.

    Args:
        state(messages): the current state

    Returns:
        dict: the updated state with the agent response appended to messages
    """

    print("---Call Agent---")
    messages = state["messages"]

    print(f"Agent received {len(messages)} messages:")

    for i, msg in enumerate(messages):
        print(f"  {i}: {type(msg).__name__} - {msg.content[:100]}...")

    # Add system message if not present to ensure context awareness
    if not messages or not isinstance(messages[0], SystemMessage):
        system_message = SystemMessage(
            content=(
                "You are a helpful AI assistant that maintains conversation context and remembers information shared by users throughout the conversation. \n\n"
                "Key instructions:\n"
                "- Remember names, preferences, and details shared by users in previous messages\n"
                "- Reference previous conversation when relevant\n"
                "- Maintain continuity across the conversation\n"
                "- If a user asks about something they mentioned earlier, refer back to that information\n"
                "- Be conversational and context-aware\n\n"
                "You have access to several tools for different tasks:\n"
                "- github_agent: For GitHub repository questions\n"
                "- websearch_agent: For web search queries\n"
                "- website_agent: For website-specific questions\n"
                "- youtube_agent: For YouTube video questions\n\n"
                "Use these tools when appropriate, but for general conversation and remembering context, respond directly."
            )
        )

        messages = [system_message] + list(messages)

    model = llm_model
    model = model.bind_tools(tools)
    response = model.invoke(messages)

    print(f"Agent response: {response.content[:100]}...")
    return {"messages": [response]}
