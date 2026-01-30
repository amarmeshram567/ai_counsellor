const express = require("express");
const taskRouter = express.Router();
const { authMiddleware } = require("../middleware/auth");
const taskController = require("../controllers/taskController");

taskRouter.get("/", authMiddleware, taskController.getTasks);
taskRouter.post("/", authMiddleware, taskController.addTask);
taskRouter.patch("/:id", authMiddleware, taskController.markTaskDone);


module.exports = taskRouter;
