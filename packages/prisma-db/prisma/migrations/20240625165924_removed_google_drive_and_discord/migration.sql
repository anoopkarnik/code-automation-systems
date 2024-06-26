/*
  Warnings:

  - You are about to drop the column `googleResourceId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `localGoogleId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `discordWebhookId` on the `Connections` table. All the data in the column will be lost.
  - You are about to drop the column `discordTemplate` on the `Workflows` table. All the data in the column will be lost.
  - You are about to drop the `DiscordWebhook` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LocalGoogleCredential` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "workflow_schema"."Connections" DROP CONSTRAINT "Connections_discordWebhookId_fkey";

-- DropForeignKey
ALTER TABLE "workflow_schema"."DiscordWebhook" DROP CONSTRAINT "DiscordWebhook_userId_fkey";

-- DropForeignKey
ALTER TABLE "workflow_schema"."LocalGoogleCredential" DROP CONSTRAINT "LocalGoogleCredential_userId_fkey";

-- DropIndex
DROP INDEX "user_schema"."User_googleResourceId_key";

-- DropIndex
DROP INDEX "user_schema"."User_localGoogleId_key";

-- AlterTable
ALTER TABLE "user_schema"."User" DROP COLUMN "googleResourceId",
DROP COLUMN "localGoogleId";

-- AlterTable
ALTER TABLE "workflow_schema"."Connections" DROP COLUMN "discordWebhookId";

-- AlterTable
ALTER TABLE "workflow_schema"."Workflows" DROP COLUMN "discordTemplate";

-- DropTable
DROP TABLE "workflow_schema"."DiscordWebhook";

-- DropTable
DROP TABLE "workflow_schema"."LocalGoogleCredential";
