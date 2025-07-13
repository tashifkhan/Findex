from pydantic import BaseModel
from typing import Optional, List, Dict


class CrawlerRequest(BaseModel):
    crawled_web_data: str
    question: str
    chat_history: Optional[List[Dict]] = []
