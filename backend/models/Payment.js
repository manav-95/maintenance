// models/Payment.js
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  society: { type: mongoose.Schema.Types.ObjectId, ref: "Society", required: true },
  title: { type: String, required: true },
  issueDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  amount: { type: Number, required: true },
  description: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // manager/admin
}, { timestamps: true });

export default mongoose.model("Payment", paymentSchema);
