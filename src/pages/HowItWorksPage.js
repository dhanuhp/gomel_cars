import "./HowItWorksPage.css";

function HowItWorksPage() {

  const steps = [
    {
      title: "Browse Cars",
      desc: "Explore thousands of cars available near you with real-time availability.",
      img: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg"
    },
    {
      title: "Book Instantly",
      desc: "Select your dates and confirm booking within seconds.",
      img: "https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg"
    },
    {
      title: "Verify Profile",
      desc: "Quick and secure verification process for safe rides.",
      img: "https://images.pexels.com/photos/4145196/pexels-photo-4145196.jpeg"
    },
    {
      title: "Unlock & Drive",
      desc: "Use the app to unlock your car and start your journey.",
      img: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg"
    }
  ];

  return (
    <div className="luro-container">

      {/* HEADER */}
      <h1 className="luro-title">How Gomel Cars Works</h1>
      <p className="luro-subtitle">
        A smarter, faster and seamless way to rent cars.
      </p>

      {/* STEPS */}
      {steps.map((step, index) => (
        <div
          key={index}
          className={`luro-section ${index % 2 !== 0 ? "reverse" : ""}`}
        >

          <div className="luro-card">
            <img src={step.img} alt={step.title} />
          </div>

          <div className="luro-text">
            <h2>{step.title}</h2>
            <p>{step.desc}</p>
          </div>

        </div>
      ))}

    </div>
  );
}

export default HowItWorksPage;