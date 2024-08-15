-- DropForeignKey
ALTER TABLE "workflow_schema"."Event" DROP CONSTRAINT "Event_workflowId_fkey";

-- DropForeignKey
ALTER TABLE "workflow_schema"."EventOutbox" DROP CONSTRAINT "EventOutbox_eventId_fkey";

-- DropForeignKey
ALTER TABLE "workflow_schema"."Workflow" DROP CONSTRAINT "Workflow_userId_fkey";

-- DropForeignKey
ALTER TABLE "workflow_schema"."WorkflowAction" DROP CONSTRAINT "WorkflowAction_actionId_fkey";

-- DropForeignKey
ALTER TABLE "workflow_schema"."WorkflowAction" DROP CONSTRAINT "WorkflowAction_workflowId_fkey";

-- DropForeignKey
ALTER TABLE "workflow_schema"."WorkflowActionSubType" DROP CONSTRAINT "WorkflowActionSubType_typeId_fkey";

-- DropForeignKey
ALTER TABLE "workflow_schema"."WorkflowTrigger" DROP CONSTRAINT "WorkflowTrigger_triggerId_fkey";

-- DropForeignKey
ALTER TABLE "workflow_schema"."WorkflowTrigger" DROP CONSTRAINT "WorkflowTrigger_workflowId_fkey";

-- DropForeignKey
ALTER TABLE "workflow_schema"."WorkflowTriggerSubType" DROP CONSTRAINT "WorkflowTriggerSubType_typeId_fkey";

-- AddForeignKey
ALTER TABLE "workflow_schema"."Workflow" ADD CONSTRAINT "Workflow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_schema"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_schema"."WorkflowTrigger" ADD CONSTRAINT "WorkflowTrigger_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "workflow_schema"."Workflow"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_schema"."WorkflowTrigger" ADD CONSTRAINT "WorkflowTrigger_triggerId_fkey" FOREIGN KEY ("triggerId") REFERENCES "workflow_schema"."WorkflowTriggerSubType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_schema"."WorkflowAction" ADD CONSTRAINT "WorkflowAction_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "workflow_schema"."Workflow"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_schema"."WorkflowAction" ADD CONSTRAINT "WorkflowAction_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "workflow_schema"."WorkflowActionSubType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_schema"."WorkflowTriggerSubType" ADD CONSTRAINT "WorkflowTriggerSubType_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "workflow_schema"."WorkflowTriggerType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_schema"."WorkflowActionSubType" ADD CONSTRAINT "WorkflowActionSubType_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "workflow_schema"."WorkflowActionType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_schema"."Event" ADD CONSTRAINT "Event_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "workflow_schema"."Workflow"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_schema"."EventOutbox" ADD CONSTRAINT "EventOutbox_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "workflow_schema"."Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
