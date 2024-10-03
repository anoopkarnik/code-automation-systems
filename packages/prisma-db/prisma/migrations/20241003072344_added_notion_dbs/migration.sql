/*
  Warnings:

  - You are about to drop the column `accountsDb` on the `NotionDb` table. All the data in the column will be lost.
  - You are about to drop the column `actionsDb` on the `NotionDb` table. All the data in the column will be lost.
  - You are about to drop the column `blogsDb` on the `NotionDb` table. All the data in the column will be lost.
  - You are about to drop the column `budgetPlanDb` on the `NotionDb` table. All the data in the column will be lost.
  - You are about to drop the column `channelsDb` on the `NotionDb` table. All the data in the column will be lost.
  - You are about to drop the column `eisenhowerMatrixDb` on the `NotionDb` table. All the data in the column will be lost.
  - You are about to drop the column `financialGoalsDb` on the `NotionDb` table. All the data in the column will be lost.
  - You are about to drop the column `monthlyBudgetDb` on the `NotionDb` table. All the data in the column will be lost.
  - You are about to drop the column `passwordsDb` on the `NotionDb` table. All the data in the column will be lost.
  - You are about to drop the column `placeOfWorkDb` on the `NotionDb` table. All the data in the column will be lost.
  - You are about to drop the column `weeklyPlannerDb` on the `NotionDb` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "connection_schema"."NotionDb" DROP COLUMN "accountsDb",
DROP COLUMN "actionsDb",
DROP COLUMN "blogsDb",
DROP COLUMN "budgetPlanDb",
DROP COLUMN "channelsDb",
DROP COLUMN "eisenhowerMatrixDb",
DROP COLUMN "financialGoalsDb",
DROP COLUMN "monthlyBudgetDb",
DROP COLUMN "passwordsDb",
DROP COLUMN "placeOfWorkDb",
DROP COLUMN "weeklyPlannerDb",
ADD COLUMN     "assetsDb" JSONB,
ADD COLUMN     "blogDb" JSONB,
ADD COLUMN     "budgetDb" JSONB,
ADD COLUMN     "bugsDb" JSONB,
ADD COLUMN     "decisionsDb" JSONB,
ADD COLUMN     "durationBasedActionsDb" JSONB,
ADD COLUMN     "epicsDb" JSONB,
ADD COLUMN     "exercisesDb" JSONB,
ADD COLUMN     "fundsDb" JSONB,
ADD COLUMN     "levelSettingsDb" JSONB,
ADD COLUMN     "moodCategoryDb" JSONB,
ADD COLUMN     "moodTrackerDb" JSONB,
ADD COLUMN     "peopleDb" JSONB,
ADD COLUMN     "projectTasksDb" JSONB,
ADD COLUMN     "sprintsDb" JSONB,
ADD COLUMN     "tasksDb" JSONB,
ADD COLUMN     "weeklyFocusWorkPlannerDb" JSONB,
ADD COLUMN     "youtubeChannelsDb" JSONB;
