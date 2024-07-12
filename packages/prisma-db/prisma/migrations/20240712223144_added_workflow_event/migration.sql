-- CreateTable
CREATE TABLE "workflow_schema"."Event" (
    "id" TEXT NOT NULL,
    "workflowId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "workflow_schema"."Event" ADD CONSTRAINT "Event_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "workflow_schema"."Workflows"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
