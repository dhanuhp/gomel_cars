import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function CarDetails() {

  const { id } = useParams(); // 🔥 FIX: use id
  const navigate = useNavigate();

  const [car, setCar] = useState(null);

  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [totalDays, setTotalDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // 🔥 FETCH FROM BACKEND
  useEffect(() => {
    fetch(`http://localhost:5000/car/${id}`)
      .then(res => res.json())
      .then(data => setCar(data))
      .catch(err => console.error(err));
  }, [id]);

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

  /* Loading state */
  if (!car) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
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
        src={car.image || "https://via.placeholder.com/800x400"}
        alt={car.name}
        style={{
          width: "100%",
          borderRadius: "10px",
          marginBottom: "30px"
        }}
      />

      <p>Type: {car.type}</p>
      <p>Seats: {car.seats || "N/A"}</p>
      <p>Fuel: {car.fuel || "N/A"}</p>
      <p>Transmission: {car.transmission || "N/A"}</p>

      <p style={{ marginBottom: "25px" }}>
        Price: ₹{car.price} / day
      </p>

      {/* DATE INPUTS */}
      <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>

        <input
          type="date"
          value={pickupDate}
          onChange={(e) => setPickupDate(e.target.value)}
        />

        <input
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
        />

        <button
          onClick={handleBooking}
          disabled={totalDays <= 0}
        >
          Book This Car
        </button>

      </div>

      {/* SUMMARY */}
      {totalDays > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h3>Trip Summary</h3>
          <p>Total Days: {totalDays}</p>
          <p>₹{car.price} × {totalDays}</p>
          <h2>Total Price: ₹{totalPrice}</h2>
        </div>
      )}

    </div>
  );
}

export default CarDetails;