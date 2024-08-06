/*
  Warnings:

  - Added the required column `metadata` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "workflow_schema"."Event" ADD COLUMN     "metadata" JSONB NOT NULL;
