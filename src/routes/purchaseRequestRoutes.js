const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middlewares/authMiddleware");
const { createPR, getAllPRs, submitPR, approvePR } = require("../controllers/purchaseRequestController");

router.post("/", protect, authorize("employee", "manager"), createPR);
router.get("/", protect, getAllPRs);
router.put("/:id/submit", protect, authorize("employee"), submitPR);
router.put("/:id/approve", protect, authorize("manager"), approvePR);

module.exports = router;
