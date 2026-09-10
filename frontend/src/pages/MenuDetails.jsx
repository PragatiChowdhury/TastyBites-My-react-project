import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api";

export default function MenuDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    api.get(`/menu-items/${id}`).then((res) => setItem(res.data));
  }, [id]);

  if (!item) return <p>Loading...</p>;

  return (
    <section className="details">
      <div>
        {item.image ? <img src={item.image} alt={item.name} className="details-img" /> : <div className="details-placeholder">🍽️</div>}
      </div>
      <div>
        <span className="tag">{item.category}</span>
        <h1>{item.name}</h1>
        <p className="large-text">{item.description}</p>
        <h2>₹{item.price}</h2>
        <p className={item.availability ? "available" : "unavailable"}>
          {item.availability ? "In Stock" : "Out of Stock"}
        </p>
        <Link className="btn" to="/">← Back to Menu</Link>
      </div>
    </section>
  );
}
