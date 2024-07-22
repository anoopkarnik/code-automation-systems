/*
  Warnings:

  - You are about to drop the `Connections` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Workflows` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "connection_schema"."Connections" DROP CONSTRAINT "Connections_userId_fkey";

-- DropForeignKey
ALTER TABLE "connection_schema"."NotionDb" DROP CONSTRAINT "NotionDb_connectionId_fkey";

-- DropForeignKey
ALTER TABLE "workflow_schema"."Event" DROP CONSTRAINT "Event_workflowId_fkey";

-- DropForeignKey
ALTER TABLE "workflow_schema"."Node" DROP CONSTRAINT "Node_workflowId_fkey";

-- DropForeignKey
ALTER TABLE "workflow_schema"."Workflows" DROP CONSTRAINT "Workflows_userId_fkey";

-- DropTable
DROP TABLE "connection_schema"."Connections";

-- DropTable
DROP TABLE "workflow_schema"."Workflows";

-- CreateTable
CREATE TABLE "connection_schema"."Connection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'New Connection',
    "type" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "scopes" TEXT,
    "workspaceId" TEXT,
    "workspaceName" TEXT,
    "workspaceIcon" TEXT,
    "apiKey" TEXT,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Connection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workflow_schema"."Workflow" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "publish" BOOLEAN DEFAULT false,
    "description" TEXT NOT NULL,
    "lastRun" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Workflow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Connection_workspaceId_key" ON "connection_schema"."Connection"("workspaceId");

-- AddForeignKey
ALTER TABLE "connection_schema"."NotionDb" ADD CONSTRAINT "NotionDb_connectionId_fkey" FOREIGN KEY ("connectionId") REFERENCES "connection_schema"."Connection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connection_schema"."Connection" ADD CONSTRAINT "Connection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_schema"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_schema"."Workflow" ADD CONSTRAINT "Workflow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_schema"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_schema"."Node" ADD CONSTRAINT "Node_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "workflow_schema"."Workflow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_schema"."Event" ADD CONSTRAINT "Event_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "workflow_schema"."Workflow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
