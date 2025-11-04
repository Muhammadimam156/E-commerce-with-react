import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const redirect = params.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      await login({ email, password });
      navigate(redirect, { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
    }
  }

  return (
    <div className="min-h-[70vh] grid place-items-center px-4">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold">Login</h1>
        <p className="mt-1 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to={`/register?redirect=${encodeURIComponent(redirect)}`} className="text-indigo-600 hover:underline">
            Register
          </Link>
        </p>

        <form className="mt-5 grid gap-3" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {error && <div className="text-sm text-red-600">{String(error)}</div>}
          <button className="mt-2 rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">Login</button>
        </form>
      </div>
    </div>
  );
}
