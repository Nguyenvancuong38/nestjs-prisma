/*
  Warnings:

  - The primary key for the `ProductSampleWithUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ProductSampleWithUser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProductSampleWithUser" DROP CONSTRAINT "ProductSampleWithUser_pkey",
DROP COLUMN "id";
