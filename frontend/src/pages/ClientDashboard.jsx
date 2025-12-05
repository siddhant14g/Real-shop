import { useEffect, useState, useContext } from "react";
import api from "../utils/api";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

function ClientDashboard() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const { addToCart, cart, increaseQty, decreaseQty } = useContext(CartContext);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (query = "") => {
    try {
      setLoading(true);
      const endpoint = query ? `/products/search?name=${query}` : `/products`;
      const res = await api.get(endpoint);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearch(query);
    fetchProducts(query);
  };

  // Helper to get item quantity from cart
  const getQuantity = (productId) => {
    const item = cart.find((item) => item._id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-0 via-white to-emerald-50">
      {/* ===== Top Header ===== */}
      <header className="flex justify-between items-center bg-white/90 backdrop-blur-md shadow-md p-4 sticky top-0 z-10 border-b border-gray-200">
        <h1 className="text-xl sm:text-3xl font-extrabold text-indigo-700">
          🛍️ OnlineShop
        </h1>

        <div className="flex items-center gap-3 sm:gap-5">
          <Link
            to="/my-orders"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow transition-all"
          >
            Orders
          </Link>
          <a
            href="tel:+917666326066"
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition-all "
          >
            📞 Call
          </a>
        </div>
      </header>

      {/* ===== Search Bar ===== */}
      <div className="flex justify-center px-4 mt-6">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="🔍 Search for products..."
          className="border border-gray-300 p-3 w-full max-w-lg rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-300 outline-none text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* ===== Product List ===== */}
      <div className="flex-grow max-w-6xl mx-auto p-6 w-full">
        {loading ? (
          <p className="text-center text-gray-500 text-lg mb-4 animate-pulse">
            Loading products...
          </p>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => {
              const qty = getQuantity(product._id);
              return (
                <div
                  key={product._id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 flex flex-col"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800 mb-1">
                        {product.name}
                      </h2>
                      <p className="text-gray-500 text-sm mb-4">
                        {product.description || "No description available."}
                      </p>
                    </div>

                    {product.available ? (
                      qty > 0 ? (
                        <div className="flex items-center justify-between bg-emerald-100 rounded-lg p-2 mt-auto">
                          <button
                            onClick={() => decreaseQty(product._id)}
                            className="bg-emerald-600 text-white w-8 h-8 rounded-full text-lg font-bold hover:bg-emerald-700 transition"
                          >
                            –
                          </button>
                          <span className="text-gray-800 font-semibold">
                            {qty}
                          </span>
                          <button
                            onClick={() => increaseQty(product._id)}
                            className="bg-emerald-600 text-white w-8 h-8 rounded-full text-lg font-bold hover:bg-emerald-700 transition"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(product)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg mt-auto transition-all"
                        >
                          Add to Cart
                        </button>
                      )
                    ) : (
                      <button
                        disabled
                        className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed mt-auto"
                      >
                        Unavailable
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg mt-10">
            No products found.
          </p>
        )}

        <div className="flex justify-center items-center">
          <button
            onClick={logout}
            className="bg-gray-600 mt-9 mb-16 hover:bg-gray-700 text-white px-4 py-2 rounded-lg shadow transition-all"
          >
            Logout
          </button>
        </div>
      </div>

      {/* ===== Floating Buttons ===== */}
      <div className="fixed bottom-6 inset-x-0 flex justify-center items-center gap-4 px-4">
        <Link
          to="/cart"
          className="bg-indigo-700 hover:bg-indigo-800 text-white font-medium px-6 py-3 rounded-full shadow-lg transition-all"
        >
          View Cart ({cart.length})
        </Link>
      </div>
    </div>
  );
}

export default ClientDashboard;
