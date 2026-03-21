import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import cars from "../data/cars";

function CarDetails() {

  const { name } = useParams();
  const navigate = useNavigate();

  const car = cars.find(
    (c) => c.name === decodeURIComponent(name)
  );

  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [totalDays, setTotalDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  /* Price Calculation */

  useEffect(() => {

    if (!pickupDate || !returnDate || !car) {
      setTotalDays(0);
      setTotalPrice(0);
      return;
    }

    const start = new Date(pickupDate);
    const end = new Date(returnDate);

    const diffTime = end - start;

    if (diffTime <= 0) {
      setTotalDays(0);
      setTotalPrice(0);
      return;
    }

    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    setTotalDays(days);
    setTotalPrice(days * car.price);

  }, [pickupDate, returnDate, car]);

  /* Car Not Found */

  if (!car) {
    return <h2 style={{ textAlign: "center" }}>Car not found</h2>;
  }

  /* Booking */

  const handleBooking = () => {

    if (!pickupDate || !returnDate) {
      alert("Please select pickup and return dates");
      return;
    }

    if (totalDays <= 0) {
      alert("Return date must be after pickup date");
      return;
    }

    navigate(
      `/booking-success/${encodeURIComponent(car.name)}?pickup=${pickupDate}&return=${returnDate}`
    );
  };

  return (
    <div
      style={{
        padding: "80px 20px",
        maxWidth: "900px",
        margin: "auto"
      }}
    >

      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        {car.name}
      </h1>

      <img
        src={car.image}
        alt={car.name}
        style={{
          width: "100%",
          borderRadius: "10px",
          marginBottom: "30px"
        }}
      />

      <p style={{ fontSize: "18px", marginBottom: "10px" }}>
        Type: {car.type}
      </p>

      <p style={{ fontSize: "18px", marginBottom: "10px" }}>
        Seats: {car.seats}
      </p>

      <p style={{ fontSize: "18px", marginBottom: "10px" }}>
        Fuel: {car.fuel}
      </p>

      <p style={{ fontSize: "18px", marginBottom: "10px" }}>
        Transmission: {car.transmission}
      </p>

      <p style={{ fontSize: "18px", marginBottom: "25px" }}>
        Price: ₹{car.price} / day
      </p>

      {/* Date Selection */}

      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          alignItems: "center"
        }}
      >

        <input
          type="date"
          value={pickupDate}
          onChange={(e) => setPickupDate(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        />

        <input
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        />

        <button
          onClick={handleBooking}
          disabled={totalDays <= 0}
          style={{
            padding: "10px 25px",
            backgroundColor: totalDays > 0 ? "#0a2540" : "#aaa",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: totalDays > 0 ? "pointer" : "not-allowed"
          }}
        >
          Book This Car
        </button>

      </div>

      {/* Trip Summary */}

      {totalDays > 0 && (

        <div style={{ marginTop: "30px" }}>

          <h3>Trip Summary</h3>

          <p>Total Days: {totalDays}</p>

          <p>
            ₹{car.price} × {totalDays} days
          </p>

          <h2>Total Price: ₹{totalPrice}</h2>

        </div>

      )}

    </div>
  );
}

export default CarDetails;