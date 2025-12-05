import express from "express";
import {
  addProduct,
  getProducts,
  deleteProduct,
  searchProducts,
  toggleAvailability, // 👈 new
} from "../controllers/productController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { uploadProductImage } from "../utils/fileUpload.js";

const router = express.Router();

// Public routes
router.get("/", getProducts);
router.get("/search", searchProducts);

// Admin routes - with error handling for multer
router.post(
  "/",
  protect,
  adminOnly,
  (req, res, next) => {
    uploadProductImage.single("image")(req, res, (err) => {
      if (err) {
        console.error("Multer/Upload error:", err.message);
        return res.status(400).json({ 
          message: err.message || "File upload failed. Please check the file format." 
        });
      }
      if (!req.file) {
        return res.status(400).json({ message: "Image file is required" });
      }
      next();
    });
  },
  addProduct
);
router.delete("/:id", protect, adminOnly, deleteProduct);
router.put("/:id/toggle", protect, adminOnly, toggleAvailability);

export default router;
