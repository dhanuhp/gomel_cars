import { useParams, useNavigate, useLocation } from "react-router-dom";

function BookingSuccess() {

  const { name } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const pickup = params.get("pickup");
  const returnDate = params.get("return");

  const decodedName = decodeURIComponent(name);

  return (
    <div
      style={{
        padding: "120px 20px",
        textAlign: "center",
        maxWidth: "700px",
        margin: "auto"
      }}
    >

      <h1
        style={{
          color: "#0a2540",
          marginBottom: "20px",
          fontSize: "40px"
        }}
      >
        Booking Confirmed 🎉
      </h1>

      <p
        style={{
          fontSize: "20px",
          marginBottom: "20px"
        }}
      >
        Your booking for <b>{decodedName}</b> has been successfully confirmed.
      </p>

      {pickup && returnDate && (
        <p
          style={{
            color: "#555",
            marginBottom: "25px",
            fontSize: "16px"
          }}
        >
          Pickup: <b>{pickup}</b> | Return: <b>{returnDate}</b>
        </p>
      )}

      <p style={{ color: "#777" }}>
        Our team will contact you shortly with further details.
      </p>

      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "40px",
          padding: "12px 28px",
          backgroundColor: "#0a2540",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px"
        }}
      >
        Go Back Home
      </button>

    </div>
  );
}

export default BookingSuccess;