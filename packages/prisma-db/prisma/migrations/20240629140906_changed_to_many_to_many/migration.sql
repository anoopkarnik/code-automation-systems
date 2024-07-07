/*
  Warnings:

  - You are about to drop the column `templateId` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `templateId` on the `Param` table. All the data in the column will be lost.
  - You are about to drop the column `actionId` on the `Template` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "action_schema"."Param" DROP CONSTRAINT "Param_templateId_fkey";

-- DropForeignKey
ALTER TABLE "action_schema"."Template" DROP CONSTRAINT "Template_actionId_fkey";

-- AlterTable
ALTER TABLE "action_schema"."Action" DROP COLUMN "templateId",
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "action_schema"."Param" DROP COLUMN "templateId";

-- AlterTable
ALTER TABLE "action_schema"."Template" DROP COLUMN "actionId";

-- CreateTable
CREATE TABLE "action_schema"."_ActionToTemplate" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "action_schema"."_ParamToTemplate" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ActionToTemplate_AB_unique" ON "action_schema"."_ActionToTemplate"("A", "B");

-- CreateIndex
CREATE INDEX "_ActionToTemplate_B_index" ON "action_schema"."_ActionToTemplate"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ParamToTemplate_AB_unique" ON "action_schema"."_ParamToTemplate"("A", "B");

-- CreateIndex
CREATE INDEX "_ParamToTemplate_B_index" ON "action_schema"."_ParamToTemplate"("B");

-- AddForeignKey
ALTER TABLE "action_schema"."_ActionToTemplate" ADD CONSTRAINT "_ActionToTemplate_A_fkey" FOREIGN KEY ("A") REFERENCES "action_schema"."Action"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "action_schema"."_ActionToTemplate" ADD CONSTRAINT "_ActionToTemplate_B_fkey" FOREIGN KEY ("B") REFERENCES "action_schema"."Template"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "action_schema"."_ParamToTemplate" ADD CONSTRAINT "_ParamToTemplate_A_fkey" FOREIGN KEY ("A") REFERENCES "action_schema"."Param"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "action_schema"."_ParamToTemplate" ADD CONSTRAINT "_ParamToTemplate_B_fkey" FOREIGN KEY ("B") REFERENCES "action_schema"."Template"("id") ON DELETE CASCADE ON UPDATE CASCADE;
