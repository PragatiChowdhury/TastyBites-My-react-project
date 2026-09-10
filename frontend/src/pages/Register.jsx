import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({ name:"", email:"", password:"", confirmPassword:"" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/auth/register", form);
      login(data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <section className="auth-box">
      <h1>Create Account</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={submit}>
        <input placeholder="Full Name" required value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})}/>
        <input placeholder="Email" type="email" required value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})}/>
        <input placeholder="Password" type="password" required value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})}/>
        <input placeholder="Confirm Password" type="password" required value={form.confirmPassword} onChange={(e)=>setForm({...form,confirmPassword:e.target.value})}/>
        <button className="btn full">Register</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </section>
  );
}
