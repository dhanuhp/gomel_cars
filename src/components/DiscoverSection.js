import "./DiscoverSection.css";
import { useNavigate } from "react-router-dom";

function DiscoverSection() {

  const navigate = useNavigate();

  return (
    <div className="discover-container">

      <div className="discover-card">

        <div className="discover-image">
          <img
            src="https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg"
            alt="car"
          />
        </div>

        <div className="discover-content">

          <h2>
            Discover the new way <br />
            <span>to rent a car</span>
          </h2>

          <p className="desc">
            Choose from thousands of cars available from private and professional owners near you.
          </p>

          <div className="features">
            <div className="feature">
              <span>😊</span>
              <div>
                <strong>Prices by the hour or day</strong>
                <p>Trip insurance included with no hidden charges.</p>
              </div>
            </div>

            <div className="feature">
              <span>✔</span>
              <div>
                <strong>No waiting around</strong>
                <p>Instant booking, no lines, no paperwork.</p>
              </div>
            </div>

            <div className="feature">
              <span>🚗</span>
              <div>
                <strong>Unlock with app</strong>
                <p>Use your phone to unlock and start your trip.</p>
              </div>
            </div>
          </div>

          {/* 🔥 BUTTON */}
          <button 
            className="discover-btn"
            onClick={() => navigate("/how-it-works")}
          >
            See how it works →
          </button>

        </div>

      </div>

    </div>
  );
}

export default DiscoverSection;