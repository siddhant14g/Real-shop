import mongoose from "mongoose";

const advertisementSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    caption: { type: String }, // optional, for future
  },
  { timestamps: true }
);

export default mongoose.model("Advertisement", advertisementSchema);
