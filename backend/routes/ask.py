from fastapi import APIRouter, HTTPException, status
from models.requests import AskRequest
from models.response import AskResponse
from config import get_logger
from youtube_utils import extract_video_id, get_video_info

router = APIRouter()
logger = get_logger(__name__)


def generate_answer(video_info, question: str) -> str:
    """Generate answer using video information"""
    desc_for_context = (
        video_info.description if video_info.description else "No description available"
    )[:500]
    tags_for_context = ", ".join(video_info.tags[:10]) if video_info.tags else "None"
    categories_for_context = (
        ", ".join(video_info.categories) if video_info.categories else "None"
    )

    context = (
        f"Title: {video_info.title}\n"
        f"Channel: {video_info.uploader}\n"
        f"Description: {desc_for_context}...\n"
        f"Duration: {video_info.duration} seconds\n"
        f"Tags: {tags_for_context}\n"
        f"Categories: {categories_for_context}\n"
        f"Transcript: {video_info.transcript[:200] if video_info.transcript else 'Not available'}...\n"
    )

    display_upload_date = (
        video_info.upload_date if video_info.upload_date else "Unknown"
    )

    answer_detail = (
        f"The transcript is available with {len(video_info.transcript)} characters."
        if video_info.transcript
        else "No transcript is available for this video."
    )

    return (
        f'I can help you with questions about this video: "{video_info.title}" by {video_info.uploader}.\n'
        f"{answer_detail}\n"
        f"Some information I can provide:\n"
        f"  - Video duration: {video_info.duration // 60} minutes\n"
        f"  - Views: {video_info.view_count:,}\n"
        f"  - Upload date: {display_upload_date}\n"
        f"\n"
        f"For more specific answers, try asking about the video's title, channel, duration, views, or topic.\n"
        f"Context used:\n"
        f"{context}\n"
    )


@router.post("/", response_model=AskResponse)
def ask_handler(request: AskRequest):
    url = request.url
    question = request.question

    logger.info(f"Processing question: '{question}' for URL: {url}")

    try:
        video_id = extract_video_id(url)
        if not video_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid YouTube URL"
            )

        video_info_obj = get_video_info(url)
        if not video_info_obj:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Could not fetch video information",
            )

        answer = generate_answer(video_info_obj, question)

        return AskResponse(
            answer=answer,
            video_title=video_info_obj.title,
            video_channel=video_info_obj.uploader,
        )

    except HTTPException:
        raise

    except Exception as e:
        logger.error(f"Error processing request: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error",
        )
