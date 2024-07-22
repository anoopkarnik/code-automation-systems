/*
  Warnings:

  - A unique constraint covering the columns `[connectionId]` on the table `Youtube` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Youtube_connectionId_key" ON "connection_schema"."Youtube"("connectionId");
