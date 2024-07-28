/*
  Warnings:

  - Added the required column `title` to the `Youtube` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "connection_schema"."Youtube" ADD COLUMN     "title" TEXT NOT NULL;
