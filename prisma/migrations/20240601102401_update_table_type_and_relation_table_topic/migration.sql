-- CreateTable
CREATE TABLE "Type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TopicWithType" (
    "topicId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,

    CONSTRAINT "TopicWithType_pkey" PRIMARY KEY ("topicId","typeId")
);

-- AddForeignKey
ALTER TABLE "TopicWithType" ADD CONSTRAINT "TopicWithType_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopicWithType" ADD CONSTRAINT "TopicWithType_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE CASCADE ON UPDATE CASCADE;
