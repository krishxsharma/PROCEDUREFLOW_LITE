const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema({
  action: { type: String, required: true, enum: ["CREATE_PR", "SUBMIT_PR", "APPROVE_PR", "REJECT_PR", "LOGIN", "LOGOUT"] },
  entityType: { type: String, required: true, enum: ["PurchaseRequest", "User", "RFQ"] },
  entityId: { type: mongoose.Schema.Types.ObjectId, required: true },
  performedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  details: { type: mongoose.Schema.Types.Mixed },
  ipAddress: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("AuditLog", auditLogSchema);
