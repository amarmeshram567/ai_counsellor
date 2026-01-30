const express = require("express");
const universitiesRouter = express.Router();
const { authMiddleware, profileCheck } = require("../middleware/auth");
const universityController = require("../controllers/universityController");

universitiesRouter.get("/", authMiddleware, profileCheck, universityController.getUniversities);
universitiesRouter.post("/shortlist/add", authMiddleware, profileCheck, universityController.addToShortlist);
universitiesRouter.delete("/shortlist/remove", authMiddleware, profileCheck, universityController.removeFromShortlist);
universitiesRouter.post("/shortlist/lock", authMiddleware, profileCheck, universityController.lockUniversity);
universitiesRouter.post("/shortlist/unlock", authMiddleware, profileCheck, universityController.unlockUniversity);
universitiesRouter.get("/shortlist/locked", authMiddleware, universityController.getLockedUniversity)
universitiesRouter.get("/shortlist", authMiddleware, universityController.getShortlist)

universitiesRouter.get("/stage", authMiddleware, universityController.getCurrentStage)
universitiesRouter.patch("/stage", authMiddleware, universityController.updateCurrentStage)


module.exports = universitiesRouter;
