import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CarCard from "../components/CarCard";
import SkeletonCard from "../components/SkeletonCard";
import cars from "../data/cars";
import "./Cars.css";

function Cars() {

  const locationData = useLocation();
  const params = new URLSearchParams(locationData.search);

  const location = params.get("location");
  const pickup = params.get("pickup");
  const returnDate = params.get("return");

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  /* ✅ Availability Check */
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

  /* ✅ Filtering */
  let filteredCars = cars
    .filter((car) => (location ? car.location === location : true))
    .filter((car) => (filter === "All" ? true : car.type === filter))
    .filter((car) =>
      car.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((car) => car.price >= minPrice && car.price <= maxPrice);

  /* ✅ Sorting */
  if (sortBy === "priceLow") {
    filteredCars.sort((a, b) => a.price - b.price);
  }
  if (sortBy === "priceHigh") {
    filteredCars.sort((a, b) => b.price - a.price);
  }
  if (sortBy === "rating") {
    filteredCars.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="cars-page">

      {/* HEADER */}
      <div className="cars-header">
        <h1>
          {location ? `Cars in ${location}` : "Available Cars"}
        </h1>

        {pickup && returnDate && (
          <p>{pickup} → {returnDate}</p>
        )}
      </div>

      {/* FILTER PANEL */}
      <div className="filter-panel">

        {/* SEARCH + SORT */}
        <div className="filter-row">
          <input
            className="filter-input"
            placeholder="Search car name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Sort</option>
            <option value="priceLow">Price ↑</option>
            <option value="priceHigh">Price ↓</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* PRICE */}
        <div className="price-row">
          <input
            className="filter-input"
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
          />

          <input
            className="filter-input"
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>

        {/* FILTER CHIPS */}
        <div className="filter-chips">
          {["All", "SUV", "Sedan", "Hatchback"].map((type) => (
            <button
              key={type}
              className={`chip ${filter === type ? "active" : ""}`}
              onClick={() => setFilter(type)}
            >
              {type}
            </button>
          ))}
        </div>

      </div>

      {/* GRID */}
      <div className="cars-grid">

        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
          : filteredCars.length === 0 ? (
              <h3 className="no-data">No cars found</h3>
            ) : (
              filteredCars.map((car) => (
                <CarCard
                  key={car.id}
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