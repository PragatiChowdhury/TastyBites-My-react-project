import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import AdminLayout from "../components/AdminLayout";

export default function MenuManagement() {
  const [items, setItems] = useState([]);

  const load = () => api.get("/menu-items").then((res) => setItems(res.data));

  useEffect(() => { load(); }, []);

  const remove = async (id) => {
    if (!confirm("Delete this menu item?")) return;
    await api.delete(`/menu-items/${id}`);
    load();
  };

  return (
    <AdminLayout title="Menu Items">
      <div className="table-wrap">
        <table>
          <thead><tr><th>Name</th><th>Category</th><th>Price</th><th>Availability</th><th>Actions</th></tr></thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>₹{item.price}</td>
                <td>{item.availability ? "In Stock" : "Out of Stock"}</td>
                <td>
                  <Link className="btn small" to={`/admin/menu/edit/${item._id}`}>Edit</Link>
                  <button className="danger small-btn" onClick={()=>remove(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
