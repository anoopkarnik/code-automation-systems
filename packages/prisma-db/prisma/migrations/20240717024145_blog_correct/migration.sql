/*
  Warnings:

  - You are about to drop the column `bblogsDb` on the `NotionDb` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "connection_schema"."NotionDb" DROP COLUMN "bblogsDb",
ADD COLUMN     "blogsDb" JSONB;
