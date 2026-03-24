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
import HowItWorksPage from "./pages/HowItWorksPage";

/* 🔥 Scroll to top on route change */
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
      {/* ✅ Scroll Fix */}
      <ScrollToTop />

      {/* ✅ Navbar */}
      <Navbar />

      {/* ✅ Main Content */}
      <main style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Cars />} />

          {/* 🔥 Better: use ID instead of name (important for backend) */}
          <Route path="/car/:id" element={<CarDetails />} />

          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/booking-success/:name" element={<BookingSuccess />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
        </Routes>
      </main>

      {/* ✅ Footer */}
      <Footer />
    </Router>
  );
}

export default App;