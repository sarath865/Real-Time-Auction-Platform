import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function register(e) {
    e.preventDefault();

    const data = {
      username: username.trim(),
      email: email.trim(),
      password: password.trim(),
    };

    console.log("=================================");
    console.log("Sending Data:");
    console.log(data);
    console.log("=================================");

    try {
      const res = await api.post("/auth/register", data);

      console.log("Success:", res.data);

      alert("Registration Successful");

      navigate("/");
    } catch (err) {
      console.log("Complete Error:", err);

      if (err.response) {
        console.log("Status:", err.response.status);
        console.log("Backend Response:", err.response.data);

        alert(JSON.stringify(err.response.data, null, 2));
      } else {
        alert("Cannot connect to backend");
      }
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#0f172a",
      }}
    >
      <form
        onSubmit={register}
        style={{
          width: 400,
          background: "#1e293b",
          padding: 30,
          borderRadius: 12,
        }}
      >
        <h2
          style={{
            color: "white",
            textAlign: "center",
            marginBottom: 25,
          }}
        >
          Register
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            console.log("Username:", e.target.value);
            setUsername(e.target.value);
          }}
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 15,
            boxSizing: "border-box",
          }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            console.log("Email:", e.target.value);
            setEmail(e.target.value);
          }}
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 15,
            boxSizing: "border-box",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            console.log("Password:", e.target.value);
            setPassword(e.target.value);
          }}
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 20,
            boxSizing: "border-box",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: 12,
            background: "#16a34a",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Register
        </button>

        <p
          style={{
            color: "white",
            textAlign: "center",
            marginTop: 20,
          }}
        >
          Already have an account?{" "}
          <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
}