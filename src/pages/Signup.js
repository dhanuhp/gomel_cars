import "./Signup.css";

function Signup() {
  return (
    <div className="signup-page">

      {/* CARD */}
      <div className="signup-card">

        <h1>Create Account</h1>
        <p>Join us and start your journey</p>

        {/* INPUTS */}
        <input
          type="text"
          placeholder="Full Name"
          className="signup-input"
        />

        <input
          type="email"
          placeholder="Email"
          className="signup-input"
        />

        <input
          type="password"
          placeholder="Password"
          className="signup-input"
        />

        {/* BUTTON */}
        <button className="signup-btn">
          Sign Up
        </button>

      </div>

    </div>
  );
}

export default Signup;