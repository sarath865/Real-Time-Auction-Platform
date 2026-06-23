from pydantic import BaseModel
from datetime import datetime


class BidCreate(BaseModel):
    auction_id: int
    bid_amount: float


class BidResponse(BaseModel):
    id: int
    bid_amount: float
    user_id: int
    auction_id: int
    created_at: datetime

    class Config:
        from_attributes = True