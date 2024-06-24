-- CreateEnum
CREATE TYPE "user_schema"."UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "user_schema"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "role" "user_schema"."UserRole" NOT NULL DEFAULT 'USER',
    "password" TEXT,
    "localGoogleId" TEXT,
    "googleResourceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_schema"."Account" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "user_schema"."Session" (
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "user_schema"."VerificationToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_schema"."ResetPasswordToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResetPasswordToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_schema"."EmailTemplate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "html" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workflow_schema"."LocalGoogleCredential" (
    "id" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "folderId" TEXT,
    "pageToken" TEXT,
    "channelId" TEXT NOT NULL,
    "subscribed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "LocalGoogleCredential_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workflow_schema"."DiscordWebhook" (
    "id" TEXT NOT NULL,
    "webhookId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "guildName" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "DiscordWebhook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workflow_schema"."Notion" (
    "id" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "databaseId" TEXT NOT NULL,
    "workspaceName" TEXT NOT NULL,
    "workspaceIcon" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Notion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workflow_schema"."Connections" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "discordWebhookId" TEXT,
    "notionId" TEXT,
    "userId" TEXT,

    CONSTRAINT "Connections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workflow_schema"."Workflows" (
    "id" TEXT NOT NULL,
    "nodes" TEXT,
    "edges" TEXT,
    "name" TEXT NOT NULL,
    "discordTemplate" TEXT,
    "notionTemplate" TEXT,
    "notionAccessToken" TEXT,
    "notionDbId" TEXT,
    "flowPath" TEXT,
    "cronPath" TEXT,
    "publish" BOOLEAN DEFAULT false,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Workflows_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "user_schema"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_localGoogleId_key" ON "user_schema"."User"("localGoogleId");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleResourceId_key" ON "user_schema"."User"("googleResourceId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "user_schema"."Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "user_schema"."VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_email_token_key" ON "user_schema"."VerificationToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "ResetPasswordToken_token_key" ON "user_schema"."ResetPasswordToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "ResetPasswordToken_email_token_key" ON "user_schema"."ResetPasswordToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "LocalGoogleCredential_accessToken_key" ON "workflow_schema"."LocalGoogleCredential"("accessToken");

-- CreateIndex
CREATE UNIQUE INDEX "LocalGoogleCredential_channelId_key" ON "workflow_schema"."LocalGoogleCredential"("channelId");

-- CreateIndex
CREATE UNIQUE INDEX "LocalGoogleCredential_userId_key" ON "workflow_schema"."LocalGoogleCredential"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DiscordWebhook_webhookId_key" ON "workflow_schema"."DiscordWebhook"("webhookId");

-- CreateIndex
CREATE UNIQUE INDEX "DiscordWebhook_url_key" ON "workflow_schema"."DiscordWebhook"("url");

-- CreateIndex
CREATE UNIQUE INDEX "DiscordWebhook_channelId_key" ON "workflow_schema"."DiscordWebhook"("channelId");

-- CreateIndex
CREATE UNIQUE INDEX "Notion_accessToken_key" ON "workflow_schema"."Notion"("accessToken");

-- CreateIndex
CREATE UNIQUE INDEX "Notion_workspaceId_key" ON "workflow_schema"."Notion"("workspaceId");

-- CreateIndex
CREATE UNIQUE INDEX "Notion_databaseId_key" ON "workflow_schema"."Notion"("databaseId");

-- CreateIndex
CREATE UNIQUE INDEX "Connections_type_key" ON "workflow_schema"."Connections"("type");

-- AddForeignKey
ALTER TABLE "user_schema"."Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_schema"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_schema"."Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_schema"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_schema"."LocalGoogleCredential" ADD CONSTRAINT "LocalGoogleCredential_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_schema"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_schema"."DiscordWebhook" ADD CONSTRAINT "DiscordWebhook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_schema"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_schema"."Notion" ADD CONSTRAINT "Notion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_schema"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_schema"."Connections" ADD CONSTRAINT "Connections_discordWebhookId_fkey" FOREIGN KEY ("discordWebhookId") REFERENCES "workflow_schema"."DiscordWebhook"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_schema"."Connections" ADD CONSTRAINT "Connections_notionId_fkey" FOREIGN KEY ("notionId") REFERENCES "workflow_schema"."Notion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_schema"."Connections" ADD CONSTRAINT "Connections_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_schema"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_schema"."Workflows" ADD CONSTRAINT "Workflows_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_schema"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
