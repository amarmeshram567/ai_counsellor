const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getTasks = async (req, res) => {
    const tasks = await prisma.task.findMany({ where: { userId: req.user.id } });
    res.json(tasks);
};

exports.addTask = async (req, res) => {
    const { title, stage } = req.body;
    const task = await prisma.task.create({ data: { userId: req.user.id, title, stage } });
    res.json(task);
};

exports.markTaskDone = async (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        if (isNaN(taskId)) return res.status(400).json({ message: "Invalid task ID" });

        // 1️⃣ Update task to DONE
        const task = await prisma.task.update({
            where: { id: taskId },
            data: { status: "DONE" }
        });

        // 2️⃣ Check if all tasks in this stage are done
        const pendingTasks = await prisma.task.count({
            where: { userId: req.user.id, stage: task.stage, status: "PENDING" }
        });

        if (pendingTasks === 0) {
            // 3️⃣ Fetch current stage from DB (not JWT)
            const user = await prisma.user.findUnique({
                where: { id: req.user.id },
                select: { currentStage: true }
            });

            // 4️⃣ Only increment if stage matches
            if (user.currentStage === task.stage) {
                await prisma.user.update({
                    where: { id: req.user.id },
                    data: { currentStage: user.currentStage + 1 }
                });
            }
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

