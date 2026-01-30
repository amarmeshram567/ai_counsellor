/*
  Warnings:

  - A unique constraint covering the columns `[userId,universityId]` on the table `Shortlist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `acceptanceChance` to the `University` table without a default value. This is not possible if the table is not empty.
  - Added the required column `applicationDeadline` to the `University` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `University` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `University` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ranking` to the `University` table without a default value. This is not possible if the table is not empty.
  - Added the required column `riskLevel` to the `University` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tuitionFee` to the `University` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `rankingTier` on the `University` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `competitionLevel` on the `University` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "RankingTier" AS ENUM ('TOP_10', 'TOP_25', 'TOP_50', 'TOP_100');

-- CreateEnum
CREATE TYPE "CompetitionLevel" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- CreateEnum
CREATE TYPE "RiskLevel" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "Shortlist" DROP CONSTRAINT "Shortlist_universityId_fkey";

-- DropForeignKey
ALTER TABLE "Shortlist" DROP CONSTRAINT "Shortlist_userId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_userId_fkey";

-- AlterTable
ALTER TABLE "University" ADD COLUMN     "acceptanceChance" INTEGER NOT NULL,
ADD COLUMN     "applicationDeadline" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "ranking" INTEGER NOT NULL,
ADD COLUMN     "riskLevel" "RiskLevel" NOT NULL,
ADD COLUMN     "tuitionFee" INTEGER NOT NULL,
DROP COLUMN "rankingTier",
ADD COLUMN     "rankingTier" "RankingTier" NOT NULL,
DROP COLUMN "competitionLevel",
ADD COLUMN     "competitionLevel" "CompetitionLevel" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Shortlist_userId_universityId_key" ON "Shortlist"("userId", "universityId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_lockedUniversityId_fkey" FOREIGN KEY ("lockedUniversityId") REFERENCES "University"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shortlist" ADD CONSTRAINT "Shortlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shortlist" ADD CONSTRAINT "Shortlist_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
