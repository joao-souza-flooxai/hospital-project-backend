/*
  Warnings:

  - You are about to drop the column `score_earned` on the `Application` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "score_earned";

-- AlterTable
ALTER TABLE "Position" ADD COLUMN     "score" INTEGER NOT NULL DEFAULT 0;
