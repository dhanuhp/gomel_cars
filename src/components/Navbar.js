import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import "./Navbar.css";

function Navbar() {

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {

    const handleScroll = () => {
      if (window.scrollY > 120) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>

      {/* 🔥 BRAND */}
      <Link to="/" className="brand">

        <img
          src="/logo.png"
          alt="Gomel Cars"
          className="logo-img"
        />

        <div className="brand-text">
          <span className="brand-title">GOMEL CARS</span>
          <span className="brand-tagline">Rent Smart. Drive Easy.</span>
        </div>

      </Link>

      {/* 🔍 Search (appears after scroll) */}
      <div className={`navbar-search ${scrolled ? "show" : ""}`}>
        <SearchBar small />
      </div>

      {/* 🔗 NAVIGATION */}
      <div className="nav-links">
        <Link to="/cars">Cars</Link>
        <Link to="/locations">Locations</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup" className="signup-btn">Signup</Link>
      </div>

    </nav>
  );
}

export default Navbar;