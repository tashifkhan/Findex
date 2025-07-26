from app.main import mainfn as server
import asyncio
from app.agents.agent import GraphBuilder

async def main():
    graph = GraphBuilder()()
    
    messages = {
        "messages": ["hello"]
    }

    output = await graph.ainvoke(messages)

    if isinstance(output, dict) and "messages" in output:
        final_output = output["messages"][-1].content  
    else:
        final_output = str(output)

    print(final_output)

if __name__ == "__main__":
    asyncio.run(main())

