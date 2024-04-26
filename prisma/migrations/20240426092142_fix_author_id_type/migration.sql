-- DropForeignKey
ALTER TABLE "RequestDetail" DROP CONSTRAINT "RequestDetail_authorId_fkey";

-- DropForeignKey
ALTER TABLE "RequestDetail" DROP CONSTRAINT "RequestDetail_requestId_fkey";

-- AddForeignKey
ALTER TABLE "RequestDetail" ADD CONSTRAINT "RequestDetail_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestDetail" ADD CONSTRAINT "RequestDetail_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
