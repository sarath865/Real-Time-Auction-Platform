import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Auctions from "./pages/Auctions";
import AuctionDetails from "./pages/AuctionDetails";
import CreateAuction from "./pages/CreateAuction";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/auctions" element={<Auctions />} />

      <Route path="/auctions/:id" element={<AuctionDetails />} />

      <Route path="/create-auction" element={<CreateAuction />} />

      <Route path="/profile" element={<Profile />} />

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;
