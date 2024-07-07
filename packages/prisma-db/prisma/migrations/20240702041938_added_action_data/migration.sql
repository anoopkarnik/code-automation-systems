/*
  Warnings:

  - You are about to drop the `Action` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Param` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Template` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ActionToTemplate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ParamToTemplate` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `action` to the `Node` table without a default value. This is not possible if the table is not empty.
  - Added the required column `actionToTake` to the `Node` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "workflow_schema"."ActionToTake" AS ENUM ('SCHEDULE', 'WEBHOOK');

-- DropForeignKey
ALTER TABLE "action_schema"."_ActionToTemplate" DROP CONSTRAINT "_ActionToTemplate_A_fkey";

-- DropForeignKey
ALTER TABLE "action_schema"."_ActionToTemplate" DROP CONSTRAINT "_ActionToTemplate_B_fkey";

-- DropForeignKey
ALTER TABLE "action_schema"."_ParamToTemplate" DROP CONSTRAINT "_ParamToTemplate_A_fkey";

-- DropForeignKey
ALTER TABLE "action_schema"."_ParamToTemplate" DROP CONSTRAINT "_ParamToTemplate_B_fkey";

-- AlterTable
ALTER TABLE "workflow_schema"."Node" ADD COLUMN     "action" JSONB NOT NULL,
ADD COLUMN     "actionToTake" "workflow_schema"."ActionToTake" NOT NULL;

-- DropTable
DROP TABLE "action_schema"."Action";

-- DropTable
DROP TABLE "action_schema"."Param";

-- DropTable
DROP TABLE "action_schema"."Template";

-- DropTable
DROP TABLE "action_schema"."_ActionToTemplate";

-- DropTable
DROP TABLE "action_schema"."_ParamToTemplate";

-- DropEnum
DROP TYPE "action_schema"."ActionType";
