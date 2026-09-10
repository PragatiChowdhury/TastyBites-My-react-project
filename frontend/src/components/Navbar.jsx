import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const signOut = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <Link className="brand" to="/">TastyBites</Link>
        <div className="nav-links">
          <Link to="/">Menu</Link>
          {user?.role === "Admin" && <Link to="/admin">Dashboard</Link>}
          {!user && <Link to="/login">Login</Link>}
          {!user && <Link to="/register">Register</Link>}
          {user && <span className="welcome">Hi, {user.name}</span>}
          {user && <button className="link-btn" onClick={signOut}>Logout</button>}
        </div>
      </div>
    </nav>
  );
}
