/*
  Warnings:

  - You are about to drop the column `types` on the `WorkflowActionType` table. All the data in the column will be lost.
  - You are about to drop the column `types` on the `WorkflowTriggerType` table. All the data in the column will be lost.
  - Added the required column `type` to the `WorkflowActionType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `WorkflowTriggerType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "workflow_schema"."WorkflowActionType" DROP COLUMN "types",
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "workflow_schema"."WorkflowTriggerType" DROP COLUMN "types",
ADD COLUMN     "type" TEXT NOT NULL;
