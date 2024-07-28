-- AlterTable
ALTER TABLE "workflow_schema"."Node" ADD COLUMN     "sortingOrder" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "workflow_schema"."EventOutbox" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "EventOutbox_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventOutbox_eventId_key" ON "workflow_schema"."EventOutbox"("eventId");

-- AddForeignKey
ALTER TABLE "workflow_schema"."EventOutbox" ADD CONSTRAINT "EventOutbox_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "workflow_schema"."Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
