/*
  Warnings:

  - The values [Bakc_End] on the enum `MemberRole` will be removed. If these variants are still used in the database, this will fail.
  - Changed the type of `hourlyRate` on the `Member` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `estimatedLength` on the `Task` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MemberRole_new" AS ENUM ('Front_End', 'Back_End', 'PO', 'QA');
ALTER TABLE "Member" ALTER COLUMN "memberRole" TYPE "MemberRole_new" USING ("memberRole"::text::"MemberRole_new");
ALTER TYPE "MemberRole" RENAME TO "MemberRole_old";
ALTER TYPE "MemberRole_new" RENAME TO "MemberRole";
DROP TYPE "MemberRole_old";
COMMIT;

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "hourlyRate",
ADD COLUMN     "hourlyRate" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "estimatedLength",
ADD COLUMN     "estimatedLength" INTEGER NOT NULL;
