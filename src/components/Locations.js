function Locations() {

  const locations = [
    "Delhi",
    "Mumbai",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Kochi"
  ];

  return (
    <div style={{ padding: "60px 20px", background: "#f7f7f7" }}>

      <h2 style={{ textAlign: "center" }}>Popular Locations</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "20px",
          marginTop: "30px",
          maxWidth: "900px",
          marginLeft: "auto",
          marginRight: "auto"
        }}
      >
        {locations.map((city, index) => (
          <div
            key={index}
            style={{
              padding: "20px",
              background: "white",
              textAlign: "center",
              borderRadius: "10px",
              boxShadow: "0px 3px 8px rgba(0,0,0,0.05)"
            }}
          >
            {city}
          </div>
        ))}
      </div>

    </div>
  );
}

export default Locations;