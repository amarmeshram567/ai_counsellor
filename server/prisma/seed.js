const prisma = require("./prisma.config");
const { Pool } = require("pg");
require("dotenv").config();


const universities = [
    {
        name: 'Massachusetts Institute of Technology',
        country: 'USA',
        city: 'Cambridge, MA',
        ranking: 1,
        tuitionFee: 55000,
        acceptanceChance: 45,
        riskLevel: 'high',
        riskExplanation: 'Highly competitive with < 10% acceptance rate. Strong profile needed.',
        programs: ['MS Computer Science', 'MS Data Science', 'MS AI'],
        imageUrl: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800',
        applicationDeadline: '2025-12-15',
    },
    {
        name: 'Stanford University',
        country: 'USA',
        city: 'Stanford, CA',
        ranking: 3,
        tuitionFee: 57000,
        acceptanceChance: 42,
        riskLevel: 'high',
        riskExplanation: 'Elite institution with extremely competitive admissions.',
        programs: ['MS Computer Science', 'MS AI', 'MS HCI'],
        imageUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800',
        applicationDeadline: '2025-12-01',
    },
    {
        name: 'University of Toronto',
        country: 'Canada',
        city: 'Toronto, ON',
        ranking: 21,
        tuitionFee: 42000,
        acceptanceChance: 68,
        riskLevel: 'medium',
        riskExplanation: 'Good match for your profile. Moderate competition level.',
        programs: ['MSc Computer Science', 'MASc Engineering', 'MSc Data Science'],
        imageUrl: 'https://images.unsplash.com/photo-1569982175971-d92b01cf8694?w=800',
        applicationDeadline: '2025-01-15',
    },
    {
        name: 'University of British Columbia',
        country: 'Canada',
        city: 'Vancouver, BC',
        ranking: 34,
        tuitionFee: 38000,
        acceptanceChance: 72,
        riskLevel: 'low',
        riskExplanation: 'Strong match! Your profile aligns well with their requirements.',
        programs: ['MSc Computer Science', 'MEng Software Engineering'],
        imageUrl: 'https://images.unsplash.com/photo-1520038410233-7141be7e6f97?w=800',
        applicationDeadline: '2025-02-01',
    },
    {
        name: 'Imperial College London',
        country: 'UK',
        city: 'London',
        ranking: 8,
        tuitionFee: 45000,
        acceptanceChance: 55,
        riskLevel: 'medium',
        riskExplanation: 'Competitive but achievable with strong GRE and research experience.',
        programs: ['MSc Computing', 'MSc AI', 'MSc Machine Learning'],
        imageUrl: 'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=800',
        applicationDeadline: '2025-01-31',
    },
    {
        name: 'University of Edinburgh',
        country: 'UK',
        city: 'Edinburgh',
        ranking: 22,
        tuitionFee: 35000,
        acceptanceChance: 70,
        riskLevel: 'low',
        riskExplanation: 'Good fit! Strong research programs with reasonable acceptance rates.',
        programs: ['MSc Computer Science', 'MSc AI', 'MSc Data Science'],
        imageUrl: 'https://images.unsplash.com/photo-1508628011525-a9b8b24f4c68?w=800',
        applicationDeadline: '2025-03-01',
    },
    {
        name: 'ETH Zurich',
        country: 'Switzerland',
        city: 'Zurich',
        ranking: 9,
        tuitionFee: 1500,
        acceptanceChance: 50,
        riskLevel: 'medium',
        riskExplanation: 'Low tuition but competitive. Strong technical background needed.',
        programs: ['MSc Computer Science', 'MSc Data Science', 'MSc Robotics'],
        imageUrl: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800',
        applicationDeadline: '2025-12-15',
    },
    {
        name: 'Technical University of Munich',
        country: 'Germany',
        city: 'Munich',
        ranking: 30,
        tuitionFee: 500,
        acceptanceChance: 65,
        riskLevel: 'low',
        riskExplanation: 'Excellent value with no tuition. Good match for your profile.',
        programs: ['MSc Informatics', 'MSc Data Engineering', 'MSc Robotics'],
        imageUrl: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800',
        applicationDeadline: '2025-05-31',
    },
    {
        name: 'National University of Singapore',
        country: 'Singapore',
        city: 'Singapore',
        ranking: 11,
        tuitionFee: 38000,
        acceptanceChance: 60,
        riskLevel: 'medium',
        riskExplanation: 'Strong CS program with moderate competition. Good research opportunities.',
        programs: ['MSc Computer Science', 'MSc AI', 'MSc Business Analytics'],
        imageUrl: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800',
        applicationDeadline: '2025-01-31',
    },
    {
        name: 'University of Melbourne',
        country: 'Australia',
        city: 'Melbourne',
        ranking: 33,
        tuitionFee: 40000,
        acceptanceChance: 75,
        riskLevel: 'low',
        riskExplanation: 'Strong safety school. Good job market and post-study work options.',
        programs: ['MSc Computer Science', 'MSc Data Science', 'MSc IT'],
        imageUrl: 'https://images.unsplash.com/photo-1514395462725-fb4566210144?w=800',
        applicationDeadline: '2026-10-31',
    },
];



const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function clearTables() {
    const client = await pool.connect();
    try {
        console.log("🌱 Clearing tables with raw PG client...");
        await client.query('TRUNCATE TABLE "Shortlist" CASCADE;');
        await client.query('TRUNCATE TABLE "TimelineEvent" CASCADE;');
        await client.query('TRUNCATE TABLE "Task" CASCADE;');
        await client.query('TRUNCATE TABLE "University" CASCADE;');
        await client.query('TRUNCATE TABLE "User" CASCADE;');
        console.log("✅ Tables cleared");
    } finally {
        client.release();
    }
}

async function seedUniversities(prisma, universities) {
    console.log("🌱 Seeding universities...");

    const data = universities.map((uni) => ({
        name: uni.name,
        country: uni.country,
        city: uni.city,
        ranking: uni.ranking,
        tuitionFee: uni.tuitionFee,
        avgCost: uni.tuitionFee,
        acceptanceChance: uni.acceptanceChance,
        riskLevel: uni.riskLevel.toUpperCase(),
        imageUrl: uni.imageUrl,
        applicationDeadline: new Date(uni.applicationDeadline),
        rankingTier:
            uni.ranking <= 10
                ? "TOP_10"
                : uni.ranking <= 25
                    ? "TOP_25"
                    : uni.ranking <= 50
                        ? "TOP_50"
                        : "TOP_100",
        competitionLevel:
            uni.acceptanceChance < 50
                ? "HIGH"
                : uni.acceptanceChance < 70
                    ? "MEDIUM"
                    : "LOW",
    }));

    await prisma.university.createMany({ data });
    console.log("✅ Universities seeded successfully");
}

async function seed(prisma, universities) {
    try {
        await clearTables();
        await seedUniversities(prisma, universities);
    } catch (err) {
        console.error("❌ Seeding failed:", err);
    } finally {
        await prisma.$disconnect();
        await pool.end();
    }
}

// ✅ Call the seed function immediately
seed(prisma, universities);
