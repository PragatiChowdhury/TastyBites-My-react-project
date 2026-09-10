import { useEffect, useState } from "react";
import api from "../api";
import MenuCard from "../components/MenuCard";

const categories = ["All", "Starter", "Main Course", "Dessert", "Beverage"];

export default function Home() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const loadItems = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/menu-items", { params: { search, category } });
      setItems(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadItems(); }, [category]);

  return (
    <div>
      <section className="hero">
        <div>
          <p className="eyebrow">Welcome to TastyBites</p>
          <h1>Delicious food, managed simply.</h1>
          <p>Browse our fresh menu and explore every dish.</p>
        </div>
      </section>

      <section className="toolbar">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && loadItems()}
          placeholder="Search menu item..."
        />
        <button className="btn" onClick={loadItems}>Search</button>
        <div className="chips">
          {categories.map((c) => (
            <button
              key={c}
              className={`chip ${category === c ? "active" : ""}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {loading ? <p>Loading menu...</p> : (
        <section className="grid">
          {items.map((item) => <MenuCard key={item._id} item={item} />)}
        </section>
      )}

      {!loading && items.length === 0 && <div className="empty">No menu items found.</div>}
    </div>
  );
}
