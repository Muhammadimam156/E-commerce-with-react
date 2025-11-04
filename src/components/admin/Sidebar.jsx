import React from "react";
import { Link, useLocation } from "react-router-dom";

function NavItem({ to, icon, label }) {
  const { pathname } = useLocation();
  const active = pathname === to;
  return (
    <Link
      to={to}
      className={
        "flex items-center gap-3 px-4 py-2 rounded-md transition-colors " +
        (active
          ? "bg-indigo-600 text-white hover:bg-indigo-600"
          : "text-gray-200 hover:bg-white/10")
      }
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}

export default function Sidebar({ open, onClose }) {
  return (
    <aside
      className={
        "fixed z-40 inset-y-0 left-0 w-64 bg-gray-900 text-white flex flex-col border-r border-white/10 transform transition-transform lg:translate-x-0 " +
        (open ? "translate-x-0" : "-translate-x-full lg:translate-x-0")
      }
      aria-label="Admin sidebar"
    >
      <div className="h-16 flex items-center px-4 border-b border-white/10">
        <div className="h-8 w-8 rounded bg-indigo-500 mr-2" />
        <span className="font-semibold">Admin Panel</span>
        <button
          className="ml-auto lg:hidden text-white/70 hover:text-white"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          ×
        </button>
      </div>

      <nav className="p-3 space-y-1 overflow-y-auto">
        <NavItem
          to="/admin"
          label="Dashboard"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M3 12l9-9 9 9h-2v8a1 1 0 01-1 1h-4v-6H10v6H6a1 1 0 01-1-1v-8H3z" />
            </svg>
          }
        />
        <NavItem
          to="/admin/products"
          label="Products"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M3 7l9-4 9 4-9 4-9-4zm0 6l9 4 9-4v6l-9 4-9-4v-6z" />
            </svg>
          }
        />
        {/* Add more items as needed */}
      </nav>

      <div className="mt-auto p-3 border-t border-white/10 text-xs text-white/60">
        © {new Date().getFullYear()} Admin
      </div>
    </aside>
  );
}
