/*
  Warnings:

  - Added the required column `projectId` to the `Member_Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taskType` to the `Member_Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Member_Task" ADD COLUMN     "projectId" TEXT NOT NULL,
ADD COLUMN     "taskType" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Member_Task" ADD CONSTRAINT "Member_Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
