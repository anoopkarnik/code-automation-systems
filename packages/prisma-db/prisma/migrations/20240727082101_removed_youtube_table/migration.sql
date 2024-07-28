/*
  Warnings:

  - You are about to drop the `Youtube` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "connection_schema"."Youtube" DROP CONSTRAINT "Youtube_connectionId_fkey";

-- DropTable
DROP TABLE "connection_schema"."Youtube";
