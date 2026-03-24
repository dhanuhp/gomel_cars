import CarCard from "./CarCard";
import cars from "../data/cars";

function CarList() {

  const featuredCars = cars.slice(0, 3);

  return (
    <div style={{ padding: "40px" }}>

      <h2 style={{ textAlign: "center" }}>Available Cars</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "25px",
          marginTop: "30px",
          maxWidth: "1100px",
          marginLeft: "auto",
          marginRight: "auto"
        }}
      >
        {featuredCars.map((car) => (
          <CarCard
            key={car.id}
            name={car.name}
            price={car.price}
            image={car.image}
            seats={car.seats}
            fuel={car.fuel}
            transmission={car.transmission}
            rating={car.rating}
          />
        ))}
      </div>

    </div>
  );
}

export default CarList;