from typing import Annotated, Sequence
from typing_extensions import TypedDict
from typing import Annotated,  Sequence
from langchain_core.messages import BaseMessage
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
    messages=state['messages']
    model= llm_model
    model=model.bind_tools(tools)
    response= model.invoke(messages)
    return {"messages":[response]}
