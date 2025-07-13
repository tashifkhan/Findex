from fastapi import APIRouter, HTTPException
from app.core import get_logger
from app.prompts.website import website_chain
from app.models.requests import WebsiteRequest
from app.website_context import markdown_fetcher
from app.prompts.website import text_chain, get_answer, get_chain
router = APIRouter()
logger = get_logger(__name__)

page_info = """A black hole is a region in space where the gravitational pull is so intense that nothing can escape it, not even light.
They are formed when massive stars collapse at the end of their life cycles.
The boundary surrounding a black hole is known as the event horizon.
Once something crosses the event horizon, it cannot escape the gravitational grip of the black hole.
At the center lies the singularity, a point of infinite density where space and time cease to exist as we know them.
Black holes can vary in size from small stellar-mass ones to gigantic supermassive black holes found at galactic centers.
The black hole at the center of our Milky Way galaxy is called Sagittarius A*.
Black holes do not actively suck in material; instead, they influence objects that come too close.
They can be detected by their interaction with nearby matter and the bending of light around them.
Accretion disks form when matter spirals into a black hole, heating up and emitting X-rays.
Black holes can spin, and their spin affects how they interact with matter and nearby space-time.
Time slows down near a black hole due to a phenomenon known as gravitational time dilation.
Stephen Hawking proposed that black holes emit radiation due to quantum effects, now called Hawking radiation.
This radiation implies that black holes can slowly lose mass and eventually evaporate.
Black holes play a crucial role in shaping galaxies and regulating star formation.
They can merge with other black holes, producing gravitational waves detectable on Earth.
In 2015, gravitational waves were first detected from a black hole merger by LIGO.
These waves are ripples in space-time, predicted by Einstein’s theory of general relativity.
In 2019, the Event Horizon Telescope captured the first image of a black hole’s shadow.
This image provided visual confirmation of black holes’ existence.
Black holes can also form from neutron star collisions under specific conditions.
Intermediate-mass black holes are believed to exist but are harder to detect.
Supermassive black holes might have formed from direct collapse or mergers of smaller black holes.
The study of black holes provides insight into gravity, quantum physics, and the fabric of space-time.
They challenge our understanding of the laws of physics at extreme conditions.
Some theories suggest black holes could connect to other universes via wormholes.
"""

chain= get_chain()
result= get_answer(chain, "What is blackhole", page_info)

# async def generate_website_answer(url: str, question: str) -> str:
#     try:
#         markdown_page_info = markdown_fetcher(url)
#         response = website_chain.invoke(
#             {
#                 "markdown_page_info": markdown_page_info,
#                 "user_question": question,
#             }
#         )
#         if isinstance(response, str):
#             return response

#         return response.content

#     except Exception as e:
#         logger.error(f"Error generating website answer: {e}")
#         return f"I apologize, but I encountered an error processing your question. Please try again."


# @router.post("/", response_model=dict)
# async def website(request: WebsiteRequest):
#     try:
#         url = request.url
#         question = request.question

#         if not url or not question:
#             raise HTTPException(
#                 status_code=400,
#                 detail="url and question are required",
#             )

#         answer = await generate_website_answer(
#             url,
#             question,
#         )
#         return {
#             "answer": answer,
#         }

#     except HTTPException:
#         raise

#     except Exception as e:
#         logger.error(f"Error processing website request: {e}")
#         raise HTTPException(
#             status_code=500,
#             detail=f"Internal server error \n{str(e)}",
#         )
