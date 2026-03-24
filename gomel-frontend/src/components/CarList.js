import { useEffect, useState } from "react";
import CarCard from "./CarCard";

function CarList() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/cars")
      .then((res) => res.json())
      .then((data) => {
        setCars(data.data); // 🔥 important
      })
      .catch((err) => console.error("Error fetching cars:", err));
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ textAlign: "center" }}>Available Cars 🚗</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "25px",
          marginTop: "30px",
          maxWidth: "1100px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {cars.map((car) => (
          <CarCard
            key={car._id} // 🔥 MongoDB uses _id
            name={car.name}
            price={car.price}
            image={"https://via.placeholder.com/300"} // temporary image
            seats={4}
            fuel={"Petrol"}
            transmission={"Manual"}
            rating={4.5}
          />
        ))}
      </div>
    </div>
  );
}

export default CarList;