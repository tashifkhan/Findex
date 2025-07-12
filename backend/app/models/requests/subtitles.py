from pydantic import BaseModel
from typing import Optional


class SubtitlesRequest(BaseModel):
    url: str
    lang: Optional[str] = "en"
