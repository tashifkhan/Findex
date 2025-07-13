from pydantic import BaseModel
from typing import Optional, List, Dict


class WebsiteRequest(BaseModel):
    url: str
    question: str
    chat_history: Optional[List[Dict]] = []
