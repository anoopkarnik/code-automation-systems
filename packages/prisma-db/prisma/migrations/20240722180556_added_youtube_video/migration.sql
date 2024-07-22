/*
  Warnings:

  - Made the column `connectionId` on table `Youtube` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "connection_schema"."Youtube" DROP CONSTRAINT "Youtube_connectionId_fkey";

-- AlterTable
ALTER TABLE "connection_schema"."Youtube" ALTER COLUMN "connectionId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "connection_schema"."Youtube" ADD CONSTRAINT "Youtube_connectionId_fkey" FOREIGN KEY ("connectionId") REFERENCES "connection_schema"."Connection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
