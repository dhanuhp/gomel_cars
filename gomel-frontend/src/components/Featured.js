import "./Featured.css";

function Featured() {
  return (
    <div className="featured">

      <h2>Featured In</h2>

      <p className="featured-subtitle">
        Trusted by leading publications, industry voices, and financial news outlets.
      </p>

      <div className="logos">
        <img src="https://logo.clearbit.com/cnbc.com" alt="CNBC" />
        <img src="https://logo.clearbit.com/ndtv.com" alt="NDTV" />
        <img src="https://logo.clearbit.com/economictimes.indiatimes.com" alt="ET" />
        <img src="https://logo.clearbit.com/techcrunch.com" alt="TechCrunch" />
      </div>

    </div>
  );
}

export default Featured;