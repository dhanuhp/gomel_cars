import "./Login.css";

function Login() {
  return (
    <div className="login-page">

      {/* CARD */}
      <div className="login-card">

        <h1>Welcome Back</h1>
        <p>Login to continue your journey</p>

        {/* INPUTS */}
        <input
          type="email"
          placeholder="Email"
          className="login-input"
        />

        <input
          type="password"
          placeholder="Password"
          className="login-input"
        />

        {/* BUTTON */}
        <button className="login-btn">
          Login
        </button>

      </div>

    </div>
  );
}

export default Login;