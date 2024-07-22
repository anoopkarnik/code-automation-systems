-- CreateTable
CREATE TABLE "connection_schema"."Youtube" (
    "id" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "watched" BOOLEAN NOT NULL DEFAULT false,
    "connectionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Youtube_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "connection_schema"."Youtube" ADD CONSTRAINT "Youtube_connectionId_fkey" FOREIGN KEY ("connectionId") REFERENCES "connection_schema"."Connection"("id") ON DELETE SET NULL ON UPDATE CASCADE;
