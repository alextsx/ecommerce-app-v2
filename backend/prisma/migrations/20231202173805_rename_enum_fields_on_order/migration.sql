/*
  Warnings:

  - You are about to drop the column `fulfilled` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `paid` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "fulfilled",
DROP COLUMN "paid",
ADD COLUMN     "fulfillmentStatus" "FulfillmentStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING';
