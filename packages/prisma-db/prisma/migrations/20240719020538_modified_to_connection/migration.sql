/*
  Warnings:

  - You are about to drop the column `notionId` on the `Connections` table. All the data in the column will be lost.
  - You are about to drop the column `openaiId` on the `Connections` table. All the data in the column will be lost.
  - You are about to drop the column `youtubeId` on the `Connections` table. All the data in the column will be lost.
  - You are about to drop the column `notionId` on the `NotionDb` table. All the data in the column will be lost.
  - You are about to drop the `Notion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OpenAI` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Youtube` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[workspaceId]` on the table `Connections` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[connectionId]` on the table `NotionDb` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Connections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `NotionDb` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "connection_schema"."Connections" DROP CONSTRAINT "Connections_notionId_fkey";

-- DropForeignKey
ALTER TABLE "connection_schema"."Connections" DROP CONSTRAINT "Connections_openaiId_fkey";

-- DropForeignKey
ALTER TABLE "connection_schema"."Connections" DROP CONSTRAINT "Connections_youtubeId_fkey";

-- DropForeignKey
ALTER TABLE "connection_schema"."Notion" DROP CONSTRAINT "Notion_userId_fkey";

-- DropForeignKey
ALTER TABLE "connection_schema"."NotionDb" DROP CONSTRAINT "NotionDb_notionId_fkey";

-- DropForeignKey
ALTER TABLE "connection_schema"."OpenAI" DROP CONSTRAINT "OpenAI_userId_fkey";

-- DropForeignKey
ALTER TABLE "connection_schema"."Youtube" DROP CONSTRAINT "Youtube_userId_fkey";

-- DropIndex
DROP INDEX "connection_schema"."NotionDb_notionId_key";

-- AlterTable
ALTER TABLE "connection_schema"."Connections" DROP COLUMN "notionId",
DROP COLUMN "openaiId",
DROP COLUMN "youtubeId",
ADD COLUMN     "accessToken" TEXT,
ADD COLUMN     "apiKey" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "refreshToken" TEXT,
ADD COLUMN     "scopes" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "workspaceIcon" TEXT,
ADD COLUMN     "workspaceId" TEXT,
ADD COLUMN     "workspaceName" TEXT;

-- AlterTable
ALTER TABLE "connection_schema"."NotionDb" DROP COLUMN "notionId",
ADD COLUMN     "connectionId" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "connection_schema"."Notion";

-- DropTable
DROP TABLE "connection_schema"."OpenAI";

-- DropTable
DROP TABLE "connection_schema"."Youtube";

-- CreateIndex
CREATE UNIQUE INDEX "Connections_workspaceId_key" ON "connection_schema"."Connections"("workspaceId");

-- CreateIndex
CREATE UNIQUE INDEX "NotionDb_connectionId_key" ON "connection_schema"."NotionDb"("connectionId");

-- AddForeignKey
ALTER TABLE "connection_schema"."NotionDb" ADD CONSTRAINT "NotionDb_connectionId_fkey" FOREIGN KEY ("connectionId") REFERENCES "connection_schema"."Connections"("id") ON DELETE SET NULL ON UPDATE CASCADE;
