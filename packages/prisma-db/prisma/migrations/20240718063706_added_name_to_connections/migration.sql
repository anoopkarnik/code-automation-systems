-- AlterTable
ALTER TABLE "connection_schema"."Connections" ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'New Connection';

-- AlterTable
ALTER TABLE "connection_schema"."Youtube" ALTER COLUMN "accessToken" DROP NOT NULL,
ALTER COLUMN "refreshToken" DROP NOT NULL,
ALTER COLUMN "scopes" DROP NOT NULL;
