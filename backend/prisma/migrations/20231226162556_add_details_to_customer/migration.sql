/*
  Warnings:

  - Added the required column `email` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `customers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;
