# Real-Time Auction Platform

## Overview

A full-stack Real-Time Auction Platform built using FastAPI and PostgreSQL. Users can register, log in securely using JWT authentication, create auctions, place bids, and automatically determine the winner when an auction closes.

---

## Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Protected APIs

### Auction Management
- Create Auction
- View Auctions
- View Auction Details
- Update Auction
- Delete Auction
- Close Auction

### Bidding System
- Place Bids
- Bid Validation
- Bid History
- Automatic Current Price Update

### Winner Selection
- Automatically selects the highest bidder
- Stores Winner ID
- Stores Winning Bid

---

## Tech Stack

### Backend
- FastAPI
- SQLAlchemy
- PostgreSQL
- JWT Authentication
- Passlib (Bcrypt)
- Pydantic

---

## Project Structure

```
backend/
│
├── app/
│   ├── core/
│   ├── models/
│   ├── routes/
│   ├── schemas/
│   └── main.py
│
├── requirements.txt
├── README.md
└── .gitignore
```

---

## Installation

Clone the repository

```bash
git clone <repository-url>
```

Create a virtual environment

```bash
python -m venv venv
```

Activate the environment

```bash
venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run the application

```bash
uvicorn app.main:app --reload
```

Swagger Documentation

```
http://127.0.0.1:8000/docs
```

---

## API Endpoints

### Authentication

- POST /auth/register
- POST /auth/login

### Auctions

- POST /auctions
- GET /auctions
- GET /auctions/{id}
- PUT /auctions/{id}
- DELETE /auctions/{id}
- PATCH /auctions/{id}/close

### Bids

- POST /bids
- GET /bids/{auction_id}

---

## Database

- PostgreSQL
- SQLAlchemy ORM
- Foreign Key Relationships

---

## Future Enhancements

- Real-Time WebSocket Bidding
- Live Notifications
- Image Upload
- Auction Countdown Timer
- User Dashboard
- Admin Panel

---

## Author

Sarath Balaji