"""
initalizing the requests pydantic models
"""

from .video_info import VideoInfoRequest
from .subtitles import SubtitlesRequest
from .ask import AskRequest

__all__ = [
    "VideoInfoRequest",
    "SubtitlesRequest",
    "AskRequest",
]
