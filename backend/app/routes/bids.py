from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_user

from app.models.bid import Bid
from app.models.auction import Auction
from app.models.user import User

from app.schemas.bid import BidCreate, BidResponse

router = APIRouter(
    prefix="/bids",
    tags=["Bids"]
)


@router.post("", response_model=BidResponse)
def place_bid(
    bid: BidCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    auction = db.query(Auction).filter(
        Auction.id == bid.auction_id
    ).first()

    if not auction:
        raise HTTPException(
            status_code=404,
            detail="Auction not found"
        )

    if auction.status != "ACTIVE":
        raise HTTPException(
            status_code=400,
            detail="Auction is not active"
        )

    if bid.bid_amount <= auction.current_price:
        raise HTTPException(
            status_code=400,
            detail="Bid must be greater than current price"
        )

    new_bid = Bid(
        bid_amount=bid.bid_amount,
        user_id=current_user.id,
        auction_id=auction.id
    )

    auction.current_price = bid.bid_amount

    db.add(new_bid)
    db.commit()
    db.refresh(new_bid)

    return new_bid


@router.get("/{auction_id}", response_model=list[BidResponse])
def get_bid_history(
    auction_id: int,
    db: Session = Depends(get_db)
):

    bids = (
        db.query(Bid)
        .filter(Bid.auction_id == auction_id)
        .order_by(Bid.bid_amount.desc())
        .all()
    )

    return bids