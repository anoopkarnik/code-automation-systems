/*
  Warnings:

  - Added the required column `channelId` to the `Youtube` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "connection_schema"."Youtube" ADD COLUMN     "channelId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Youtube_channelId_watched_idx" ON "connection_schema"."Youtube"("channelId", "watched");
