import "./SpecialOffers.css";

const offers = [
  {
    title: "Short Trip",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
    desc: "Get 5% off on short trips up to ₹500.",
    code: "STMB5",
    discount: "5% OFF"
  },
  {
    title: "5 Day Special",
    image: "https://images.unsplash.com/photo-1583267746897-2cf415887172",
    desc: "Enjoy 10% discount for long rentals.",
    code: "STMB10",
    discount: "10% OFF"
  },
  {
    title: "Long Trip",
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c",
    desc: "Flat 15% off for extended journeys.",
    code: "STMB15",
    discount: "15% OFF"
  }
];

function SpecialOffers() {
  return (
    <div className="offers-wrapper">

      <h2>Best Offers for You</h2>
      <p className="subtitle">
        Save more on every ride with exclusive deals.
      </p>

      <div className="offers-grid">

        {offers.map((offer, i) => (
          <div className="offer-card" key={i}>

            {/* IMAGE */}
            <div className="offer-image">
              <img src={offer.image} alt={offer.title} />

              <div className="offer-overlay">
                <h3>{offer.title}</h3>
                <span>{offer.discount}</span>
              </div>
            </div>

            {/* CONTENT */}
            <div className="offer-content">
              <p>{offer.desc}</p>

              <button>
                Use Code: {offer.code}
              </button>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default SpecialOffers;