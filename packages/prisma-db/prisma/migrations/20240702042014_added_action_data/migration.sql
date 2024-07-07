-- CreateEnum
CREATE TYPE "action_schema"."ActionType" AS ENUM ('TRIGGER', 'ACTION');

-- CreateTable
CREATE TABLE "action_schema"."Action" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "actionType" "action_schema"."ActionType" NOT NULL,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "action_schema"."Template" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "action_schema"."Param" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "options" TEXT[],

    CONSTRAINT "Param_pkey" PRIMARY KEY ("id")
);

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
