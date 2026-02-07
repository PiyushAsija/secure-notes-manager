import { useState } from "react";
import axios from "axios";

const API = "https://secure-notes-manager.onrender.com";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      await axios.post(`${API}/api/auth/register`, {
        email,
        password,
      });
      alert("Registered successfully");
      setEmail("");
      setPassword("");
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <>
      <h3>Register</h3>
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
      <button onClick={register}>Register</button>
    </>
  );
}
