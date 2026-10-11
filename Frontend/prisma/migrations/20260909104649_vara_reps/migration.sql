/*
  Warnings:

  - The primary key for the `VoteRecord` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[politicianID,votingID]` on the table `VoteRecord` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Politician" ADD COLUMN     "vara_representative" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "VoteRecord" DROP CONSTRAINT "VoteRecord_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "VoteRecord_politicianID_votingID_key" ON "VoteRecord"("politicianID", "votingID");
