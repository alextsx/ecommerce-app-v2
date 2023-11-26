/*
  Warnings:

  - Added the required column `updatedAt` to the `refresh_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "refresh_tokens_userId_idx";

-- AlterTable
ALTER TABLE "refresh_tokens" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "refresh_tokens_userId_refreshToken_idx" ON "refresh_tokens"("userId", "refreshToken");
