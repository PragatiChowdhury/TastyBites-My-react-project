import { Link } from "react-router-dom";

export default function AdminLayout({ title, children }) {
  return (
    <section>
      <div className="admin-head">
        <div>
          <p className="eyebrow">Admin Panel</p>
          <h1>{title}</h1>
        </div>
        <div className="admin-nav">
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/menu">Menu Items</Link>
          <Link to="/admin/menu/add">Add Item</Link>
          <Link to="/admin/users">Users</Link>
        </div>
      </div>
      {children}
    </section>
  );
}
