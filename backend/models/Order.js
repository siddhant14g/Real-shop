import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // ✅ Correct field name
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
    billImage: {
      type: String,
    },
  },
  { timestamps: true }
);

// ✅ Ensure model uses correct field name 'user'
export default mongoose.model("Order", orderSchema);
