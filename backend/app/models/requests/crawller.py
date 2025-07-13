from pydantic import BaseModel

class CrawlerRequest(BaseModel):
    crawled_web_data: str
    question: str 