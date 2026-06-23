from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_user

from app.models.auction import Auction
from app.models.user import User

from app.schemas.auction import (
    AuctionCreate,
    AuctionUpdate,
    AuctionResponse
)

router = APIRouter(
    prefix="/auctions",
    tags=["Auctions"]
)


@router.post("", response_model=AuctionResponse)
def create_auction(
    auction: AuctionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    new_auction = Auction(
        title=auction.title,
        description=auction.description,
        starting_price=auction.starting_price,
        current_price=auction.starting_price,
        category=auction.category,
        start_time=auction.start_time,
        end_time=auction.end_time,
        owner_id=current_user.id
    )

    db.add(new_auction)
    db.commit()
    db.refresh(new_auction)

    return new_auction


@router.get("", response_model=list[AuctionResponse])
def get_auctions(
    db: Session = Depends(get_db)
):
    return db.query(Auction).all()


@router.get("/{auction_id}", response_model=AuctionResponse)
def get_auction(
    auction_id: int,
    db: Session = Depends(get_db)
):

    auction = db.query(Auction).filter(
        Auction.id == auction_id
    ).first()

    if not auction:
        raise HTTPException(
            status_code=404,
            detail="Auction not found"
        )

    return auction


@router.put("/{auction_id}", response_model=AuctionResponse)
def update_auction(
    auction_id: int,
    auction_data: AuctionUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    auction = db.query(Auction).filter(
        Auction.id == auction_id
    ).first()

    if not auction:
        raise HTTPException(
            status_code=404,
            detail="Auction not found"
        )

    if auction.owner_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Not authorized"
        )

    auction.title = auction_data.title
    auction.description = auction_data.description
    auction.starting_price = auction_data.starting_price
    auction.category = auction_data.category
    auction.start_time = auction_data.start_time
    auction.end_time = auction_data.end_time
    auction.status = auction_data.status

    db.commit()
    db.refresh(auction)

    return auction


@router.delete("/{auction_id}")
def delete_auction(
    auction_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    auction = db.query(Auction).filter(
        Auction.id == auction_id
    ).first()

    if not auction:
        raise HTTPException(
            status_code=404,
            detail="Auction not found"
        )

    if auction.owner_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Not authorized"
        )

    db.delete(auction)
    db.commit()

    return {
        "message": "Auction deleted successfully"
    }