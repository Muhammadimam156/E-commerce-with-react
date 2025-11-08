import React from "react";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-gray-700 text-lg mb-4">Please login to view your account</p>
        <button
          onClick={() => (window.location.href = "/")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <div className="bg-white shadow rounded p-4 max-w-md">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
    </div>
  );
}
