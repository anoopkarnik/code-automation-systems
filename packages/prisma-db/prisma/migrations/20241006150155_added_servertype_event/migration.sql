-- AlterTable
ALTER TABLE "workflow_schema"."Event" ADD COLUMN     "serverType" TEXT;

-- AlterTable
ALTER TABLE "workflow_schema"."EventOutbox" ADD COLUMN     "serverType" TEXT;
