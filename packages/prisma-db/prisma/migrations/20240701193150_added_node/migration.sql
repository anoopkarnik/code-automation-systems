/*
  Warnings:

  - You are about to drop the column `cronPath` on the `Workflows` table. All the data in the column will be lost.
  - You are about to drop the column `flowPath` on the `Workflows` table. All the data in the column will be lost.
  - You are about to drop the column `nodes` on the `Workflows` table. All the data in the column will be lost.
  - You are about to drop the column `notionAccessToken` on the `Workflows` table. All the data in the column will be lost.
  - You are about to drop the column `notionDbId` on the `Workflows` table. All the data in the column will be lost.
  - You are about to drop the column `notionTemplate` on the `Workflows` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "workflow_schema"."NodeType" AS ENUM ('ACTION', 'TRIGGER');

-- AlterTable
ALTER TABLE "workflow_schema"."Workflows" DROP COLUMN "cronPath",
DROP COLUMN "flowPath",
DROP COLUMN "nodes",
DROP COLUMN "notionAccessToken",
DROP COLUMN "notionDbId",
DROP COLUMN "notionTemplate";

-- CreateTable
CREATE TABLE "workflow_schema"."Node" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" "workflow_schema"."NodeType" NOT NULL,
    "workflowId" TEXT NOT NULL,
    "position" TEXT NOT NULL,

    CONSTRAINT "Node_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "workflow_schema"."Node" ADD CONSTRAINT "Node_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "workflow_schema"."Workflows"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
