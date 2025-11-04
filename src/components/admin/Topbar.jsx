import React from "react";
import { useLocation } from "react-router-dom";

export default function Topbar({ onMenu }) {
  const { pathname } = useLocation();
  const title = pathname === "/admin"
    ? "Dashboard"
    : pathname.startsWith("/admin/products")
    ? "Products"
    : "Admin";

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-200 h-16 flex items-center px-4 sm:px-6 lg:px-8">
      <button
        className="lg:hidden mr-3 inline-flex items-center justify-center h-9 w-9 rounded-md border border-gray-200 text-gray-700"
        onClick={onMenu}
        aria-label="Open sidebar"
      >
        ☰
      </button>
      <h1 className="text-lg font-semibold">{title}</h1>
      <div className="ml-auto flex items-center gap-3">
        <div className="hidden sm:flex items-center">
          <input
            placeholder="Search..."
            className="h-9 w-40 sm:w-56 rounded-md border border-gray-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          className="h-9 w-9 rounded-full border border-gray-200 text-gray-600"
          aria-label="Notifications"
        >
          🔔
        </button>
        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500" />
      </div>
    </header>
  );
}
