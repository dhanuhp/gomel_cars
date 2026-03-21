import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./SearchBar.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function SearchBar({ small }) {

  const navigate = useNavigate();

  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  /* 🔥 FORMAT DATE FOR URL */
  const formatDate = (date) => {
    return date ? date.toISOString() : "";
  };

  /* 🔍 HANDLE SEARCH */
  const handleSearch = () => {
    navigate(
      `/cars?location=${location}&from=${formatDate(startDate)}&to=${formatDate(endDate)}`
    );
  };

  return (
    <div className={`airbnb-search ${small ? "airbnb-small" : ""}`}>

      {/* LOCATION */}
      <div className="search-section">
        <span className="label">Where</span>
        <input
          placeholder="Search destinations"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="divider"></div>

      {/* FROM DATE + TIME */}
      <div className="search-section">
        <span className="label">From</span>

        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText="Add date & time"

          dateFormat="dd MMM yyyy, hh:mm aa"

          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          timeCaption="Time"

          popperPlacement="bottom-start"
          popperStrategy="fixed"

          className="datepicker-input"
        />
      </div>

      <div className="divider"></div>

      {/* UNTIL DATE + TIME */}
      <div className="search-section">
        <span className="label">Until</span>

        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          placeholderText="Add date & time"

          dateFormat="dd MMM yyyy, hh:mm aa"

          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          timeCaption="Time"

          minDate={startDate}

          popperPlacement="bottom-start"
          popperStrategy="fixed"

          className="datepicker-input"
        />
      </div>

      {/* SEARCH BUTTON */}
      <button
        className="airbnb-button"
        onClick={handleSearch}
      >
        🔍
      </button>

    </div>
  );
}

export default SearchBar;