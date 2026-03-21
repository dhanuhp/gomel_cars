import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Cars from "./pages/Cars";
import CarDetails from "./pages/CarDetails";
import LocationsPage from "./pages/LocationsPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BookingSuccess from "./pages/BookingSuccess";

/* ✅ NEW PAGE */
import HowItWorksPage from "./pages/HowItWorksPage";

/* 🔥 SCROLL FIX */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>

      <ScrollToTop />

      <Navbar />

      <main style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/car/:name" element={<CarDetails />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/booking-success/:name" element={<BookingSuccess />} />

          {/* 🔥 IMPORTANT FIX */}
          <Route path="/how-it-works" element={<HowItWorksPage />} />
        </Routes>
      </main>

      <Footer />

    </Router>
  );
}

export default App;