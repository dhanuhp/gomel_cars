import "./LinksSection.css";

function LinksSection() {

  const cities = [
    // Metro Cities
    "Bangalore", "Mumbai", "Delhi NCR", "Chennai", "Hyderabad", "Kolkata",

    // Tier 1 Cities
    "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Chandigarh", "Kochi",
    "Indore", "Nagpur", "Surat", "Bhopal", "Coimbatore", "Mysore",
    "Visakhapatnam", "Trivandrum",

    // Popular Travel Cities
    "Goa", "Udaipur", "Manali", "Shimla", "Rishikesh", "Mussoorie",
    "Ooty", "Kodaikanal", "Munnar", "Alleppey",

    // Growing Cities
    "Vijayawada", "Madurai", "Nashik", "Kanpur", "Patna", "Varanasi",
    "Jodhpur", "Amritsar", "Ranchi", "Raipur", "Aurangabad",
    "Dehradun", "Guwahati", "Vadodara", "Siliguri",

    // Smart Cities / Industrial
    "Noida", "Gurgaon", "Faridabad", "Ghaziabad",
    "Tiruchirappalli", "Salem", "Hubli", "Belgaum",

    // Tourist + Emerging
    "Agra", "Ajmer", "Pushkar", "Darjeeling", "Gangtok",
    "Leh", "Srinagar", "Jammu", "Pondicherry", "Dharamshala",

    // Additional Expansion
    "Kolhapur", "Bhavnagar", "Jamnagar", "Gwalior",
    "Jabalpur", "Bilaspur", "Shillong", "Aizawl",
    "Imphal", "Itanagar"
  ];
  return (
    <div className="links-container">

      <h3>Car Rental Services in India</h3>

      <div className="links-grid">
        {cities.map((city, i) => (
          <span key={i}>Self Drive Cars in {city}</span>
        ))}
      </div>

    </div>
  );
}

export default LinksSection;