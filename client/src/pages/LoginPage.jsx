import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE = import.meta.env.VITE_API_BASE_URL || "";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const credentials = btoa(`${username}:${password}`);

    const response = await fetch(`${BASE}/api/recipes`, {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    });

    if (!response.ok) {
      setError("Incorrect name or password.");
      return;
    }

    sessionStorage.setItem("dndCredentials", credentials);

    navigate("/home");
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-decoration login-decoration-one">✦</div>
        <div className="login-decoration login-decoration-two">♡</div>

        <img
          src="/assets/logo.png"
          alt="DND logo"
          className="login-logo"
        />

        <img
          src="/assets/slogan.png"
          alt="DND name"
          className="login-name"
        />

        <div className="login-divider">
          <span>✦</span>
        </div>

        <p className="login-prompt">
          Enter our family details to continue.
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="username">Name</label>

          <input
            id="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Your name"
            required
          />

          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Family password"
            required
          />

          {error && <p className="login-error">{error}</p>}

          <button type="submit">Enter the Kitchen →</button>
        </form>

        <p className="login-footer-text">
          Made with love & good food ♡
        </p>
      </section>
    </main>
  );
}

export default LoginPage;
