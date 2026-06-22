from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
)

from app.models.user import User
from app.schemas.user import UserRegister, UserLogin, Token

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register")
def register(user: UserRegister, db: Session = Depends(get_db)):

    existing_email = db.query(User).filter(User.email == user.email).first()

    if existing_email:
        raise HTTPException(status_code=400, detail="Email already exists")

    new_user = User(
        username=user.username,
        email=user.email,
        password=hash_password(user.password),
        role="user"
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully"
    }


@router.post("/login", response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(User.email == user.email).first()

    if not existing_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not verify_password(
        user.password,
        existing_user.password
    ):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(
        {
            "sub": str(existing_user.id),
            "role": existing_user.role
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }