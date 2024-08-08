/*
  Warnings:

  - You are about to drop the column `type` on the `WorkflowActionType` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `WorkflowTriggerType` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "workflow_schema"."WorkflowAction" DROP CONSTRAINT "WorkflowAction_actionId_fkey";

-- DropForeignKey
ALTER TABLE "workflow_schema"."WorkflowTrigger" DROP CONSTRAINT "WorkflowTrigger_triggerId_fkey";

-- AlterTable
ALTER TABLE "workflow_schema"."WorkflowActionType" DROP COLUMN "type";

-- AlterTable
ALTER TABLE "workflow_schema"."WorkflowTriggerType" DROP COLUMN "type";

-- CreateTable
CREATE TABLE "workflow_schema"."WorkflowTriggerSubType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "typeId" TEXT NOT NULL,

    CONSTRAINT "WorkflowTriggerSubType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workflow_schema"."WorkflowActionSubType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "typeId" TEXT NOT NULL,

    CONSTRAINT "WorkflowActionSubType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "workflow_schema"."WorkflowTrigger" ADD CONSTRAINT "WorkflowTrigger_triggerId_fkey" FOREIGN KEY ("triggerId") REFERENCES "workflow_schema"."WorkflowTriggerSubType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_schema"."WorkflowAction" ADD CONSTRAINT "WorkflowAction_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "workflow_schema"."WorkflowActionSubType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_schema"."WorkflowTriggerSubType" ADD CONSTRAINT "WorkflowTriggerSubType_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "workflow_schema"."WorkflowTriggerType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_schema"."WorkflowActionSubType" ADD CONSTRAINT "WorkflowActionSubType_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "workflow_schema"."WorkflowActionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
