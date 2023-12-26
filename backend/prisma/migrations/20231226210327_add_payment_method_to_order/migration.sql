-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('stripe', 'cod');

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "paymentMethod" "PaymentMethod" NOT NULL DEFAULT 'cod';
