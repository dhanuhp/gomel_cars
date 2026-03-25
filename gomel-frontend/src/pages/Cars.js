import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CarCard from "../components/CarCard";
import SkeletonCard from "../components/SkeletonCard";
import "./Cars.css";

function Cars() {
  const locationData = useLocation();
  const params = new URLSearchParams(locationData.search);

  const location = params.get("location");
  const pickup = params.get("pickup");
  const returnDate = params.get("return");

  const [cars, setCars] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH FROM LIVE BACKEND (FIXED)
  useEffect(() => {
    fetch("https://gomel-cars.onrender.com/cars")
      .then((res) => res.json())
      .then((data) => {
        setCars(data.data || []); // ✅ safe fallback
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  // ✅ Availability Check
  const isCarAvailable = (car) => {
    if (!pickup || !returnDate) return true;

    const pickupDate = new Date(pickup);
    const returnDateObj = new Date(returnDate);

    if (!car.bookedDates?.length) return true;

    return !car.bookedDates.some((date) => {
      const booked = new Date(date);
      return booked >= pickupDate && booked <= returnDateObj;
    });
  };

  // ✅ Filtering
  let filteredCars = cars
    .filter((car) => (location ? car.location === location : true))
    .filter((car) => (filter === "All" ? true : car.type === filter))
    .filter((car) =>
      car.name?.toLowerCase().includes(search.toLowerCase())
    )
    .filter((car) => car.price >= minPrice && car.price <= maxPrice);

  // ✅ Sorting
  if (sortBy === "priceLow") {
    filteredCars.sort((a, b) => a.price - b.price);
  }
  if (sortBy === "priceHigh") {
    filteredCars.sort((a, b) => b.price - a.price);
  }
  if (sortBy === "rating") {
    filteredCars.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  return (
    <div className="cars-page">
      
      {/* HEADER */}
      <h1>
        {location ? `Cars in ${location}` : "Available Cars"}
      </h1>

      {/* GRID */}
      <div className="cars-grid">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))
        ) : filteredCars.length === 0 ? (
          <h3>No cars found</h3>
        ) : (
          filteredCars.map((car) => (
            <CarCard
              key={car._id}
              {...car}
              available={isCarAvailable(car)}
            />
          ))
        )}
      </div>

    </div>
  );
}

export default Cars;