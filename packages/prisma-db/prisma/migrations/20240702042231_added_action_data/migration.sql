/*
  Warnings:

  - You are about to drop the column `action` on the `Node` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "workflow_schema"."Node" DROP COLUMN "action",
ADD COLUMN     "actionData" JSONB;
