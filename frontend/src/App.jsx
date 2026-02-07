import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Notes from "./components/Notes";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [view, setView] = useState(token ? "notes" : "login");
  const [dark, setDark] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setView("login");
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        background: dark ? "#111827" : "#ffffff",
        color: dark ? "#f9fafb" : "#111827",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
      }}
    >
      {/* Navbar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "12px",
          borderBottom: "1px solid #e5e7eb",
          marginBottom: "20px",
        }}
      >
        <h1 style={{ margin: 0 }}>🔐 Secure Notes</h1>

        <div style={{ display: "flex", gap: "8px" }}>
          <button
            className="secondary"
            onClick={() => setDark(!dark)}
          >
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>

          {token && (
            <button
              className="secondary"
              onClick={logout}
            >
              🚪 Logout
            </button>
          )}
        </div>
      </div>

      {/* Auth buttons */}
      {!token && (
        <div style={{ marginBottom: "16px" }}>
          <button onClick={() => setView("login")}>Login</button>
          <button
            className="secondary"
            onClick={() => setView("register")}
          >
            Register
          </button>
        </div>
      )}
      
      {view === "login" && (
        <Login
          onSuccess={() => {
            setToken(localStorage.getItem("token"));
            setView("notes");
          }}
        />
      )}

      {view === "register" && <Register />}
      {view === "notes" && <Notes />}
    </div>
  );
}
