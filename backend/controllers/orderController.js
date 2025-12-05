import Order from "../models/Order.js";
import Product from "../models/Product.js";

// 🛒 Place new order
export const placeOrder = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    const order = await Order.create({
      user: req.user.id,
      items: items.map((i) => ({
        productId: i.productId,
        quantity: i.quantity,
      })),
    });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Create order error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// 📦 Get logged-in client's orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("items.productId", "name description imageUrl")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("Get orders error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ✏️ Update order (client can modify before delivery)
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { items } = req.body;

    const order = await Order.findById(id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    // Only owner can modify
    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Cannot edit completed orders
    if (order.status === "Completed") {
      return res.status(400).json({ message: "Order already completed" });
    }

    order.items = items;
    await order.save();

    res.json({ message: "Order updated successfully", order });
  } catch (error) {
    console.error("Update order error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ❌ Delete order (client can cancel before delivery)
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (order.status === "Completed") {
      return res
        .status(400)
        .json({ message: "Cannot delete a completed order" });
    }

    await order.deleteOne();
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Delete order error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// 🧾 Get all orders (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.productId", "name description imageUrl")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("Admin fetch orders error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// 🚚 Update order status (Admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (error) {
    console.error("Update status error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// 📤 Upload bill image (Admin)
export const uploadOrderBill = async (req, res) => {
  try {
    const { id } = req.params;
    const imageUrl = req.file ? req.file.path : null;

    if (!imageUrl) return res.status(400).json({ message: "No image uploaded" });

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.billImage = imageUrl;
    await order.save();

    res.json({ message: "Bill image uploaded", order });
  } catch (error) {
    console.error("Upload bill error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
