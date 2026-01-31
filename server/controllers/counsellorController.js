const prisma = require("../prisma/prisma.config");


exports.aiAction = async (req, res) => {
    try {
        const { stage } = req.body;

        // 1️⃣ Fetch actual user stage from DB
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: { currentStage: true }
        });

        if (stage !== user.currentStage) {
            return res.status(400).json({ message: "Stage mismatch" });
        }

        // 2️⃣ Mock AI output
        const aiOutput = {
            message: "AI recommends adding a task and shortlisting a university.",
            actions: [
                {
                    type: "ADD_TASK",
                    title: "Research universities for Computer Science",
                    stage
                },
                {
                    type: "SHORTLIST_UNIVERSITY",
                    universityId: "UUID_HERE", // must be real UUID
                    category: "TARGET"
                }
            ]
        };

        // 3️⃣ Execute actions safely (transaction)
        await prisma.$transaction(async (tx) => {
            for (const action of aiOutput.actions) {
                if (action.type === "ADD_TASK") {
                    await tx.task.create({
                        data: {
                            userId: req.user.id,
                            title: action.title,
                            stage
                        }
                    });
                }

                if (action.type === "SHORTLIST_UNIVERSITY") {
                    const exists = await tx.shortlist.findUnique({
                        where: {
                            userId_universityId: {
                                userId: req.user.id,
                                universityId: action.universityId
                            }
                        }
                    });

                    if (!exists) {
                        await tx.shortlist.create({
                            data: {
                                userId: req.user.id,
                                universityId: action.universityId,
                                category: action.category
                            }
                        });
                    }
                }
            }

            // 4️⃣ Advance stage if needed
            await tx.user.update({
                where: { id: req.user.id },
                data: { currentStage: stage + 1 }
            });
        });

        res.json(aiOutput);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

