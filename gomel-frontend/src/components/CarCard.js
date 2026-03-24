import "./CarCard.css";
import { useNavigate } from "react-router-dom";

function CarCard({
  _id, // 🔥 VERY IMPORTANT
  name,
  price,
  image,
  seats,
  fuel,
  transmission,
  rating,
  available
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/car/${_id}`); // ✅ FIXED
  };

  return (
    <div
      className="car-card"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >

      {/* Image */}
      <div className="image-wrapper">
        <img
          src={image || "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg"}
          alt={name}
          className="car-image"
        />

        {/* ⭐ Rating */}
        <div className="rating-badge">
          ⭐ {rating ?? "N/A"}
        </div>
      </div>

      {/* Title */}
      <h3 className="car-title">{name}</h3>

      {/* Features */}
      <div className="car-features">
        <span>👥 {seats ?? "-"} Seats</span>
        <span>⛽ {fuel ?? "-"}</span>
        <span>⚙ {transmission ?? "-"}</span>
      </div>

      {/* Availability */}
      <p className={`availability ${available ? "available" : "not-available"}`}>
        {available ? "Available Today" : "Currently Booked"}
      </p>

      {/* Price */}
      <p className="car-price">₹{price} / day</p>

      {/* Button */}
      {available ? (
        <button
          className="car-button primary"
          onClick={(e) => {
            e.stopPropagation(); // 🔥 prevents double click issue
            navigate(`/car/${_id}`);
          }}
        >
          Book Now →
        </button>
      ) : (
        <button className="car-button disabled" disabled>
          Not Available
        </button>
      )}
    </div>
  );
}

export default CarCard;