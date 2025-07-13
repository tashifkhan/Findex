
from fastapi import APIRouter, HTTPException
from app.core import get_logger
from app.models import YTVideoInfo
from app.prompts.youtube import youtube_chain
from app.models.requests.ask import AskRequest

router = APIRouter()
logger = get_logger(__name__)

result=youtube_chain.invoke({"question": "What is this video discussing", "url": 'https://www.youtube.com/watch?v=sBm_s2f6V9s'})

print(result)

# async def generate_answer(
#     video_info: YTVideoInfo,
#     question: str,
#     chat_history: str = "",
# ) -> str:
#     """Generate answer using video information and YouTube chat prompt"""
#     try:
#         response = youtube_chain.invoke(
#             {
#                 "chat_history": chat_history,
#                 "title": video_info.title or "Unknown",
#                 "description": video_info.description or "No description available",
#                 "uploader": video_info.uploader or "Unknown",
#                 "tags": ", ".join(video_info.tags) if video_info.tags else "None",
#                 "categories": (
#                     ", ".join(video_info.categories)
#                     if video_info.categories
#                     else "None"
#                 ),
#                 "transcript": video_info.transcript or "No transcript available",
#                 "user_question": question,
#             }
#         )

#         if isinstance(response, str):
#             return response

#         return response.content

#     except Exception as e:
#         logger.error(f"Error generating answer with LLM: {e}")
#         return f"I apologize, but I encountered an error processing your question about '{video_info.title}'. Please try again."


# # route
# @router.post("/", response_model=dict)
# async def ask(request: AskRequest):
#     try:
#         url = request.url
#         question = request.question

#         if not url or not question:
#             raise HTTPException(
#                 status_code=400,
#                 detail="url and question are required",
#             )

#         logger.info(f"Processing question: '{question}' for URL: {url}")

#         video_id = extract_video_id(url)
#         if not video_id:
#             raise HTTPException(status_code=400, detail="Invalid YouTube URL")

#         # info using yt-dlp
#         video_info_obj = get_video_info(url)
#         if not video_info_obj:
#             raise HTTPException(
#                 status_code=500,
#                 detail="Could not fetch video information",
#             )

#         # answer
#         answer = await generate_answer(video_info_obj, question)

#         return {
#             "answer": answer,
#             "video_title": video_info_obj.title,
#             "video_channel": video_info_obj.uploader,
#         }

#     except HTTPException:
#         raise

#     except Exception as e:
#         logger.error(f"Error processing request: {e}")
#         raise HTTPException(
#             status_code=500,
#             detail=f"Internal server error \n{str(e)}",
#         )
