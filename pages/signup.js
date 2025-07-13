// pages/signup.js
import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");

  const handleSignup = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/users/signup", {
        email,
        password,
        location,
      });

      if (res.data.message === "User registered successfully") {
        alert("Signup successful!");
        router.push("/login");
      }
    } catch (err) {
      alert("Signup failed!");
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Sign Up</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          style={styles.input}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          style={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location (City or Coordinates)"
          value={location}
          style={styles.input}
          onChange={(e) => setLocation(e.target.value)}
        />

        <button onClick={handleSignup} style={styles.button}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    backgroundColor: "#f0f0ff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#5a3ec8",
    color: "#fff",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
