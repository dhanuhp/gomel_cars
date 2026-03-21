import React from "react";
import "./CarExperienceSection.css";

const data = [
  {
    title: "City",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
    desc: "Perfect for daily city rides with comfort and efficiency.",
    btn: "Explore City Cars",
  },
  {
    title: "Commercial",
    image: "https://images.unsplash.com/photo-1583267746897-2cf415887172",
    desc: "Best for business and transport needs.",
    btn: "Explore Commercial",
  },
  {
    title: "Family",
    image: "https://images.unsplash.com/photo-1549924231-f129b911e442",
    desc: "Spacious and comfortable for family trips.",
    btn: "Explore Family Cars",
  },
  {
    title: "SUV",
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c",
    desc: "Powerful rides for long journeys and adventures.",
    btn: "Explore SUVs",
  },
];

function CarExperienceSection() {
  return (
    <div className="car-exp-wrapper">
      <h2>Cars for your every need</h2>

      <div className="car-exp-grid">
        {data.map((item, i) => (
          <div className="car-card" key={i}>
            
            {/* IMAGE */}
            <div className="car-card-image">
              <img src={item.image} alt={item.title} />
              <div className="car-card-overlay">
                <h3>{item.title}</h3>
              </div>
            </div>

            {/* CONTENT */}
            <div className="car-card-content">
              <p>{item.desc}</p>
              <button>{item.btn}</button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default CarExperienceSection;