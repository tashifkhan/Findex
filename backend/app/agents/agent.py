from app.agents.github import github_agent
from app.agents.websearch import websearch_agent
from app.agents.webite import website_agent
from app.agents.youtube import youtube_agent

from langgraph.prebuilt import create_react_agent


tools = [
    github_agent,
    websearch_agent,
    website_agent,
    youtube_agent,
]


from app.core.llm import LargeLanguageModel

agent = LargeLanguageModel()
agent_with_tools = (agent.client).bind_tools(tools)
