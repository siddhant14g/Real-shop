import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

/**
 * Protects admin-only routes. If user not admin -> redirect (e.g. to home or login)
 * Usage: <Route path="/admin-dashboard" element={<AdminRoute><AdminDashboard/></AdminRoute>} />
 */
export default function AdminRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    // Logged in but not admin — send them to client dashboard (or home)
    return <Navigate to="/client-dashboard" replace />;
  }

  return children;
}
