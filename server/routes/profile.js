const express = require("express");
const profileRouter = express.Router();
const { authMiddleware, profileCheck, stageCheck } = require("../middleware/auth");
const profileController = require("../controllers/profileController");

profileRouter.post("/", authMiddleware, profileController.updateProfile);
profileRouter.get("/", authMiddleware, profileController.getProfile);
profileRouter.get("/me", authMiddleware, profileCheck, profileController.getUser)


module.exports = profileRouter;
