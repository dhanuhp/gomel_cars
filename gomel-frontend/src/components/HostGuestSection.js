import { useState } from "react";
import "./HostGuestSection.css";

function HostGuestSection() {
  const [mode, setMode] = useState("host");

  const guestSteps = [
    {
      title: "Search Cars",
      desc: "Find cars near your location based on your travel needs.",
      img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800"
    },
    {
      title: "Select Dates",
      desc: "Choose your trip duration and check availability instantly.",
      img: "https://images.unsplash.com/photo-1520975922284-9e0ce827b3f1?w=800"
    },
    {
      title: "Book Instantly",
      desc: "Confirm your booking in seconds with secure payment.",
      img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800"
    },
    {
      title: "Drive & Enjoy",
      desc: "Pick up your car and enjoy a smooth ride experience.",
      img: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800"
    }
  ];

  const hostSteps = [
    {
      title: "Download App",
      desc: "Install the Gomel Cars app and get started quickly.",
      img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
    },
    {
      title: "Create Account",
      desc: "Register yourself and verify your profile easily.",
      img: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=800"
    },
    {
      title: "Upload Car",
      desc: "Add your car details, images, and pricing preferences.",
      img: "https://images.unsplash.com/photo-1493238792000-8113da705763?w=800"
    },
    {
      title: "Start Earning",
      desc: "Accept bookings and earn money from your vehicle.",
      img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800"
    }
  ];

  const steps = mode === "host" ? hostSteps : guestSteps;

  return (
    <div className="zoom-host">
      <div className="zoom-container">

        {/* TOGGLE */}
        <div className="zoom-toggle">
          <button
            className={mode === "guest" ? "active" : ""}
            onClick={() => setMode("guest")}
          >
            GUEST
          </button>

          <button
            className={mode === "host" ? "active" : ""}
            onClick={() => setMode("host")}
          >
            HOST
          </button>
        </div>

        {/* TITLE */}
        <h2>
          {mode === "host"
            ? "How to host your car"
            : "How to rent a car"}
        </h2>

        {/* STEPS */}
        <div className="zoom-steps">
          {steps.map((step, i) => (
            <div key={i} className="zoom-card">

              <img src={step.img} alt={step.title} />

              <div className="overlay"></div>

              <span className="step-number">
                0{i + 1}
              </span>

              <div className="card-content">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default HostGuestSection;