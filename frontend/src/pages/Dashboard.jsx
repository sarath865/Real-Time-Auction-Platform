import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <h1>🏆 Auction Platform</h1>

        <button
          onClick={logout}
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
        }}
      >
        <Link to="/auctions" style={{ textDecoration: "none" }}>
          <div
            style={{
              background: "#1e293b",
              padding: "30px",
              borderRadius: "15px",
              color: "white",
            }}
          >
            <h2>📦 View Auctions</h2>
            <p>Browse all live auctions</p>
          </div>
        </Link>

        <Link to="/create-auction" style={{ textDecoration: "none" }}>
          <div
            style={{
              background: "#1e293b",
              padding: "30px",
              borderRadius: "15px",
              color: "white",
            }}
          >
            <h2>➕ Create Auction</h2>
            <p>Create your own auction</p>
          </div>
        </Link>

        <Link to="/profile" style={{ textDecoration: "none" }}>
          <div
            style={{
              background: "#1e293b",
              padding: "30px",
              borderRadius: "15px",
              color: "white",
            }}
          >
            <h2>👤 Profile</h2>
            <p>Your account information</p>
          </div>
        </Link>
      </div>
    </div>
  );
}