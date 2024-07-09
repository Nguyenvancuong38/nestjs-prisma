/*
  Warnings:

  - Made the column `requestId` on table `ProductSample` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ProductSample" ALTER COLUMN "requestId" SET NOT NULL;
