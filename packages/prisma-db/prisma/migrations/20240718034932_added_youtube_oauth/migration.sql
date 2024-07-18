/*
  Warnings:

  - You are about to drop the column `scope` on the `Youtube` table. All the data in the column will be lost.
  - Added the required column `scopes` to the `Youtube` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "connection_schema"."Youtube" DROP COLUMN "scope",
ADD COLUMN     "scopes" TEXT NOT NULL;
