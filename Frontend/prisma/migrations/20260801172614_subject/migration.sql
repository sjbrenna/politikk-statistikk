-- CreateEnum
CREATE TYPE "Voting" AS ENUM ('for', 'mot', 'ikke_tilstede');

-- CreateTable
CREATE TABLE "VoteRecord" (
    "politicianId" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "voting" "Voting" NOT NULL,

    CONSTRAINT "VoteRecord_pkey" PRIMARY KEY ("politicianId","caseId")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isMainSubject" BOOLEAN NOT NULL,
    "parentId" TEXT,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subject_name_key" ON "Subject"("name");

-- AddForeignKey
ALTER TABLE "VoteRecord" ADD CONSTRAINT "VoteRecord_politicianId_fkey" FOREIGN KEY ("politicianId") REFERENCES "Politician"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;
