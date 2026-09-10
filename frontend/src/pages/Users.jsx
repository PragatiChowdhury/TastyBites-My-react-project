import { useEffect, useState } from "react";
import api from "../api";
import AdminLayout from "../components/AdminLayout";

export default function Users() {
  const [users, setUsers] = useState([]);

  const load = () => api.get("/users").then((res)=>setUsers(res.data));
  useEffect(() => { load(); }, []);

  const remove = async (id) => {
    if (!confirm("Delete this user?")) return;
    await api.delete(`/users/${id}`);
    load();
  };

  return (
    <AdminLayout title="Users">
      <div className="table-wrap">
        <table>
          <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Registration Date</th><th>Action</th></tr></thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td><td>{u.email}</td><td>{u.role}</td>
                <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                <td><button className="danger small-btn" onClick={()=>remove(u._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
