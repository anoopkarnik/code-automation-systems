-- AlterTable
ALTER TABLE "workflow_schema"."Connections" ADD COLUMN     "openaiId" TEXT;

-- CreateTable
CREATE TABLE "workflow_schema"."OpenAI" (
    "id" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "OpenAI_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OpenAI_apiKey_key" ON "workflow_schema"."OpenAI"("apiKey");

-- AddForeignKey
ALTER TABLE "workflow_schema"."OpenAI" ADD CONSTRAINT "OpenAI_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_schema"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_schema"."Connections" ADD CONSTRAINT "Connections_openaiId_fkey" FOREIGN KEY ("openaiId") REFERENCES "workflow_schema"."OpenAI"("id") ON DELETE SET NULL ON UPDATE CASCADE;
