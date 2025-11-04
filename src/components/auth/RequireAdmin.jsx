import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function RequireAdmin({ children }) {
  const { user, authLoading } = useAuth();
  const location = useLocation();

  if (authLoading) {
    return (
      <div className="p-6">Checking permissions…</div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />
    );
  }
  return children;
}
