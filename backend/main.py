from pprint import pprint
from app.main import mainfn as server
from app.agents import agent_with_tools

if __name__ == "__main__":
    # server()
    pprint(agent_with_tools.invoke("What is the capital of France?"))
