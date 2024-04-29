/*
  Warnings:

  - Added the required column `topicId` to the `TopicSub` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TopicSub" ADD COLUMN     "topicId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "TopicSub" ADD CONSTRAINT "TopicSub_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
