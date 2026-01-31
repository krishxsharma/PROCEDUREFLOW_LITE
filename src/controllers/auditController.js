const AuditLog = require("../models/AuditLog");

exports.getLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find().populate("performedBy", "username email role").sort({ createdAt: -1 });
    res.json({ success: true, data: logs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
