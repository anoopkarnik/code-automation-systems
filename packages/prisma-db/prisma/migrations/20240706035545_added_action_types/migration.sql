/*
  Warnings:

  - You are about to drop the column `actionToTake` on the `Node` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "workflow_schema"."Node" DROP COLUMN "actionToTake",
ADD COLUMN     "actionType" TEXT,
ADD COLUMN     "subActionType" TEXT;

-- DropEnum
DROP TYPE "workflow_schema"."ActionToTake";
