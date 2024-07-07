/*
  Warnings:

  - You are about to drop the `Connections` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OpenAI` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "action_schema";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "connection_schema";

-- CreateEnum
CREATE TYPE "action_schema"."ActionType" AS ENUM ('TRIGGER', 'ACTION');

-- DropForeignKey
ALTER TABLE "workflow_schema"."Connections" DROP CONSTRAINT "Connections_notionId_fkey";

-- DropForeignKey
ALTER TABLE "workflow_schema"."Connections" DROP CONSTRAINT "Connections_openaiId_fkey";

-- DropForeignKey
ALTER TABLE "workflow_schema"."Connections" DROP CONSTRAINT "Connections_userId_fkey";

-- DropForeignKey
ALTER TABLE "workflow_schema"."Notion" DROP CONSTRAINT "Notion_userId_fkey";

-- DropForeignKey
ALTER TABLE "workflow_schema"."OpenAI" DROP CONSTRAINT "OpenAI_userId_fkey";

-- DropTable
DROP TABLE "workflow_schema"."Connections";

-- DropTable
DROP TABLE "workflow_schema"."Notion";

-- DropTable
DROP TABLE "workflow_schema"."OpenAI";

-- CreateTable
CREATE TABLE "action_schema"."Action" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "templateId" TEXT,
    "actionType" "action_schema"."ActionType" NOT NULL,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "action_schema"."Template" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "actionId" TEXT NOT NULL,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "action_schema"."Param" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "options" TEXT[],
    "templateId" TEXT NOT NULL,

    CONSTRAINT "Param_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "connection_schema"."Notion" (
    "id" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "workspaceName" TEXT NOT NULL,
    "workspaceIcon" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Notion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "connection_schema"."OpenAI" (
    "id" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "OpenAI_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "connection_schema"."Connections" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "notionId" TEXT,
    "openaiId" TEXT,
    "userId" TEXT,

    CONSTRAINT "Connections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Notion_accessToken_key" ON "connection_schema"."Notion"("accessToken");

-- CreateIndex
CREATE UNIQUE INDEX "Notion_workspaceId_key" ON "connection_schema"."Notion"("workspaceId");

-- CreateIndex
CREATE UNIQUE INDEX "OpenAI_apiKey_key" ON "connection_schema"."OpenAI"("apiKey");

-- CreateIndex
CREATE UNIQUE INDEX "Connections_type_key" ON "connection_schema"."Connections"("type");

-- AddForeignKey
ALTER TABLE "action_schema"."Template" ADD CONSTRAINT "Template_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "action_schema"."Action"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "action_schema"."Param" ADD CONSTRAINT "Param_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "action_schema"."Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connection_schema"."Notion" ADD CONSTRAINT "Notion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_schema"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connection_schema"."OpenAI" ADD CONSTRAINT "OpenAI_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_schema"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connection_schema"."Connections" ADD CONSTRAINT "Connections_notionId_fkey" FOREIGN KEY ("notionId") REFERENCES "connection_schema"."Notion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connection_schema"."Connections" ADD CONSTRAINT "Connections_openaiId_fkey" FOREIGN KEY ("openaiId") REFERENCES "connection_schema"."OpenAI"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connection_schema"."Connections" ADD CONSTRAINT "Connections_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_schema"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
