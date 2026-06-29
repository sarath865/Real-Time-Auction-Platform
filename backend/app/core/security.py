from datetime import datetime, timedelta

from jose import JWTError, jwt
from passlib.context import CryptContext

from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer

from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.database import get_db

from app.models.user import User


pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login"
)


def hash_password(password: str):
    return pwd_context.hash(password)


def verify_password(password: str, hashed_password: str):
    return pwd_context.verify(password, hashed_password)


def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({"exp": expire})

    token = jwt.encode(
        to_encode,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM
    )

    print("\n========== TOKEN CREATED ==========")
    print(token)
    print("===================================\n")

    return token


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
):

    print("\n========== AUTH DEBUG ==========")
    print("TOKEN RECEIVED:")
    print(token)

    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )

        print("\nPAYLOAD:")
        print(payload)

        user_id = payload.get("sub")

        print("\nUSER ID FROM TOKEN:")
        print(user_id)

        if user_id is None:
            raise HTTPException(
                status_code=401,
                detail="Token missing user id"
            )

        user = (
            db.query(User)
            .filter(User.id == int(user_id))
            .first()
        )

        print("\nDATABASE USER:")
        print(user)

        if user is None:
            raise HTTPException(
                status_code=401,
                detail="User not found"
            )

        print("\n========== AUTH SUCCESS ==========\n")

        return user

    except JWTError as e:
        print("\nJWT ERROR:")
        print(e)

        raise HTTPException(
            status_code=401,
            detail="Could not validate credentials"
        )

    except Exception as e:
        print("\nGENERAL ERROR:")
        print(e)

        raise HTTPException(
            status_code=401,
            detail="Could not validate credentials"
        )