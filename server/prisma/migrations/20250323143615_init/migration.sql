/*
  Warnings:

  - Added the required column `city` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postal_code` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "postal_code" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;
