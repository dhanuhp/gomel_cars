import CarCard from "./CarCard";
import cars from "../data/cars";
import "./PopularCars.css";

function PopularCars() {

  // 🔥 show 10 cars instead of 3
  const popular = cars.slice(0, 10);

  return (
    <div className="cars-container">

      <h2 className="title">Popular Cars</h2>

      <div className="cars-grid">
        {popular.map((car) => (
          <CarCard
            key={car.id}
            name={car.name}
            price={car.price}
            image={car.image}
            seats={car.seats}
            fuel={car.fuel}
            transmission={car.transmission}
            rating={car.rating}
            available={true}
          />
        ))}
      </div>

    </div>
  );
}

export default PopularCars;