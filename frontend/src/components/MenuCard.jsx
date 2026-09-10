import { Link } from "react-router-dom";

export default function MenuCard({ item }) {
  return (
    <article className="card">
      {item.image ? (
        <img src={item.image} alt={item.name} className="food-img" />
      ) : (
        <div className="food-placeholder">🍽️</div>
      )}
      <div className="card-body">
        <span className="tag">{item.category}</span>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <div className="card-footer">
          <strong>₹{item.price}</strong>
          <Link className="btn small" to={`/menu/${item._id}`}>View</Link>
        </div>
      </div>
    </article>
  );
}
