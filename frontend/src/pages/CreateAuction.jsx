import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function CreateAuction() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [category, setCategory] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  async function createAuction(e) {
    e.preventDefault();

    try {
      await api.post("/auctions", {
        title,
        description,
        starting_price: Number(startingPrice),
        category,
        start_time: startTime,
        end_time: endTime,
      });

      alert("Auction Created Successfully");

      navigate("/auctions");
    } catch (err) {
      console.log(err.response?.data);
      alert("Failed to Create Auction");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={createAuction}
        style={{
          width: "500px",
          background: "#1e293b",
          padding: "30px",
          borderRadius: "12px",
        }}
      >
        <h1>Create Auction</h1>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            ...inputStyle,
            height: "100px",
          }}
        />

        <input
          type="number"
          placeholder="Starting Price"
          value={startingPrice}
          onChange={(e) => setStartingPrice(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={inputStyle}
        />

        <label>Start Time</label>

        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          style={inputStyle}
        />

        <label>End Time</label>

        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          style={inputStyle}
        />

        <button
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "20px",
            background: "#16a34a",
            border: "none",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Create Auction
        </button>

        <Link
          to="/dashboard"
          style={{
            color: "white",
            display: "block",
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          Back to Dashboard
        </Link>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "15px",
  boxSizing: "border-box",
};