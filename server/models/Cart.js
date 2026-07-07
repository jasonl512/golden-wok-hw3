import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    menuItemId: String,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    image: String
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, unique: true },
    items: [cartItemSchema],
    total: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
