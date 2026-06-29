import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function Auctions() {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    loadAuctions();
  }, []);

  async function loadAuctions() {
    try {
      const res = await api.get("/auctions");
      setAuctions(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load auctions");
    }
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
      <h1>📦 All Auctions</h1>

      <Link
        to="/dashboard"
        style={{
          color: "#38bdf8",
          textDecoration: "none",
        }}
      >
        ← Back to Dashboard
      </Link>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {auctions.length === 0 ? (
          <h3>No Auctions Found</h3>
        ) : (
          auctions.map((auction) => (
            <div
              key={auction.id}
              style={{
                background: "#1e293b",
                padding: "20px",
                borderRadius: "12px",
              }}
            >
              <h2>{auction.title}</h2>

              <p>
                <b>Category:</b> {auction.category}
              </p>

              <p>
                <b>Status:</b> {auction.status}
              </p>

              <p>
                <b>Current Price:</b> ₹{auction.current_price}
              </p>

              <Link
                to={`/auctions/${auction.id}`}
                style={{
                  display: "inline-block",
                  marginTop: "10px",
                  background: "#3b82f6",
                  color: "white",
                  padding: "10px 15px",
                  borderRadius: "8px",
                  textDecoration: "none",
                }}
              >
                View Details
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}