const express = require("express");
const { authMiddleware, profileCheck } = require("../middleware/auth");
const { prisma } = require('@prisma/client'); // or wherever prisma is exported


const timelineRouter = express.Router()



timelineRouter.get('/', authMiddleware, profileCheck, async (req, res) => {
    // const { stage, universityId } = req.query;

    // const events = await prisma.timelineEvent.findMany({
    //     where: {
    //         stage: Number(stage),
    //         universityId: Number(universityId),
    //     },
    //     orderBy: { date: 'asc' },
    // });

    // res.json(events);
});


module.exports = timelineRouter
