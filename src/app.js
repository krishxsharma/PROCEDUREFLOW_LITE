const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/pr", require("./routes/purchaseRequestRoutes"));
app.use("/api/audit", require("./routes/auditRoutes"));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to ProcedureFlow Lite API" });
});

module.exports = app;
