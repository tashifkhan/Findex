from pydantic import BaseModel

class WebsiteRequest(BaseModel):
    url: str
    question: str 