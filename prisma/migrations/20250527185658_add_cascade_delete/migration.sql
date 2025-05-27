-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_positions_id_fkey";

-- DropForeignKey
ALTER TABLE "UserScoreLog" DROP CONSTRAINT "UserScoreLog_positions_id_fkey";

-- AlterTable
ALTER TABLE "Application" ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_positions_id_fkey" FOREIGN KEY ("positions_id") REFERENCES "Position"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserScoreLog" ADD CONSTRAINT "UserScoreLog_positions_id_fkey" FOREIGN KEY ("positions_id") REFERENCES "Position"("id") ON DELETE CASCADE ON UPDATE CASCADE;
