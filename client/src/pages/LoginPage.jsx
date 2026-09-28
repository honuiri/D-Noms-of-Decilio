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
        <div className="login-logo">DND</div>

        <h1>Welcome to D' Noms of Decilio</h1>
        <p className="login-subtitle">
          Enter the family password to continue.
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="username">Name</label>

          <input
            id="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />

          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {error && <p className="login-error">{error}</p>}

          <button type="submit">Enter</button>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;