import { useState } from "react";
import axios from "axios";

const API = "https://secure-notes-manager.onrender.com";

export default function Login({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post(`${API}/api/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      onSuccess();
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <>
      <h3>Login</h3>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>
    </>
  );
}
