-- AlterTable
ALTER TABLE "workflow_schema"."Node" ALTER COLUMN "action" DROP NOT NULL,
ALTER COLUMN "actionToTake" DROP NOT NULL;
