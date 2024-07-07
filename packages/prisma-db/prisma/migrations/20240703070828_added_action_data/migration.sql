/*
  Warnings:

  - You are about to drop the column `position` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the column `edges` on the `Workflows` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "workflow_schema"."Node" DROP COLUMN "position";

-- AlterTable
ALTER TABLE "workflow_schema"."Workflows" DROP COLUMN "edges";
