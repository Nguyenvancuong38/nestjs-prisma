-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('standard', 'ng', 'preventive');

-- CreateTable
CREATE TABLE "ProductSample" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "partNo" TEXT,
    "description" TEXT,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3) NOT NULL,
    "type" "ProductType" NOT NULL DEFAULT 'preventive',
    "userId" INTEGER NOT NULL,
    "requestId" INTEGER NOT NULL,
    "modelId" INTEGER NOT NULL,

    CONSTRAINT "ProductSample_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RequestProductSample" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "master" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RequestProductSample_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductSample" ADD CONSTRAINT "ProductSample_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductSample" ADD CONSTRAINT "ProductSample_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "RequestProductSample"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductSample" ADD CONSTRAINT "ProductSample_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestProductSample" ADD CONSTRAINT "RequestProductSample_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
