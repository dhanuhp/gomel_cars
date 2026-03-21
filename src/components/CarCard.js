import "./CarCard.css";
import { Link } from "react-router-dom";

function CarCard({
  name,
  price,
  image,
  seats,
  fuel,
  transmission,
  rating,
  available
}) {
  return (
    <div className="car-card">

      {/* Image with fallback */}
      <div className="image-wrapper">
        <img
          src={image}
          alt={name}
          className="car-image"
          onError={(e) => {
            e.target.src =
              "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg";
          }}
        />

        {/* ⭐ rating badge */}
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
        <Link to={`/car/${name}`} className="link">
          <button className="car-button primary">
            Book Now →
          </button>
        </Link>
      ) : (
        <button className="car-button disabled" disabled>
          Not Available
        </button>
      )}
    </div>
  );
}

export default CarCard;