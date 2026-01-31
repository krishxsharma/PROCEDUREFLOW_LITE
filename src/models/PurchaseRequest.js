const mongoose = require("mongoose");

const purchaseRequestSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true, min: 0 },
  requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["draft", "pending", "approved", "rejected"], default: "draft" },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  approvedAt: { type: Date },
  priority: { type: String, enum: ["low", "medium", "high", "urgent"], default: "medium" },
  department: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("PurchaseRequest", purchaseRequestSchema);
