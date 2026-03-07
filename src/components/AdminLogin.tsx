import { useState } from "react";
import { useAdmin } from "@/context/AdminContext";

const API = import.meta.env.VITE_API_URL;

export function AdminLogin() {
  const { login } = useAdmin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      login(data.token);
      window.location.href = "/";
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">
        <h2 className="mb-6 text-center text-2xl font-bold">Admin Login</h2>

        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="mb-4 w-full rounded border p-3 text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-6 w-full rounded border p-3 text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full rounded bg-navy py-3 text-white transition-colors hover:bg-navy-dark"
        >
          Login
        </button>
      </div>
    </div>
  );
}
