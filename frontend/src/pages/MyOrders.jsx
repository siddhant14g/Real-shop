import { useEffect, useState } from "react";
import api from "../utils/api";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [editItems, setEditItems] = useState([]);
  const [viewingBillImage, setViewingBillImage] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/orders/my-orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      await api.delete(`/orders/${id}`);
      fetchOrders();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to cancel order");
    }
  };

  const startEditOrder = (order) => {
    setEditingOrder(order);
    setEditItems(order.items.map((i) => ({ ...i })));
  };

  const handleQuantityChange = (index, newQty) => {
    setEditItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity: Number(newQty) } : item
      )
    );
  };

  const saveChanges = async () => {
    try {
      await api.put(`/orders/${editingOrder._id}`, {
        items: editItems.map((i) => ({
          productId: i.productId._id || i.productId,
          quantity: i.quantity,
        })),
      });
      setEditingOrder(null);
      fetchOrders();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update order");
    }
  };

  const cancelEdit = () => {
    setEditingOrder(null);
    setEditItems([]);
  };

  // Handle ESC key to close bill image modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && viewingBillImage) {
        setViewingBillImage(null);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [viewingBillImage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 p-6 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl p-6 sm:p-8 mt-6">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-indigo-700">
          📦 My Orders
        </h1>

        {loading ? (
          <p className="text-center text-gray-500 text-lg">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            You haven’t placed any orders yet.
          </p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-md border border-gray-200 p-5 hover:shadow-lg transition-all"
              >
                {/* ===== Header ===== */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
                  <div>
                    <span className="font-semibold text-gray-800">
                      Status:{" "}
                      <span
                        className={`${
                          order.status === "Completed"
                            ? "text-emerald-600"
                            : "text-yellow-600"
                        } font-medium`}
                      >
                        {order.status}
                      </span>
                    </span>
                    <p className="text-sm text-gray-500 mt-1">
                      Placed on:{" "}
                      <span className="font-medium text-gray-700">
                        {formatDate(order.createdAt)}
                      </span>
                    </p>
                  </div>

                  {order.status !== "Completed" && (
                    <div className="flex gap-4 mt-3 sm:mt-0">
                      <button
                        onClick={() => startEditOrder(order)}
                        className="text-blue-600 hover:text-blue-800 font-medium transition-all"
                      >
                         Modify
                      </button>
                      <button
                        onClick={() => deleteOrder(order._id)}
                        className="text-red-500 hover:text-red-700 font-medium transition-all"
                      >
                         Cancel
                      </button>
                    </div>
                  )}
                </div>

                {/* ===== Order Items ===== */}
                <ul className="space-y-3">
                  {order.items.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center border-b pb-2"
                    >
                      <span className="font-medium text-gray-700">
                        {item.productId?.name || "Deleted Product"}
                      </span>
                      <span className="text-gray-600 text-sm">
                        Qty: {item.quantity}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* ===== Bill Section ===== */}
                {order.billImage && (
                  <div className="mt-4">
                    <p className="text-gray-700 font-medium mb-1">Bill:</p>
                    <img
                      src={order.billImage}
                      alt="Bill"
                      onClick={() => setViewingBillImage(order.billImage)}
                      className="rounded-lg border w-40 sm:w-48 shadow-sm hover:shadow-md transition-all cursor-pointer hover:scale-105"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ====== Edit Modal ====== */}
      {editingOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md animate-fadeIn">
            <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
              🛠️ Modify Order
            </h2>

            <ul className="space-y-3 mb-5">
              {editItems.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <span className="font-medium text-gray-700">
                    {item.productId?.name || "Deleted Product"}
                  </span>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(index, e.target.value)
                    }
                    className="border rounded-lg px-2 py-1 w-16 text-center focus:ring-2 focus:ring-indigo-300 outline-none"
                  />
                </li>
              ))}
            </ul>

            <div className="flex justify-end gap-3">
              <button
                onClick={cancelEdit}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition-all"
              >
                Cancel
              </button>
              <button
                onClick={saveChanges}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-all"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== Bill Image Lightbox Modal ===== */}
      {viewingBillImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
          onClick={() => setViewingBillImage(null)}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={() => setViewingBillImage(null)}
              className="absolute top-4 right-4 text-white text-5xl hover:scale-110 transition-transform z-10"
              aria-label="Close"
            >
              ⨯
            </button>

            {/* Image Container */}
            <div
              className="max-w-full max-h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={viewingBillImage}
                alt="Bill"
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
            </div>

            {/* Mobile-friendly close hint */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-4 py-2 rounded-lg">
              Tap outside
            </div>
          </div>
        </div>
      )}

      {/* ===== Footer ===== */}
      {/* <footer className="mt-12 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} RealShop • Local & Trusted 🏪
      </footer> */}
    </div>
  );
}

export default MyOrders;
