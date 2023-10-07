/*
  Warnings:

  - Added the required column `userId` to the `Manager` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Manager" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "userId" TEXT NOT NULL;
