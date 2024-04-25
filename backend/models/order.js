import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    serviceType: { type: String, required: true }, // e.g., "Digital Goods" or "Tutoring Services"
    serviceName: { type: String, required: true },
    serviceDescription: { type: String },
    price: { type: Number, required: true },
    status: {
      type: String,
      required: true,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
    date: {
      type: Date,
      default: Date.now(),
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
