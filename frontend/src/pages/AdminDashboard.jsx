import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";

function AdminDashboard() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please select an image");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);

    try {
      setLoading(true);
      await api.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setName("");
      setDescription("");
      setImage(null);
      fetchProducts();
      alert("✅ Product added successfully");
    } catch (err) {
      console.error("Add product error:", err);
      console.error("Error response:", err.response?.data);
      const errorMessage = err.response?.data?.message || err.message || "Failed to add product";
      alert(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch {
      alert("Failed to delete product");
    }
  };

  const toggleAvailability = async (id) => {
    try {
      await api.put(`/products/${id}/toggle`);
      fetchProducts();
    } catch {
      alert("Failed to toggle availability");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 p-6">
      {/* ===== HEADER ===== */}
      <header className="flex justify-between items-center mb-10 bg-white shadow-md p-5 rounded-2xl border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">🧑‍💼 Admin Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </header>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* ===== MANAGE ORDERS SECTION ===== */}
        <section className="text-center">
          <button
            onClick={() => navigate("/admin-orders")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-md transition-all"
          >
            🧾 Manage Orders
          </button>
        </section>



        {/* ===== PRODUCTS SECTION ===== */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            📦 Manage Products
          </h2>

          <form
            onSubmit={addProduct}
            className="bg-white p-5 rounded-lg shadow-md mb-6"
          >
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 rounded w-full"
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 rounded w-full"
              />
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="border p-2 rounded w-full"
                accept="image/*"
              />
              <button
                type="submit"
                disabled={loading}
                className={`px-5 py-2 rounded-md text-sm font-medium text-white transition-all shadow-sm ${loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98]"
                  }`}
              >
                {loading ? "Adding..." : "Add Product"}
              </button>
            </div>
          </form>

          {/* ===== PRODUCT GRID ===== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all"
              >
                {p.imageUrl && (
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="h-48 w-full object-cover"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                )}

                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">{p.name}</h3>
                  {p.description ? (
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                      {p.description}
                    </p>
                  ) : (
                    <p className="text-gray-400 text-xs italic mb-4">
                      No description available.
                    </p>
                  )}
                  <p
                    className={`text-sm mb-2 ${p.available ? "text-green-600" : "text-red-600"
                      }`}
                  >
                    {p.available ? "Available" : "Unavailable"}
                  </p>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => toggleAvailability(p._id)}
                      className={`${p.available
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-600 hover:bg-green-700"
                        } text-white px-3 py-1 rounded transition-all`}
                    >
                      {p.available ? "Mark Unavailable" : "Mark Available"}
                    </button>
                    <button
                      onClick={() => deleteProduct(p._id)}
                      className="text-red-500 hover:text-red-700 font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* ===== ADVERTISEMENT SECTION ===== */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            🖼️ Manage Advertisements
          </h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (!image) return alert("Please select an image");
              const formData = new FormData();
              formData.append("image", image);
              try {
                await api.post("/advertisements", formData, {
                  headers: { "Content-Type": "multipart/form-data" },
                });
                alert("✅ Advertisement added successfully!");
                setImage(null);
              } catch {
                alert("Failed to upload advertisement");
              }
            }}
            className="bg-white p-5 rounded-lg shadow-md flex flex-col sm:flex-row gap-4 items-center"
          >
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="border p-2 rounded w-full"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md w-full sm:w-auto"
            >
              Add Advertisement
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default AdminDashboard;
