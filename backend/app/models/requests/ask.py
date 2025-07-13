from pydantic import BaseModel
from typing import Optional


class AskRequest(BaseModel):
    url: str
    question: str
    chat_history: Optional[str] = ""
