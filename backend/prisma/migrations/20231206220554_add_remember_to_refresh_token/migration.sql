/*
  Warnings:

  - You are about to alter the column `rating` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(3,2)` to `DoublePrecision`.
  - The primary key for the `refresh_tokens` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "products" ALTER COLUMN "rating" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "refresh_tokens" DROP CONSTRAINT "refresh_tokens_pkey",
ADD COLUMN     "remember" BOOLEAN NOT NULL DEFAULT false,
ADD CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("userId", "refreshToken");
