-- CreateTable
CREATE TABLE "workflow_schema"."NodeConnection" (
    "id" TEXT NOT NULL,
    "predecessorNodeId" TEXT NOT NULL,
    "successorNodeId" TEXT NOT NULL,

    CONSTRAINT "NodeConnection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "workflow_schema"."NodeConnection" ADD CONSTRAINT "NodeConnection_predecessorNodeId_fkey" FOREIGN KEY ("predecessorNodeId") REFERENCES "workflow_schema"."Node"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_schema"."NodeConnection" ADD CONSTRAINT "NodeConnection_successorNodeId_fkey" FOREIGN KEY ("successorNodeId") REFERENCES "workflow_schema"."Node"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
