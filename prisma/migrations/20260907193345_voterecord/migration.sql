/*
  Warnings:

  - The primary key for the `VoteRecord` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `caseId` on the `VoteRecord` table. All the data in the column will be lost.
  - You are about to drop the column `politicianId` on the `VoteRecord` table. All the data in the column will be lost.
  - You are about to drop the column `voting` on the `VoteRecord` table. All the data in the column will be lost.
  - Added the required column `caseID` to the `VoteRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `politicianID` to the `VoteRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vote` to the `VoteRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `votingID` to the `VoteRecord` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "VoteRecord" DROP CONSTRAINT "VoteRecord_politicianId_fkey";

-- AlterTable
ALTER TABLE "VoteRecord" DROP CONSTRAINT "VoteRecord_pkey",
DROP COLUMN "caseId",
DROP COLUMN "politicianId",
DROP COLUMN "voting",
ADD COLUMN     "caseID" TEXT NOT NULL,
ADD COLUMN     "politicianID" TEXT NOT NULL,
ADD COLUMN     "vote" "Voting" NOT NULL,
ADD COLUMN     "votingID" TEXT NOT NULL,
ADD CONSTRAINT "VoteRecord_pkey" PRIMARY KEY ("politicianID", "votingID");

-- AddForeignKey
ALTER TABLE "VoteRecord" ADD CONSTRAINT "VoteRecord_politicianID_fkey" FOREIGN KEY ("politicianID") REFERENCES "Politician"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
