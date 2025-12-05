import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import api from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

function CartPage() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const placeOrder = async () => {
    try {
      setLoading(true);
      const items = cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      }));
      await api.post("/orders", { items });
      alert("✅ Order placed successfully!");
      clearCart();
      navigate("/client-dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-6 sm:p-8 mt-10">
        {/* ===== Header ===== */}
        <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-700">
          🛒 Your Cart
        </h2>

        {cart.length === 0 ? (
          <div className="text-center text-gray-600">
            <p className="mb-6 text-lg">Your cart is empty.</p>
            <Link
              to="/client-dashboard"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium shadow-md transition-all"
            >
              Back to Products
            </Link>
          </div>
        ) : (
          <>
            {/* ===== Cart Items ===== */}
            <ul className="space-y-4 mb-6">
              {cart.map((item) => (
                <li
                  key={item._id}
                  className="flex justify-between items-center border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all"
                >
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:text-red-700 font-medium text-sm transition-all"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            {/* ===== Buttons ===== */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={placeOrder}
                disabled={loading}
                className={`w-full py-3 text-lg rounded-xl font-semibold text-white shadow-md transition-all ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-700"
                }`}
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>

              <button
                onClick={clearCart}
                className="w-full py-3 text-lg rounded-xl font-semibold text-red-500 border-2 border-red-400 hover:bg-red-50 transition-all"
              >
                Clear Cart
              </button>
            </div>

            {/* ===== Back Button ===== */}
            <div className="text-center mt-8">
              <Link
                to="/client-dashboard"
                className="text-indigo-600 hover:underline font-medium"
              >
                ◁-- Continue Shopping
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;
