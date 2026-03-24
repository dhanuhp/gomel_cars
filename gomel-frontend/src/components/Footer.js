import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* ABOUT */}
        <div className="footer-column">
          <h3>About Us</h3>
          <p>
            Gomel Cars is a smart self-drive car rental platform built for modern travelers.
            Enjoy affordable, flexible, and premium driving experiences across India.
          </p>

          <p className="address">
            📍 Trivandrum, Kerala, India
          </p>
        </div>

        {/* COMPANY */}
        <div className="footer-column">
          <h3>Company</h3>
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
          <span>FAQs</span>
          <span>Blogs</span>
          <span>Investor Relations</span>
        </div>

        {/* SERVICES */}
        <div className="footer-column">
          <h3>Our Services</h3>
          <span>Daily Rentals</span>
          <span>Subscription</span>
          <span>Car Hosting</span>
          <span>Airport Pickup</span>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>© 2026 Gomel Cars. All rights reserved.</p>
      </div>

    </footer>
  );
}

export default Footer;