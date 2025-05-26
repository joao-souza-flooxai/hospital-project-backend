-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_action_by_admin_fkey";

-- AlterTable
ALTER TABLE "Application" ALTER COLUMN "action_by_admin" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_action_by_admin_fkey" FOREIGN KEY ("action_by_admin") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
