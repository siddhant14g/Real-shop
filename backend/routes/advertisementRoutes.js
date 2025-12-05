import express from "express";
import {
  addAdvertisement,
  getAdvertisements,
  deleteAdvertisement,
} from "../controllers/advertisementController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { uploadAdvertisementImage } from "../utils/fileUpload.js";

const router = express.Router();

// Admin routes
router.post("/", protect, adminOnly, uploadAdvertisementImage.single("image"), addAdvertisement);
router.delete("/:id", protect, adminOnly, deleteAdvertisement);

// Public route
router.get("/", getAdvertisements);

export default router;
