-- CreateTable
CREATE TABLE "connection_schema"."NotionDb" (
    "id" TEXT NOT NULL,
    "accountsDb" JSONB,
    "transactionsDb" JSONB,
    "monthlyBudget" JSONB,
    "budgetPlan" JSONB,
    "notionId" TEXT NOT NULL,

    CONSTRAINT "NotionDb_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NotionDb_notionId_key" ON "connection_schema"."NotionDb"("notionId");

-- AddForeignKey
ALTER TABLE "connection_schema"."NotionDb" ADD CONSTRAINT "NotionDb_notionId_fkey" FOREIGN KEY ("notionId") REFERENCES "connection_schema"."Notion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
