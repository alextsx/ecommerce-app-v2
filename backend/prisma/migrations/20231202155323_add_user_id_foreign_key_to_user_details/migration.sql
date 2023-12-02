/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `user_details` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `user_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_details" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_details_userId_key" ON "user_details"("userId");

-- AddForeignKey
ALTER TABLE "user_details" ADD CONSTRAINT "user_details_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
