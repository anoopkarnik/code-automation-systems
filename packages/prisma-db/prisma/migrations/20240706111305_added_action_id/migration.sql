/*
  Warnings:

  - You are about to drop the `NodeConnection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "workflow_schema"."NodeConnection" DROP CONSTRAINT "NodeConnection_predecessorNodeId_fkey";

-- DropForeignKey
ALTER TABLE "workflow_schema"."NodeConnection" DROP CONSTRAINT "NodeConnection_successorNodeId_fkey";

-- DropTable
DROP TABLE "workflow_schema"."NodeConnection";
