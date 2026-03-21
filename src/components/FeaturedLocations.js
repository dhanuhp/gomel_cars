import "./FeaturedLocations.css";

const locations = [
  {
    name: "Kochi",
    image: "https://images.pexels.com/photos/162031/pexels-photo-162031.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    name: "Bangalore",
    image: "https://images.pexels.com/photos/240320/pexels-photo-240320.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    name: "Hyderabad",
    image: "https://images.pexels.com/photos/358136/pexels-photo-358136.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    name: "Calicut",
    image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    name: "Chennai",
    image: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    name: "Mumbai",
    image: "https://images.pexels.com/photos/358515/pexels-photo-358515.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    name: "Delhi",
    image: "https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

function FeaturedLocations() {
  return (
    <div className="zoom-wrapper">

      <h2 className="zoom-title">
        Discover Beautiful Destinations Across India
      </h2>

      <div className="zoom-scroll">
        {locations.map((loc, index) => (
          <div className="zoom-card" key={index}>
            <img src={loc.image} alt={loc.name} />
            <div className="zoom-overlay">
              <h3>{loc.name}</h3>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default FeaturedLocations;