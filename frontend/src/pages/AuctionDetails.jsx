import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

export default function AuctionDetails() {
  const { id } = useParams();

  const [auction, setAuction] = useState(null);
  const [bids, setBids] = useState([]);
  const [bidAmount, setBidAmount] = useState("");

  useEffect(() => {
    loadAuction();
    loadBids();
  }, []);

  async function loadAuction() {
    try {
      const res = await api.get(`/auctions/${id}`);
      setAuction(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load auction");
    }
  }

  async function loadBids() {
    try {
      const res = await api.get(`/bids/${id}`);
      setBids(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function placeBid(e) {
    e.preventDefault();

    try {
      await api.post("/bids", {
        auction_id: Number(id),
        bid_amount: Number(bidAmount),
      });

      alert("Bid placed successfully");

      async function closeAuction() {
  try {
    await api.patch(`/auctions/${id}/close`);

    alert("Auction Closed Successfully");

    loadAuction();
    loadBids();
  } catch (err) {
    console.log(err.response?.data);

    alert(
      err.response?.data?.detail ||
      "Failed to Close Auction"
    );
  }
}

      setBidAmount("");

      loadAuction();
      loadBids();
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.detail || "Failed to place bid");
    }
  }

  if (!auction) {
    return (
      <div
        style={{
          color: "white",
          padding: "40px",
          background: "#0f172a",
          minHeight: "100vh",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "40px",
      }}
    >
      <Link
        to="/auctions"
        style={{
          color: "#38bdf8",
          textDecoration: "none",
        }}
      >
        ← Back to Auctions
      </Link>

      <div
        style={{
          background: "#1e293b",
          padding: "25px",
          borderRadius: "12px",
          marginTop: "20px",
        }}
      >
        <h1>{auction.title}</h1>

        <p>
          <strong>Description:</strong> {auction.description}
        </p>

        <p>
          <strong>Category:</strong> {auction.category}
        </p>

        <p>
          <strong>Status:</strong> {auction.status}
        </p>

        <p>
          <strong>Starting Price:</strong> ₹{auction.starting_price}
        </p>

        <h2 style={{ color: "#22c55e" }}>
          Current Price: ₹{auction.current_price}
        </h2>
        {
  auction.status === "ACTIVE" && (
    <button
      onClick={closeAuction}
      style={{
        marginTop: "20px",
        width: "100%",
        padding: "14px",
        background: "#dc2626",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "16px",
      }}
    >
      Close Auction
    </button>
  )
}
{
  auction.status === "ENDED" && (
    <div
      style={{
        marginTop: "25px",
        background: "#14532d",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h2>🏆 Auction Closed</h2>

      <p>
        <strong>Winner ID:</strong>{" "}
        {auction.winner_id ?? "No Winner"}
      </p>

      <p>
        <strong>Winning Bid:</strong>{" "}
        ₹{auction.winning_bid ?? 0}
      </p>
    </div>
  )
}

        <form
          onSubmit={placeBid}
          style={{
            marginTop: "25px",
          }}
        >
          <input
            type="number"
            placeholder="Enter your bid"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              boxSizing: "border-box",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "#2563eb",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Place Bid
          </button>
        </form>
      </div>

      <div
        style={{
          marginTop: "40px",
        }}
      >
        <h2>Bid History</h2>

        {bids.length === 0 ? (
          <p>No bids placed yet.</p>
        ) : (
          bids.map((bid) => (
            <div
              key={bid.id}
              style={{
                background: "#1e293b",
                padding: "15px",
                marginTop: "10px",
                borderRadius: "10px",
              }}
            >
              <p>
                <strong>Bid Amount:</strong> ₹{bid.bid_amount}
              </p>

              <p>
                <strong>User ID:</strong> {bid.user_id}
              </p>

              <p>
                <strong>Time:</strong>{" "}
                {new Date(bid.created_at).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}