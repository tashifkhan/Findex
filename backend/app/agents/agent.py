from app.agents.github import github_agent
from app.agents.websearch import websearch_agent
from app.agents.webite import website_agent
from app.agents.youtube import youtube_agent
from app.prompts.react import prompt

from langgraph.prebuilt import create_react_agent


tools = [
    github_agent,
    websearch_agent,
    website_agent,
    youtube_agent,
]


from app.core.llm import LargeLanguageModel

llm = LargeLanguageModel()
agent = create_react_agent(
    llm.client,
    tools,
    prompt=prompt,
)
