const express = require("express");
const dashboardRouter = express.Router();
const { authMiddleware } = require("../middleware/auth");
const dashboardController = require("../controllers/dashboardController");

dashboardRouter.get("/", authMiddleware, dashboardController.getDashboard);

module.exports = dashboardRouter;
