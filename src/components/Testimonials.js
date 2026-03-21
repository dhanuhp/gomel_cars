import "./Testimonials.css";

const reviews = [
  {
    name: "Prateek Srivastava",
    text: "Nice service with on time pickup and delivery. Friendly staff and smooth cars. Highly recommended 😄"
  },
  {
    name: "Roshan Raval",
    text: "Seamless booking experience with instant refund. Everything was handled professionally."
  },
  {
    name: "Sanjib Sarkar",
    text: "Got a car at 4:30 AM! Very transparent and reliable service ❤️"
  },
  {
    name: "Arijit Sarkar",
    text: "Sanitized cars and polite staff. Honest and trustworthy company."
  }
];

function Testimonials() {
  return (
    <div className="testi-wrapper">

      <h2>What Our Customers Say</h2>
      <p className="subtitle">
        Real experiences from people who trust Gomel Cars.
      </p>

      <div className="testi-grid">

        {reviews.map((review, i) => (
          <div className="testi-card" key={i}>

            {/* TOP (ICON / AVATAR) */}
            <div className="testi-top">
              <div className="avatar">
                {review.name.charAt(0)}
              </div>
              <h3>{review.name}</h3>
            </div>

            {/* TEXT */}
            <p className="review-text">
              “{review.text}”
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Testimonials;