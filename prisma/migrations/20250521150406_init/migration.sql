/*
  Warnings:

  - Changed the type of `score_earned` on the `Application` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `score` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `score_earned` on the `UserScoreLog` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "score_earned",
ADD COLUMN     "score_earned" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "score",
ADD COLUMN     "score" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UserScoreLog" DROP COLUMN "score_earned",
ADD COLUMN     "score_earned" INTEGER NOT NULL;
