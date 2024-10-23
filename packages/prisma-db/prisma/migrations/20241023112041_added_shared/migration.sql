/*
  Warnings:

  - You are about to drop the column `public` on the `Workflow` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "workflow_schema"."Workflow" DROP COLUMN "public",
ADD COLUMN     "shared" BOOLEAN DEFAULT false;
