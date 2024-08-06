/*
  Warnings:

  - You are about to drop the `Node` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "workflow_schema"."Node" DROP CONSTRAINT "Node_userId_fkey";

-- DropForeignKey
ALTER TABLE "workflow_schema"."Node" DROP CONSTRAINT "Node_workflowId_fkey";

-- DropTable
DROP TABLE "workflow_schema"."Node";

-- CreateTable
CREATE TABLE "workflow_schema"."WorkflowTrigger" (
    "id" TEXT NOT NULL,
    "workflowId" TEXT NOT NULL,
    "triggerId" TEXT NOT NULL,
    "metadata" JSONB DEFAULT '{}',

    CONSTRAINT "WorkflowTrigger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workflow_schema"."WorkflowAction" (
    "id" TEXT NOT NULL,
    "workflowId" TEXT NOT NULL,
    "actionId" TEXT NOT NULL,
    "metadata" JSONB DEFAULT '{}',
    "sortingOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "WorkflowAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workflow_schema"."WorkflowTriggerType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,

    CONSTRAINT "WorkflowTriggerType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workflow_schema"."WorkflowActionType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,

    CONSTRAINT "WorkflowActionType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkflowTrigger_workflowId_key" ON "workflow_schema"."WorkflowTrigger"("workflowId");

-- AddForeignKey
ALTER TABLE "workflow_schema"."WorkflowTrigger" ADD CONSTRAINT "WorkflowTrigger_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "workflow_schema"."Workflow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_schema"."WorkflowTrigger" ADD CONSTRAINT "WorkflowTrigger_triggerId_fkey" FOREIGN KEY ("triggerId") REFERENCES "workflow_schema"."WorkflowTriggerType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_schema"."WorkflowAction" ADD CONSTRAINT "WorkflowAction_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "workflow_schema"."Workflow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_schema"."WorkflowAction" ADD CONSTRAINT "WorkflowAction_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "workflow_schema"."WorkflowActionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
