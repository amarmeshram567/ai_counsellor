const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getProfile = async (req, res) => {
    try {
        const profile = await prisma.profile.findUnique({
            where: { userId: req.user.id },
        });
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.updateProfile = async (req, res) => {
    try {
        const data = req.body;

        const requiredFields = [
            'educationLevel',
            'major',
            'graduationYear',
            'targetDegree',
            'field',
            'intakeYear',
            'countries',
            'budgetRange',
            'fundingType',
            'ieltsStatus',
            'greStatus',
            'sopStatus',
        ];

        for (const field of requiredFields) {
            if (
                data[field] === undefined ||
                data[field] === null ||
                data[field] === ''
            ) {
                return res.status(400).json({
                    message: `Required field missing: ${field}`,
                });
            }
        }

        const profile = await prisma.profile.upsert({
            where: { userId: req.user.id },
            update: data,
            create: {
                ...data,
                userId: req.user.id,
            },
        });

        await prisma.user.update({
            where: { id: req.user.id },
            data: {
                onboardingComplete: true,
                currentStage: 2,
            },
        });

        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        const userId = req.user.id; // from token

        if (!userId) {
            return res.status(400).json({ message: "Invalid token payload" });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                currentStage: true,
                onboardingComplete: true,
                lockedUniversityId: true,
                profile: true, // <-- include profile
            },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ user });
    } catch (err) {
        console.error("Error fetching user:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};
