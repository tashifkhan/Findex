from fastapi import APIRouter, HTTPException
from app.core import get_logger
from app.prompts.crawller import text_chain, get_answer, get_chain
from app.webcrawler.search_agent import web_search_pipeline
from pydantic import BaseModel

router = APIRouter()
logger = get_logger(__name__)

text = """
A black hole is a region of space where gravity is so strong that nothing, not even light, can escape from it.
It forms when a massive star collapses under its own gravity at the end of its life cycle.
The boundary around a black hole beyond which nothing can escape is called the event horizon.
Inside the event horizon, all matter and radiation are pulled inward toward a singularity, a point of infinite density.
Black holes are detected indirectly by observing their effects on nearby matter and light.
They can grow by absorbing mass from their surroundings, including gas, dust, and even stars.
There are different types of black holes: stellar, supermassive, and intermediate.
Stellar black holes are formed from collapsing stars and typically have a few times the mass of the Sun.
Supermassive black holes, found at the centers of galaxies, can have millions or billions of solar masses.
The black hole at the center of our Milky Way galaxy is known as Sagittarius A*.
Black holes can emit powerful jets of particles and radiation as matter falls into them.
This process, called accretion, can produce some of the brightest phenomena in the universe.
The theory of general relativity, proposed by Albert Einstein, predicts the existence of black holes.
Time slows down near black holes due to the intense gravitational field, a phenomenon known as time dilation.
Stephen Hawking proposed that black holes can emit radiation due to quantum effects, known as Hawking radiation.
This means black holes could eventually evaporate over time.
Black holes play a key role in the evolution of galaxies by influencing star formation and matter distribution.
Gravitational waves, ripples in space-time, can be generated when black holes merge.
In 2019, scientists captured the first image of a black hole using the Event Horizon Telescope.
Studying black holes helps scientists understand gravity, quantum mechanics, and the nature of space and time.
"""
chain= get_chain()
l = [
    {
        "id": 0,
        "role": "user",
        "message": "what is blackhole",
    },
    {
        "id": 1,
        "role": "bot",
        "message": "A black hole is a region of space where gravity is so strong that nothing, not even light, can escape from it.",
    },

]

print(get_answer(chain, f"what was previously discussed+ {l}", text))

# class CrawlerRequest(BaseModel):
#     question: str


# async def generate_crawler_answer(question: str) -> str:
#     try:
#         crawled_web_data = web_search_pipeline(question)
#         response = crawler_chain.invoke(
#             {
#                 "crawled_web_data": str(crawled_web_data),
#                 "user_question": question,
#             }
#         )

#         if isinstance(response, str):
#             return response

#         return response.content

#     except Exception as e:
#         logger.error(f"Error generating crawler answer: {e}")
#         return f"I apologize, but I encountered an error processing your question. Please try again."


# @router.post("/", response_model=dict)
# async def crawller(request: CrawlerRequest):
#     try:
#         question = request.question

#         if not question:
#             raise HTTPException(
#                 status_code=400,
#                 detail="question is required",
#             )

#         answer = await generate_crawler_answer(question)
#         return {
#             "answer": answer,
#         }

#     except HTTPException:
#         raise

#     except Exception as e:
#         logger.error(f"Error processing crawler request: {e}")
#         raise HTTPException(
#             status_code=500,
#             detail=f"Internal server error \n{str(e)}",
#         )
