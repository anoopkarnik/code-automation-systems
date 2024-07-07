/*
  Warnings:

  - Made the column `workflowId` on table `Node` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "workflow_schema"."Node" DROP CONSTRAINT "Node_workflowId_fkey";

-- AlterTable
ALTER TABLE "workflow_schema"."Node" ALTER COLUMN "workflowId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "workflow_schema"."Node" ADD CONSTRAINT "Node_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "workflow_schema"."Workflows"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
