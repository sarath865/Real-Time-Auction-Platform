from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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

# Create database tables
Base.metadata.create_all(bind=engine)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(auth_router)
app.include_router(auction_router)
app.include_router(bid_router)


@app.get("/")
def home():
    return {
        "message": "API Running"
    }