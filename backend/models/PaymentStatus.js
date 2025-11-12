// models/PaymentStatus.js
import mongoose from "mongoose";

const paymentStatusSchema = new mongoose.Schema({
  paymentId: { type: mongoose.Schema.Types.ObjectId, ref: "Payment", required: true },
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["pending", "paid"], default: "pending" },
  razorpayPaymentId: { type: String },
  amountPaid: { type: Number },
  paidAt: { type: Date }
}, { timestamps: true });

export default mongoose.model("PaymentStatus", paymentStatusSchema);
