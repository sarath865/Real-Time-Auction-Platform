from fastapi import FastAPI

from app.core.database import Base, engine

from app.models.user import User
from app.models.auction import Auction

from app.routes.auth import router as auth_router

app = FastAPI(
    title="Real-Time Auction Platform",
    version="1.0.0"
)

# TEMPORARY FOR DEVELOPMENT ONLY
Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

app.include_router(auth_router)


@app.get("/")
def home():
    return {
        "message": "Real-Time Auction Platform API Running"
    }