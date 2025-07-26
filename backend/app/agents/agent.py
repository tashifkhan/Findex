from .github import github_agent
from .websearch import websearch_agent
from .webite import website_agent
from .youtube import youtube_agent

from typing import Annotated, Sequence
from typing_extensions import TypedDict
from langchain_core.messages import BaseMessage
from langgraph.graph.message import add_messages
from langgraph.graph import START,END, StateGraph
from .node_functions import agent
from app.core.llm import LargeLanguageModel
from langgraph.prebuilt import ToolNode
from langgraph.prebuilt import tools_condition

tools = [
    github_agent,
    websearch_agent,
    website_agent,
    youtube_agent,
]

llm = LargeLanguageModel()

class AgentState(TypedDict):
    messages: Annotated[Sequence[BaseMessage], add_messages]

class GraphBuilder:

    def buildgraph(self):
        
        workflow = StateGraph(AgentState)
        workflow.add_node("agent", agent)
        workflow.add_node("retrieve", ToolNode(tools))

        workflow.add_edge(START, "agent")

        workflow.add_conditional_edges(
            "agent",
            tools_condition,
            {
                "tools": "retrieve",  
                END: END,             
            }
        )

        workflow.add_edge("retrieve", "agent")  

        graph = workflow.compile()
        return graph
    
    def __call__(self):
        return self.buildgraph()
    

