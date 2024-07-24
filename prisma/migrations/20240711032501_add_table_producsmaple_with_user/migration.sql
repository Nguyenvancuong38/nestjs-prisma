/*
  Warnings:

  - You are about to drop the column `userId` on the `ProductSample` table. All the data in the column will be lost.
  - Added the required column `productSampleWithUserId` to the `ProductSample` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductSample" DROP CONSTRAINT "ProductSample_userId_fkey";

-- AlterTable
ALTER TABLE "ProductSample" DROP COLUMN "userId",
ADD COLUMN     "position" TEXT,
ADD COLUMN     "productSampleWithUserId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "ProductSampleWithUser" (
    "id" SERIAL NOT NULL,
    "productSampleId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ProductSampleWithUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductSampleWithUser_productSampleId_key" ON "ProductSampleWithUser"("productSampleId");

-- AddForeignKey
ALTER TABLE "ProductSample" ADD CONSTRAINT "ProductSample_productSampleWithUserId_fkey" FOREIGN KEY ("productSampleWithUserId") REFERENCES "ProductSampleWithUser"("productSampleId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductSampleWithUser" ADD CONSTRAINT "ProductSampleWithUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
