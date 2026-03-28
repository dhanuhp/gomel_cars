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

  // 🔥 FETCH CAR
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await fetch(
          `https://gomel-cars.onrender.com/car/${id}`
        );

        if (!res.ok) throw new Error("Failed to fetch car");

        const data = await res.json();
        setCar(data.data || null);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  // 🔥 FORMAT DATE
  const formatDate = (date) =>
    new Date(date).toISOString().split("T")[0];

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

    if (end <= start) {
      setTotalDays(0);
      setTotalPrice(0);
      return;
    }

    const days = Math.ceil(
      (end - start) / (1000 * 60 * 60 * 24)
    );

    setTotalDays(days);
    setTotalPrice(days * car.price);
  }, [pickupDate, returnDate, car]);

  // 🔥 BOOKING
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
      alert("Selected dates already booked ❌");
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

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  if (!car) {
    return <h2 style={{ textAlign: "center" }}>Car not found</h2>;
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <div style={{ padding: "80px 20px", maxWidth: "900px", margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>{car.name}</h1>

      <img
        src={
          car.image ||
          "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg"
        }
        alt={car.name}
        style={{ width: "100%", borderRadius: "10px", marginBottom: "20px" }}
      />

      <p>📍 Location: {car.location || "N/A"}</p>
      <p>🚘 Type: {car.type}</p>
      <p>👥 Seats: {car.seats || "N/A"}</p>
      <p>⛽ Fuel: {car.fuel || "N/A"}</p>
      <p>⚙ Transmission: {car.transmission || "N/A"}</p>

      <p style={{ marginBottom: "20px" }}>
        💰 Price: ₹{car.price} / day
      </p>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <input
          type="date"
          min={today}
          value={pickupDate}
          onChange={(e) => {
            const val = e.target.value;
            if (bookedDates.includes(val)) {
              alert("Date already booked ❌");
              return;
            }
            setPickupDate(val);
          }}
        />

        <input
          type="date"
          min={pickupDate || today}
          value={returnDate}
          onChange={(e) => {
            const val = e.target.value;
            if (bookedDates.includes(val)) {
              alert("Date already booked ❌");
              return;
            }
            setReturnDate(val);
          }}
        />

        <button onClick={handleBooking} disabled={totalDays <= 0}>
          Book 🚀
        </button>
      </div>

      {totalDays > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Trip Summary</h3>
          <p>{totalDays} days</p>
          <h2>Total: ₹{totalPrice}</h2>
        </div>
      )}
    </div>
  );
}

export default CarDetails;