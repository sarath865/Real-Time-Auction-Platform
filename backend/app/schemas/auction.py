from pydantic import BaseModel
from datetime import datetime


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


class AuctionUpdateStatus(BaseModel):
    status: str


class AuctionResponse(BaseModel):
    id: int
    title: str
    description: str
    starting_price: float
    current_price: float
    category: str
    status: str
    owner_id: int

    # Winner Information
    winner_id: int | None = None
    winning_bid: float | None = None

    class Config:
        from_attributes = True