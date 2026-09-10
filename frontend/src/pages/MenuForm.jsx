import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import AdminLayout from "../components/AdminLayout";

const empty = {
  name: "", description: "", category: "Starter",
  price: "", availability: true, image: ""
};

export default function MenuForm() {
  const [form, setForm] = useState(empty);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) api.get(`/menu-items/${id}`).then((res) => setForm(res.data));
  }, [id]);

  const change = (key, value) => setForm((old) => ({ ...old, [key]: value }));

  const submit = async (e) => {
    e.preventDefault();
    if (id) await api.put(`/menu-items/${id}`, form);
    else await api.post("/menu-items", form);
    navigate("/admin/menu");
  };

  return (
    <AdminLayout title={id ? "Edit Menu Item" : "Add Menu Item"}>
      <form className="form-card" onSubmit={submit}>
        <label>Item Name<input required value={form.name} onChange={(e)=>change("name",e.target.value)}/></label>
        <label>Description<textarea required value={form.description} onChange={(e)=>change("description",e.target.value)}/></label>
        <label>Category
          <select value={form.category} onChange={(e)=>change("category",e.target.value)}>
            <option>Starter</option><option>Main Course</option><option>Dessert</option><option>Beverage</option>
          </select>
        </label>
        <label>Price<input required type="number" min="0" value={form.price} onChange={(e)=>change("price",e.target.value)}/></label>
        <label>Image URL<input placeholder="https://..." value={form.image || ""} onChange={(e)=>change("image",e.target.value)}/></label>
        <label className="checkbox"><input type="checkbox" checked={!!form.availability} onChange={(e)=>change("availability",e.target.checked)}/> In Stock</label>
        <button className="btn">Save Menu Item</button>
      </form>
    </AdminLayout>
  );
}
