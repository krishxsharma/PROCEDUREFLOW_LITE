const AuditLog = require("../models/AuditLog");

exports.logAudit = async ({ action, entityType, entityId, performedBy, details }) => {
  try {
    const log = await AuditLog.create({ action, entityType, entityId, performedBy, details });
    return log;
  } catch (error) {
    console.error("Audit logging error:", error);
  }
};

exports.getAuditLogs = async () => {
  try {
    return await AuditLog.find().populate("performedBy", "username email role").sort({ createdAt: -1 });
  } catch (error) {
    console.error("Error fetching audit logs:", error);
    throw error;
  }
};
