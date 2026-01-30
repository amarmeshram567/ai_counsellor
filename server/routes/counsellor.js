const express = require("express");
const counsellorRouter = express.Router();
const { authMiddleware, profileCheck } = require("../middleware/auth");
const counsellorController = require("../controllers/counsellorController");

counsellorRouter.post("/action", authMiddleware, profileCheck, counsellorController.aiAction);

module.exports = counsellorRouter;
