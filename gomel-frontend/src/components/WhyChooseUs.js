import "./WhyChooseUs.css";
import { Link } from "react-router-dom";

function WhyChooseUs() {
  return (
    <div className="why-container">

      <div className="why-card">

        <h2>
          Why choose <span>Gomel Cars?</span>
        </h2>

        <p className="subtitle">
          From quick bookings to safe rides, we make your journey smooth and reliable.
        </p>

        <div className="why-content">

          {/* LEFT */}
          <div className="why-side">
            <div className="why-item">
              <div className="icon">🚗</div>
              <h4>Huge Fleet</h4>
              <p>Thousands of cars across multiple cities</p>
            </div>

            <div className="why-item">
              <div className="icon">⚡</div>
              <h4>Instant Booking</h4>
              <p>Book your car within seconds</p>
            </div>
          </div>

          {/* CENTER IMAGE */}
          <div className="why-image">
            <img
              src="https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg"
              alt="Car"
            />
          </div>

          {/* RIGHT */}
          <div className="why-side">
            <div className="why-item">
              <div className="icon">🔒</div>
              <h4>Fully Insured</h4>
              <p>Safe and secure rides guaranteed</p>
            </div>

            <div className="why-item">
              <div className="icon">📍</div>
              <h4>Flexible Pickup</h4>
              <p>Pickup anywhere in your city</p>
            </div>
          </div>

        </div>

        {/* 🔥 BUTTON WITH NAVIGATION */}
        <Link to="/cars" style={{ textDecoration: "none" }}>
          <button className="why-btn">
            Explore Cars →
          </button>
        </Link>

      </div>

    </div>
  );
}

export default WhyChooseUs;