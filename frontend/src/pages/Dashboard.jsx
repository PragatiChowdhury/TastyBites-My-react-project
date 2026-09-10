import { useEffect, useState } from "react";
import api from "../api";
import AdminLayout from "../components/AdminLayout";

export default function Dashboard() {
  const [stats, setStats] = useState({ items:0, users:0, orders:0 });

  useEffect(() => {
    Promise.all([
      api.get("/menu-items"),
      api.get("/users")
    ]).then(([items, users]) => {
      setStats({ items: items.data.length, users: users.data.length, orders: 0 });
    });
  }, []);

  return (
    <AdminLayout title="Dashboard">
      <div className="stats">
        <div className="stat"><span>Total Menu Items</span><strong>{stats.items}</strong></div>
        <div className="stat"><span>Total Users</span><strong>{stats.users}</strong></div>
        <div className="stat"><span>Total Orders</span><strong>{stats.orders}</strong><small>Orders module not included in supplied specification.</small></div>
      </div>
    </AdminLayout>
  );
}
