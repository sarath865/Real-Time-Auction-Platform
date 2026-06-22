from datetime import datetime
from pydantic import BaseModel


class AuctionCreate(BaseModel):
    title: str
    description: str
    starting_price: float
    category: str
    start_time: datetime
    end_time: datetime


class AuctionUpdate(BaseModel):
    title: str
    description: str
    starting_price: float
    category: str
    start_time: datetime
    end_time: datetime
    status: str


class AuctionResponse(BaseModel):
    id: int
    title: str
    description: str
    starting_price: float
    current_price: float
    category: str
    status: str

    class Config:
        from_attributes = True