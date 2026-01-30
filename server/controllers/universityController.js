const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * GET universities based on profile
 */

exports.getUniversities = async (req, res) => {
    try {
        const profile = await prisma.profile.findUnique({
            where: { userId: req.user.id }
        });

        if (!profile) {
            return res.status(400).json({ message: "Profile not completed" });
        }

        // Parse max budget safely
        const extractMaxBudget = (range) => {
            if (!range) return null;
            const numbers = range.match(/\d+/g);
            if (!numbers) return null;
            return Math.max(...numbers.map(Number)) * 1000;
        };

        const maxBudget = extractMaxBudget(profile.budgetRange);
        if (!maxBudget) {
            return res.status(400).json({ message: "Invalid budget range" });
        }

        const countries = Array.isArray(profile.countries)
            ? profile.countries
            : [profile.countries];

        if (!countries.length) {
            return res.status(400).json({ message: "No countries selected" });
        }

        // ✅ Fetch universities directly from Prisma
        const universities = await prisma.university.findMany({
            where: {
                country: { in: countries },
                avgCost: { lte: maxBudget }
            }
        });

        // ✅ Add frontend-only computed fields WITHOUT removing DB fields
        const result = universities.map((u) => {
            let category = "TARGET";
            if (u.acceptanceChance < 40) category = "DREAM";
            else if (u.acceptanceChance >= 70) category = "SAFE";

            return {
                ...u, // ✅ SEND FULL PRISMA STRUCTURE
                cost: `$${u.avgCost.toLocaleString()}`,
                category
            };
        });

        res.json(result);
    } catch (error) {
        console.error("GET UNIVERSITIES ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};



/**
 * ADD to shortlist
 */
exports.addToShortlist = async (req, res) => {
    try {
        const { universityId, category = "TARGET" } = req.body;

        if (!universityId) {
            return res.status(400).json({ message: "universityId is required" });
        }

        // Check university exists
        const universityExists = await prisma.university.findUnique({
            where: { id: universityId }
        });

        if (!universityExists) {
            return res.status(400).json({ message: "University not found" });
        }

        // Check if already shortlisted
        const exists = await prisma.shortlist.findFirst({
            where: {
                userId: req.user.id,
                universityId
            }
        });

        if (exists) {
            return res.status(400).json({ message: "Already shortlisted" });
        }

        // Create shortlist entry
        const shortlist = await prisma.shortlist.create({
            data: {
                userId: req.user.id,
                universityId,
                category,
                locked: false
            }
        });

        // Update user stage
        await prisma.user.update({
            where: { id: req.user.id },
            data: { currentStage: 3 }
        });

        res.json(shortlist);
    } catch (error) {
        console.error("SHORTLIST ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};

/**
 * REMOVE from shortlist
 */
exports.removeFromShortlist = async (req, res) => {
    try {
        const { universityId } = req.body;

        await prisma.shortlist.delete({
            where: {
                userId_universityId: {
                    userId: req.user.id,
                    universityId
                }
            }
        });

        // check remaining shortlist
        const remaining = await prisma.shortlist.count({
            where: { userId: req.user.id }
        });

        // if no universities shortlisted, move back to DISCOVER
        if (remaining === 0) {
            await prisma.user.update({
                where: { id: req.user.id },
                data: { currentStage: 2 }
            });
        }

        res.json({ message: "Removed from shortlist" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


/**
 * GET current user's shortlist
 */
exports.getShortlist = async (req, res) => {
    try {
        const shortlist = await prisma.shortlist.findMany({
            where: { userId: req.user.id },
            include: {
                university: true, // ✅ Include full university info
            },
        });

        // Map to format data for frontend
        const result = shortlist.map((item) => ({
            id: item.university.id,
            name: item.university.name,
            country: item.university.country,
            city: item.university.city,
            ranking: item.university.ranking,
            tuitionFee: item.university.tuitionFee,
            avgCost: item.university.avgCost,
            acceptanceChance: item.university.acceptanceChance,
            riskLevel: item.university.riskLevel,
            riskExplanation: item.university.riskExplanation,
            programs: item.university.programs,
            imageUrl: item.university.imageUrl,
            applicationDeadline: item.university.applicationDeadline,
            rankingTier: item.university.rankingTier,
            competitionLevel: item.university.competitionLevel,
            category: item.category, // from shortlist table
            locked: item.locked,     // from shortlist table
            cost: `$${item.university.avgCost.toLocaleString()}`, // formatted
        }));

        res.json(result);
    } catch (error) {
        console.error("GET SHORTLIST ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};


/**
 * LOCK university (Finalize)
 */
exports.lockUniversity = async (req, res) => {
    try {
        const { universityId } = req.body;

        // unlock all first
        await prisma.shortlist.updateMany({
            where: { userId: req.user.id },
            data: { locked: false }
        });

        // lock selected
        const locked = await prisma.shortlist.update({
            where: {
                userId_universityId: {
                    userId: req.user.id,
                    universityId
                }
            },
            data: { locked: true }
        });

        await prisma.user.update({
            where: { id: req.user.id },
            data: {
                currentStage: 4,
                lockedUniversityId: universityId
            }
        });

        res.json({ message: "University locked", locked });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * UNLOCK university (Back to shortlist)
 */
exports.unlockUniversity = async (req, res) => {
    try {
        const { universityId } = req.body;


        console.log("BODY:", req.body);
        console.log("HEADERS:", req.headers["content-type"]);


        if (!universityId) {
            return res.status(400).json({ message: "universityId is required" });
        }

        if (!req.body) {
            return res.status(400).json({ message: "Request body is missing" });
        }

        // Check if this university is actually locked by the user
        const shortlistEntry = await prisma.shortlist.findFirst({
            where: {
                userId: req.user.id,
                universityId,
                locked: true
            }
        });

        if (!shortlistEntry) {
            return res.status(400).json({ message: "This university is not locked" });
        }

        // Unlock the university
        await prisma.shortlist.updateMany({
            where: {
                userId: req.user.id,
                universityId
            },
            data: { locked: false }
        });

        // Reset user stage and lockedUniversityId
        await prisma.user.update({
            where: { id: req.user.id },
            data: {
                currentStage: 3,
                lockedUniversityId: null
            }
        });

        res.json({ message: "University unlocked successfully" });
    } catch (error) {
        console.error("UNLOCK ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};


/**
 * GET the user's locked university
 */
exports.getLockedUniversity = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            include: {
                lockedUniversity: true, // ✅ include full university info
            },
        });

        if (!user.lockedUniversity) {
            return res.status(404).json({ message: "No university locked yet" });
        }

        const u = user.lockedUniversity;

        // Map to format data like your seed structure
        const result = {
            id: u.id,
            name: u.name,
            country: u.country,
            city: u.city,
            ranking: u.ranking,
            tuitionFee: u.tuitionFee,
            avgCost: u.avgCost,
            acceptanceChance: u.acceptanceChance,
            riskLevel: u.riskLevel,
            riskExplanation: u.riskExplanation,
            programs: u.programs,
            imageUrl: u.imageUrl,
            applicationDeadline: u.applicationDeadline,
            rankingTier: u.rankingTier,
            competitionLevel: u.competitionLevel,
            cost: `$${u.avgCost.toLocaleString()}`, // formatted
        };

        res.json(result);
    } catch (error) {
        console.error("GET LOCKED UNIVERSITY ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};



exports.getCurrentStage = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: { currentStage: true }
        });

        res.json({ currentStage: user.currentStage });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateCurrentStage = async (req, res) => {
    try {
        const { stage } = req.body;

        await prisma.user.update({
            where: { id: req.user.id },
            data: { currentStage: stage }
        });

        res.json({ message: "Stage updated", stage });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

