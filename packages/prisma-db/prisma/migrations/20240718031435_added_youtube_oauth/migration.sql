-- AlterTable
ALTER TABLE "connection_schema"."Connections" ADD COLUMN     "youtubeId" TEXT;

-- CreateTable
CREATE TABLE "connection_schema"."Youtube" (
    "id" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "scope" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Youtube_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Youtube_accessToken_key" ON "connection_schema"."Youtube"("accessToken");

-- CreateIndex
CREATE UNIQUE INDEX "Youtube_refreshToken_key" ON "connection_schema"."Youtube"("refreshToken");

-- AddForeignKey
ALTER TABLE "connection_schema"."Youtube" ADD CONSTRAINT "Youtube_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_schema"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connection_schema"."Connections" ADD CONSTRAINT "Connections_youtubeId_fkey" FOREIGN KEY ("youtubeId") REFERENCES "connection_schema"."Youtube"("id") ON DELETE SET NULL ON UPDATE CASCADE;
