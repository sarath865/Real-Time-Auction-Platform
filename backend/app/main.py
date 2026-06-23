from fastapi import FastAPI

from app.core.database import Base, engine

from app.models.user import User
from app.models.auction import Auction
from app.models.bid import Bid

from app.routes.auth import router as auth_router
from app.routes.auctions import router as auction_router
from app.routes.bids import router as bid_router


print(Base.metadata.tables.keys())

app = FastAPI(
    title="Real-Time Auction Platform"
)

Base.metadata.create_all(bind=engine)

app.include_router(auth_router)
app.include_router(auction_router)
app.include_router(bid_router)


@app.get("/")
def home():
    return {"message": "API Running"}