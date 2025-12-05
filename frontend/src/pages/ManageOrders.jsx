import { useEffect, useState } from "react";
import api from "../utils/api";

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [billImage, setBillImage] = useState({});
  const [viewingBillImage, setViewingBillImage] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const markOrderComplete = async (id) => {
    try {
      await api.put(`/orders/${id}/status`, { status: "Completed" });
      fetchOrders();
      alert("✅ Order marked as completed");
    } catch {
      alert("Failed to update order");
    }
  };

  const uploadBill = async (orderId) => {
    try {
      const formData = new FormData();
      formData.append("billImage", billImage[orderId]);
      await api.post(`/orders/${orderId}/bill`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchOrders();
      alert("✅ Bill uploaded successfully");
    } catch {
      alert("Failed to upload bill");
    }
  };

  const formatDate = (d) =>
    new Date(d).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

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
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        🧾 Manage Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders yet.</p>
      ) : (
        <div className="max-w-5xl mx-auto space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-5 rounded-lg shadow-md border"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-gray-800">
                  {order.user?.name || "Client"} —{" "}
                  <span
                    className={`${
                      order.status === "Completed"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </span>
                {order.status !== "Completed" && (
                  <button
                    onClick={() => markOrderComplete(order._id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
                  >
                    Mark Complete
                  </button>
                )}
              </div>

              <p className="text-sm text-gray-500 mb-2">
                Placed: {formatDate(order.createdAt)} <br />
                Updated: {formatDate(order.updatedAt)}
              </p>

              <ul className="space-y-1">
                {order.items.map((i, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>{i.productId?.name || "Deleted Product"}</span>
                    <span className="text-gray-600">Qty: {i.quantity}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-3">
                <label className="text-gray-700 font-medium block mb-1">
                  Upload Bill:
                </label>
                <div className="flex gap-3 items-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setBillImage({
                        ...billImage,
                        [order._id]: e.target.files[0],
                      })
                    }
                    className="border p-2 rounded w-full"
                  />
                  <button
                    onClick={() => uploadBill(order._id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                  >
                    Upload
                  </button>
                </div>
                {order.billImage && (
                  <img
                    src={order.billImage}
                    alt="Bill"
                    onClick={() => setViewingBillImage(order.billImage)}
                    className="w-32 mt-3 rounded border cursor-pointer hover:scale-105 transition-transform shadow-sm hover:shadow-md"
                  />
                )}
              </div>
            </div>
          ))}
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
              className="absolute top-4 right-4 text-white text-4xl hover:scale-110 transition-transform z-10"
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
    </div>
  );
}

export default ManageOrders;
