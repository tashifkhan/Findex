from fastapi import APIRouter, HTTPException, status
from app.models.requests import SubtitlesRequest
from app.models.response import SubtitlesResponse
from app.core import get_logger
from app.youtube_utils import get_subtitle_content
from app.youtube_utils.transcript_generator import processed_transcript

router = APIRouter()
logger = get_logger(__name__)


@router.post("/", response_model=SubtitlesResponse)
async def get_subtitles_handler(request: SubtitlesRequest):
    url = request.url
    lang = request.lang or "en"

    logger.info(f"Received /subs request for URL: {url}, lang: {lang}")

    try:
        subtitle_text_raw = get_subtitle_content(url, lang)

        if not subtitle_text_raw:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Failed to retrieve subtitles or subtitles are empty.",
            )

        # check for error messages from get_subtitle_content
        known_error_messages = [
            "Video unavailable.",
            "Subtitles not available for the specified language.",
            "Subtitles were requested but could not be retrieved from file.",
            "Subtitles not available for the specified language or download failed.",
        ]

        known_error_prefixes = [
            "Error downloading subtitles:",
            "An unexpected error occurred while fetching subtitles:",
        ]

        is_actual_error = False

        if subtitle_text_raw in known_error_messages:
            is_actual_error = True
            return SubtitlesResponse(subtitles=subtitle_text_raw)

        for prefix in known_error_prefixes:
            if subtitle_text_raw.startswith(prefix):
                is_actual_error = True
                break

        if is_actual_error:
            status_code = status.HTTP_500_INTERNAL_SERVER_ERROR

            if (
                "unavailable" in subtitle_text_raw.lower()
                or "not found" in subtitle_text_raw.lower()
                or "not available" in subtitle_text_raw.lower()
            ):
                status_code = status.HTTP_404_NOT_FOUND

            raise HTTPException(status_code=status_code, detail=subtitle_text_raw)

        cleaned_subtitle_text = processed_transcript(subtitle_text_raw)

        if not cleaned_subtitle_text:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Subtitles became empty after cleaning. Original may have only contained timestamps/metadata.",
            )

        return SubtitlesResponse(
            subtitles=cleaned_subtitle_text,
        )

    except HTTPException:
        raise

    except Exception as e:
        logger.error(f"Error in /subs route: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal server error in /subs route: {str(e)}",
        )
