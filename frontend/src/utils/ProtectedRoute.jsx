import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

/**
 * Protects routes that require authentication.
 * Usage: <Route path="/client-dashboard" element={<ProtectedRoute><ClientDashboard/></ProtectedRoute>} />
 */
export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    // Not logged in — redirect to login
    return <Navigate to="/login" replace />;
  }

  // Logged in — render the child component
  return children;
}
