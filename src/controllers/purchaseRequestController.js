const PurchaseRequest = require("../models/PurchaseRequest");
const auditService = require("../services/auditService");

exports.createPR = async (req, res) => {
  try {
    const pr = await PurchaseRequest.create({ ...req.body, requestedBy: req.user._id, status: "draft" });

    await auditService.logAudit({ action: "CREATE_PR", entityType: "PurchaseRequest", entityId: pr._id, performedBy: req.user._id, details: { title: pr.title, amount: pr.amount } });

    res.status(201).json({ success: true, data: pr });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllPRs = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === "employee") { query.requestedBy = req.user._id; }

    const prs = await PurchaseRequest.find(query).populate("requestedBy", "username email").sort({ createdAt: -1 });
    res.json({ success: true, data: prs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.submitPR = async (req, res) => {
  try {
    const pr = await PurchaseRequest.findById(req.params.id);

    if (!pr) { return res.status(404).json({ success: false, message: "Purchase Request not found" }); }
    if (pr.requestedBy.toString() !== req.user._id.toString()) { return res.status(403).json({ success: false, message: "Not authorized to submit this PR" }); }

    pr.status = "pending";
    await pr.save();

    await auditService.logAudit({ action: "SUBMIT_PR", entityType: "PurchaseRequest", entityId: pr._id, performedBy: req.user._id, details: { status: "pending" } });

    res.json({ success: true, data: pr });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.approvePR = async (req, res) => {
  try {
    const pr = await PurchaseRequest.findById(req.params.id);

    if (!pr) { return res.status(404).json({ success: false, message: "Purchase Request not found" }); }
    if (pr.status !== "pending") { return res.status(400).json({ success: false, message: "PR is not pending approval" }); }

    pr.status = "approved";
    pr.approvedBy = req.user._id;
    pr.approvedAt = new Date();
    await pr.save();

    await auditService.logAudit({ action: "APPROVE_PR", entityType: "PurchaseRequest", entityId: pr._id, performedBy: req.user._id, details: { status: "approved" } });

    res.json({ success: true, data: pr });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
