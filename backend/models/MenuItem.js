import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["Starter", "Main Course", "Dessert", "Beverage"],
      required: true
    },
    price: { type: Number, required: true, min: 0 },
    availability: { type: Boolean, default: true },
    image: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("MenuItem", menuItemSchema);
