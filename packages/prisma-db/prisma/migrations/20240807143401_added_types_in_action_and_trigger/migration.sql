-- AlterTable
ALTER TABLE "workflow_schema"."WorkflowActionType" ADD COLUMN     "types" JSONB[];

-- AlterTable
ALTER TABLE "workflow_schema"."WorkflowTriggerType" ADD COLUMN     "types" JSONB[];
