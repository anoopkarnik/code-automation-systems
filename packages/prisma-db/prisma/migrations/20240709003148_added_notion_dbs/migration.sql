/*
  Warnings:

  - You are about to drop the column `budgetPlan` on the `NotionDb` table. All the data in the column will be lost.
  - You are about to drop the column `monthlyBudget` on the `NotionDb` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "connection_schema"."NotionDb" DROP COLUMN "budgetPlan",
DROP COLUMN "monthlyBudget",
ADD COLUMN     "budgetPlanDb" JSONB,
ADD COLUMN     "monthlyBudgetDb" JSONB;
