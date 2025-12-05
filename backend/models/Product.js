import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      required: true, // Product image is mandatory
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // The admin who added it
    },
     // ✅ New field
    available: {
      type: Boolean,
      default: true, // by default all new products are available
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
