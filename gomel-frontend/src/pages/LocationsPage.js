import "./Locations.css";

function LocationsPage() {

  const locations = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Kolkata"
  ];

  return (
    <div className="locations-page">

      {/* HEADER */}
      <div className="locations-header">
        <h1>Our Locations</h1>
        <p>Choose your city and start your journey</p>
      </div>

      {/* GRID */}
      <div className="locations-grid">

        {locations.map((city, index) => (
          <div key={index} className="location-card">
            {city}
          </div>
        ))}

      </div>

    </div>
  );
}

export default LocationsPage;