from pydantic import BaseModel


class AskRequest(BaseModel):
    url: str
    question: str
