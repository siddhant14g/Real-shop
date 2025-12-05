import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ClientDashboard from "./pages/ClientDashboard";
import CartPage from "./pages/CartPage";
import MyOrders from "./pages/MyOrders";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import ManageOrders from "./pages/ManageOrders";
import ProtectedRoute from "./utils/ProtectedRoute";
import AdminRoute from "./utils/AdminRoute";
import ClientRoute from "./utils/ClientRoute";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />


            {/* Client-only routes */}
            <Route
              path="/client-dashboard"
              element={
                <ClientRoute>
                  <ClientDashboard />
                </ClientRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ClientRoute>
                  <CartPage />
                </ClientRoute>
              }
            />
            <Route
              path="/my-orders"
              element={
                <ClientRoute>
                  <MyOrders />
                </ClientRoute>
              }
            />

            {/* Admin-only */}
            <Route
              path="/admin-dashboard"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
            <Route
              path="/admin-orders"
              element={
                <AdminRoute>
                  <ManageOrders />
                </AdminRoute>
              }
            />

          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
