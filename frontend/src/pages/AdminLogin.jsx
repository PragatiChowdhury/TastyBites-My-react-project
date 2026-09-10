import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";

export default function AdminLogin() {
  const [form, setForm] = useState({ email:"", password:"" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", form);
      if (data.user.role !== "Admin") throw new Error("This account is not an admin");
      login(data);
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Admin login failed");
    }
  };

  return (
    <section className="auth-box">
      <p className="eyebrow">Secure Area</p>
      <h1>Admin Login</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={submit}>
        <input type="email" placeholder="Admin Email" required value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})}/>
        <input type="password" placeholder="Password" required value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})}/>
        <button className="btn full">Login as Admin</button>
      </form>
    </section>
  );
}
