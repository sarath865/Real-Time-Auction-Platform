from sqlalchemy import Column, Integer, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.core.database import Base


class Bid(Base):
    __tablename__ = "bids"

    id = Column(Integer, primary_key=True, index=True)

    bid_amount = Column(Float, nullable=False)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    auction_id = Column(
        Integer,
        ForeignKey("auctions.id"),
        nullable=False
    )

    bidder = relationship(
        "User",
        back_populates="bids"
    )

    auction = relationship(
        "Auction",
        back_populates="bids"
    )