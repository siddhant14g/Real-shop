import express from "express";
import {
  placeOrder,
  getMyOrders,
  updateOrder,
  deleteOrder,
  getAllOrders,
  updateOrderStatus,
  uploadOrderBill,
} from "../controllers/orderController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { uploadBillImage } from "../utils/fileUpload.js";

const router = express.Router();

// ===== CLIENT ROUTES =====
router.post("/", protect, placeOrder);
router.get("/my-orders", protect, getMyOrders);
router.put("/:id", protect, updateOrder);
router.delete("/:id", protect, deleteOrder);

// ===== ADMIN ROUTES =====
router.get("/", protect, adminOnly, getAllOrders);
router.put("/:id/status", protect, adminOnly, updateOrderStatus);
router.post("/:id/bill", protect, adminOnly, uploadBillImage.single("billImage"), uploadOrderBill);

export default router;
