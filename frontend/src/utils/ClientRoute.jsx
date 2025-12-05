import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

/**
 * Client-only routes
 * Prevents admin from accessing client pages.
 */
export default function ClientRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" replace />;
  if (user.role === "admin") return <Navigate to="/admin-dashboard" replace />;

  return children;
}
