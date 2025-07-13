from pydantic import BaseModel
from typing import Optional


class CrawlerRequest(BaseModel):
    crawled_web_data: str
    question: str
    chat_history: Optional[str] = ""
