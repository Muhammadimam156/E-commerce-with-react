import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Sidebar for desktop */}
      <div className="lg:flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main content */}
        <div className="flex-1 lg:ml-64">
          <Topbar onMenu={() => setSidebarOpen((v) => !v)} />

          <div className="p-4 sm:p-6 lg:p-8">
            {/* Support both usage styles: children or nested routes */}
            {children ? children : <Outlet />}
          </div>
        </div>
      </div>

      {/* Mobile overlay when sidebar open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
