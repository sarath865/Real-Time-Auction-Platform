from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Text,
    DateTime,
    ForeignKey
)

from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.core.database import Base


class Auction(Base):
    __tablename__ = "auctions"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(200), nullable=False)

    description = Column(Text)

    starting_price = Column(Float, nullable=False)

    current_price = Column(Float, nullable=False)

    category = Column(String(100))

    start_time = Column(DateTime)

    end_time = Column(DateTime)

    status = Column(String(30), default="ACTIVE")

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    owner = relationship(
        "User",
        back_populates="auctions"
    )
    
    bids = relationship(
    "Bid",
    back_populates="auction",
    cascade="all, delete-orphan"
)