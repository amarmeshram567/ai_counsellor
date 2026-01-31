const prisma = require("../prisma/prisma.config");


exports.getDashboard = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        include: { profile: true, tasks: true, shortlist: true }
    });

    const profileStrength = user.profile ? 100 : 0;

    res.json({
        name: user.name,
        currentStage: user.currentStage,
        onboardingComplete: user.onboardingComplete,
        profileStrength,
        tasks: user.tasks,
        shortlist: user.shortlist
    });
};
