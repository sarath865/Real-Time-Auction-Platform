from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.core.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    username = Column(String(100), nullable=False)

    email = Column(String(150), unique=True, nullable=False)

    password = Column(String(255), nullable=False)

    role = Column(String(30), default="user")

    # Auctions created by the user
    auctions = relationship(
        "Auction",
        foreign_keys="Auction.owner_id",
        back_populates="owner"
    )

    # Bids placed by the user
    bids = relationship(
        "Bid",
        back_populates="bidder"
    )

    # Auctions won by the user
    won_auctions = relationship(
        "Auction",
        foreign_keys="Auction.winner_id"
    )
