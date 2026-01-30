const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];

    // console.log(token)

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

function stageCheck(requiredStage) {
    return async (req, res, next) => {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: { currentStage: true }
        });

        if (user.currentStage < requiredStage) {
            return res.status(403).json({
                message: "Stage locked. Complete previous stage first."
            });
        }

        next();
    };
}

async function profileCheck(req, res, next) {
    const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        select: {
            onboardingComplete: true,
            currentStage: true
        }
    });

    if (!user || !user.onboardingComplete) {
        return res.status(403).json({ message: "Complete onboarding first." });
    }

    req.user.currentStage = user.currentStage; // sync
    next();
}

module.exports = { authMiddleware, stageCheck, profileCheck };
