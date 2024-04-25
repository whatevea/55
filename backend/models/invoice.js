const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    invoiceNumber: { type: String, required: true, unique: true },
    invoiceDate: { type: Date, default: Date.now(), required: true },
    paymentMethod: {
      type: String,
      enum: ["creditCard", "bankTransfer", "paypal"],
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    amount: { type: Number, required: true },
    commission: { type: Number, required: true },
    freelancerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Freelancer",
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
  },
  { timestamps: true }
);

const Invoice =
  mongoose.models.Invoice || mongoose.model("Invoice", invoiceSchema);

export default Invoice;
