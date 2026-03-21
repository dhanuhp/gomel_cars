import "./Stats.css";
import CountUp from "react-countup";

function Stats() {
  const data = [
    { value: 10000, label: "Cars", icon: "🚗", suffix: "+" },
    { value: 50, label: "Cities", icon: "🌍", suffix: "+" },
    { value: 1000000, label: "Customers", icon: "👥", suffix: "+" },
    { value: 4.7, label: "Rating", icon: "⭐", suffix: "", decimals: 1 }
  ];

  return (
    <div className="stats-container">

      {/* 🔥 HEADER */}
      <div className="stats-header">
        <h2>
          Trusted by <span>Thousands</span> of Users
        </h2>
        <p>
          From city rides to long journeys, Gomel Cars delivers reliability,
          convenience, and a seamless driving experience across multiple locations.
        </p>
      </div>

      {/* 🔥 STATS */}
      <div className="stats-grid">
        {data.map((item, index) => (
          <div className="stat-card" key={index}>

            <div className="icon">{item.icon}</div>

            <h2 className="stat-number">
              <CountUp
                key={index}
                start={0}
                end={item.value}
                duration={2.5}
                separator=","
                decimals={item.decimals || 0}
                enableScrollSpy={true}
              />
              {item.suffix}
            </h2>

            <p>{item.label}</p>

          </div>
        ))}
      </div>

      {/* 🔥 FOOTER */}
      <div className="stats-footer">
        <p>
          Join a growing community of happy customers and experience smarter,
          faster, and more flexible car rentals with Gomel Cars.
        </p>
      </div>

    </div>
  );
}

export default Stats;