/*
  Warnings:

  - You are about to drop the `Positions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_positions_id_fkey";

-- DropForeignKey
ALTER TABLE "Positions" DROP CONSTRAINT "Positions_created_by_admin_fkey";

-- DropForeignKey
ALTER TABLE "Positions" DROP CONSTRAINT "Positions_hospital_id_fkey";

-- DropForeignKey
ALTER TABLE "UserScoreLog" DROP CONSTRAINT "UserScoreLog_positions_id_fkey";

-- DropTable
DROP TABLE "Positions";

-- CreateTable
CREATE TABLE "Position" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "title" TEXT NOT NULL,
    "type" "Type" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hospital_id" TEXT NOT NULL,
    "created_by_admin" TEXT NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_created_by_admin_fkey" FOREIGN KEY ("created_by_admin") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_positions_id_fkey" FOREIGN KEY ("positions_id") REFERENCES "Position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserScoreLog" ADD CONSTRAINT "UserScoreLog_positions_id_fkey" FOREIGN KEY ("positions_id") REFERENCES "Position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
