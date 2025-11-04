import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Account() {
  const { user, logout } = useAuth();
  const isLogged = !!user;
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold">My Account</h1>
      {!isLogged ? (
        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6">
          <p className="text-gray-700">You're not logged in.</p>
          <div className="mt-3 flex gap-3">
            <Link to="/login" className="rounded-md bg-indigo-600 px-4 py-2 text-white">Login</Link>
            <Link to="/register" className="rounded-md border border-gray-300 px-4 py-2">Register</Link>
          </div>
        </div>
      ) : (
        <div className="mt-4 grid gap-4">
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="text-sm text-gray-500">Name</div>
            <div className="font-medium">{user.name || "User"}</div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="text-sm text-gray-500">Email</div>
            <div className="font-medium">{user.email}</div>
          </div>
          <div className="flex">
            <button onClick={logout} className="rounded-md bg-gray-900 text-white px-4 py-2">Logout</button>
          </div>
        </div>
      )}
    </div>
  );
}
