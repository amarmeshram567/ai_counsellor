const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashed = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({ data: { name, email, password: hashed } });

        const token = jwt.sign(
            { id: user.id, currentStage: user.currentStage, onboardingComplete: user.onboardingComplete },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({ token });
    } catch (err) {
        res.status(400).json({ message: "Error creating user", error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(400).json({ message: "User not found" });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: user.id, currentStage: user.currentStage, onboardingComplete: user.onboardingComplete },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({ token, profile: user.name, message: "Login Successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};







