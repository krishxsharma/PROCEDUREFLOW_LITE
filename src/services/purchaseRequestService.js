const PurchaseRequest = require("../models/PurchaseRequest");
const auditService = require("./auditService");
const rfqService = require("./rfqService");

exports.createPR = async (data, userId) => {
  return await PurchaseRequest.create({
    ...data,
    createdBy: userId,
  });
};

exports.submitPR = async (prId, user) => {
  const pr = await PurchaseRequest.findById(prId);

  if (!pr) throw new Error("PR not found");

  if (pr.status !== "DRAFT") {
    throw new Error("Only draft PRs can be submitted");
  }

  if (pr.createdBy.toString() !== user.id) {
    throw new Error("Unauthorized");
  }

  pr.status = "SUBMITTED";
  await pr.save();

  await auditService.log({
    entity: "PurchaseRequest",
    entityId: pr._id,
    action: "SUBMITTED",
    performedBy: user.id,
  });

  return pr;
};

exports.approvePR = async (prId, user) => {
  const pr = await PurchaseRequest.findById(prId);

  if (!pr) throw new Error("PR not found");

  if (pr.status !== "SUBMITTED") {
    throw new Error("PR must be submitted before approval");
  }

  // BUSINESS RULE
  if (pr.amount >= 50000 && user.role !== "APPROVER") {
    throw new Error("Final approval required");
  }

  pr.status = "APPROVED";
  pr.approvedBy = user.id;
  await pr.save();

  await auditService.log({
    entity: "PurchaseRequest",
    entityId: pr._id,
    action: "APPROVED",
    performedBy: user.id,
  });

  // BUSINESS EVENT
  await rfqService.createRFQ(pr._id, user.id);

  return pr;
};
