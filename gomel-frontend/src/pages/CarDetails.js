import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [totalDays, setTotalDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // 🔥 FETCH CAR (FIXED)
  useEffect(() => {
    fetch(`https://gomel-cars.onrender.com/car/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCar(data.data || null); // ✅ safe fallback
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [id]);

  // 🔥 FORMAT DATE
  const formatDate = (date) => {
    return new Date(date).toISOString().split("T")[0];
  };

  const bookedDates = (car?.bookedDates || []).map(formatDate);

  // 🔥 PRICE CALCULATION
  useEffect(() => {
    if (!pickupDate || !returnDate || !car) {
      setTotalDays(0);
      setTotalPrice(0);
      return;
    }

    const start = new Date(pickupDate);
    const end = new Date(returnDate);

    const diff = end - start;

    if (diff <= 0) {
      setTotalDays(0);
      setTotalPrice(0);
      return;
    }

    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    setTotalDays(days);
    setTotalPrice(days * car.price);
  }, [pickupDate, returnDate, car]);

  // 🔥 BOOKING FUNCTION (FIXED URL)
  const handleBooking = async () => {
    if (!pickupDate || !returnDate) {
      alert("Please select dates");
      return;
    }

    if (totalDays <= 0) {
      alert("Invalid date range");
      return;
    }

    const conflict = bookedDates.some(
      (date) => date >= pickupDate && date <= returnDate
    );

    if (conflict) {
      alert("Some selected dates are already booked ❌");
      return;
    }

    try {
      const res = await fetch(
        `https://gomel-cars.onrender.com/book-car/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pickupDate,
            returnDate,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Booking failed");
        return;
      }

      navigate(
        `/booking-success/${encodeURIComponent(
          car.name
        )}?pickup=${pickupDate}&return=${returnDate}`
      );
    } catch (error) {
      console.error(error);
      alert("Booking failed");
    }
  };

  // 🔥 LOADING STATES
  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  if (!car) {
    return <h2 style={{ textAlign: "center" }}>Car not found</h2>;
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <div
      style={{
        padding: "80px 20px",
        maxWidth: "900px",
        margin: "auto",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        {car.name}
      </h1>

      <img
        src={
          car.image ||
          "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg"
        }
        alt={car.name}
        style={{
          width: "100%",
          borderRadius: "10px",
          marginBottom: "30px",
        }}
      />

      <p>📍 Location: {car.location || "N/A"}</p>
      <p>🚘 Type: {car.type}</p>
      <p>👥 Seats: {car.seats || "N/A"}</p>
      <p>⛽ Fuel: {car.fuel || "N/A"}</p>
      <p>⚙ Transmission: {car.transmission || "N/A"}</p>

      <p style={{ marginBottom: "25px" }}>
        💰 Price: ₹{car.price} / day
      </p>

      {/* DATE INPUT */}
      <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
        <input
          type="date"
          min={today}
          value={pickupDate}
          onChange={(e) => {
            const selected = e.target.value;
            if (bookedDates.includes(selected)) {
              alert("This date is already booked ❌");
              return;
            }
            setPickupDate(selected);
          }}
        />

        <input
          type="date"
          min={pickupDate || today}
          value={returnDate}
          onChange={(e) => {
            const selected = e.target.value;
            if (bookedDates.includes(selected)) {
              alert("This date is already booked ❌");
              return;
            }
            setReturnDate(selected);
          }}
        />

        <button onClick={handleBooking} disabled={totalDays <= 0}>
          Book This Car 🚀
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