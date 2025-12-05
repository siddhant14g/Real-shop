import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// Cloudinary storage configuration for products
const productStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "realshop_uploads/products",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

// Cloudinary storage configuration for bill images
const billStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "realshop_uploads/bills",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

// Cloudinary storage configuration for advertisements
const advertisementStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "realshop_uploads/advertisements",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const fileFilter = (req, file, cb) => {
  // Check file mimetype and extension
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const allowedExtensions = /\.(jpeg|jpg|png|webp)$/i;
  
  if (allowedMimeTypes.includes(file.mimetype) || allowedExtensions.test(file.originalname)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (jpeg, jpg, png, webp) are allowed!"), false);
  }
};

export const uploadProductImage = multer({ storage: productStorage, fileFilter });
export const uploadBillImage = multer({ storage: billStorage, fileFilter });
export const uploadAdvertisementImage = multer({ storage: advertisementStorage, fileFilter });
