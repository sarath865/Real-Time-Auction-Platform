class AuctionResponse(BaseModel):
    id: int
    title: str
    description: str
    starting_price: float
    current_price: float
    category: str
    status: str
    owner_id: int

    start_time: datetime
    end_time: datetime

    winner_id: int | None = None
    winning_bid: float | None = None

    class Config:
        from_attributes = True