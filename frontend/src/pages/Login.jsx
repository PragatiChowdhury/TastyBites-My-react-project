import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/auth/login", form);
      login(data);
      navigate(data.user.role === "Admin" ? "/admin" : "/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <AuthForm title="User Login" error={error} onSubmit={submit}>
      <input placeholder="Email" type="email" required value={form.email} onChange={(e) => setForm({...form, email:e.target.value})} />
      <input placeholder="Password" type="password" required value={form.password} onChange={(e) => setForm({...form, password:e.target.value})} />
      <button className="btn full">Login</button>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </AuthForm>
  );
}

function AuthForm({ title, error, onSubmit, children }) {
  return <section className="auth-box"><h1>{title}</h1>{error && <div className="error">{error}</div>}<form onSubmit={onSubmit}>{children}</form></section>;
}
