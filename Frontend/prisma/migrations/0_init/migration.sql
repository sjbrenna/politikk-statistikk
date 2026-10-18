-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "Voting" AS ENUM ('for', 'mot', 'ikke_tilstede');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "favorites" TEXT[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Party" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Party_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Politician" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "birthday" TEXT NOT NULL,
    "partyId" TEXT NOT NULL,
    "representative" BOOLEAN NOT NULL,
    "vara_representative" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Politician_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GovernmentRole" (
    "title" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "politicianId" TEXT NOT NULL,
    "department" TEXT NOT NULL,

    CONSTRAINT "GovernmentRole_pkey" PRIMARY KEY ("politicianId")
);

-- CreateTable
CREATE TABLE "VoteRecord" (
    "caseID" TEXT NOT NULL,
    "politicianID" TEXT NOT NULL,
    "vote" "Voting" NOT NULL,
    "votingID" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FinalVoting" (
    "votingID" TEXT NOT NULL,

    CONSTRAINT "FinalVoting_pkey" PRIMARY KEY ("votingID")
);

-- CreateTable
CREATE TABLE "Subject" (
    "name" TEXT NOT NULL,
    "isMainSubject" BOOLEAN NOT NULL,
    "id" INTEGER NOT NULL,
    "parentId" INTEGER,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Committee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Committee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaseProposer" (
    "caseMetadataId" TEXT NOT NULL,
    "politicianId" TEXT NOT NULL,

    CONSTRAINT "CaseProposer_pkey" PRIMARY KEY ("caseMetadataId","politicianId")
);

-- CreateTable
CREATE TABLE "CaseCommitteProposer" (
    "caseMetadataId" TEXT NOT NULL,
    "committeeId" TEXT NOT NULL,

    CONSTRAINT "CaseCommitteProposer_pkey" PRIMARY KEY ("caseMetadataId","committeeId")
);

-- CreateTable
CREATE TABLE "CaseSubject" (
    "caseMetadataId" TEXT NOT NULL,
    "subjectId" INTEGER NOT NULL,

    CONSTRAINT "CaseSubject_pkey" PRIMARY KEY ("caseMetadataId","subjectId")
);

-- CreateTable
CREATE TABLE "CaseMetadata" (
    "id" TEXT NOT NULL,

    CONSTRAINT "CaseMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CommitteeToPolitician" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CommitteeToPolitician_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VoteRecord_politicianID_votingID_key" ON "VoteRecord"("politicianID", "votingID");

-- CreateIndex
CREATE INDEX "_CommitteeToPolitician_B_index" ON "_CommitteeToPolitician"("B");

-- AddForeignKey
ALTER TABLE "Politician" ADD CONSTRAINT "Politician_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "Party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GovernmentRole" ADD CONSTRAINT "GovernmentRole_politicianId_fkey" FOREIGN KEY ("politicianId") REFERENCES "Politician"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoteRecord" ADD CONSTRAINT "VoteRecord_politicianID_fkey" FOREIGN KEY ("politicianID") REFERENCES "Politician"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseProposer" ADD CONSTRAINT "CaseProposer_caseMetadataId_fkey" FOREIGN KEY ("caseMetadataId") REFERENCES "CaseMetadata"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseProposer" ADD CONSTRAINT "CaseProposer_politicianId_fkey" FOREIGN KEY ("politicianId") REFERENCES "Politician"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseCommitteProposer" ADD CONSTRAINT "CaseCommitteProposer_caseMetadataId_fkey" FOREIGN KEY ("caseMetadataId") REFERENCES "CaseMetadata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseCommitteProposer" ADD CONSTRAINT "CaseCommitteProposer_committeeId_fkey" FOREIGN KEY ("committeeId") REFERENCES "Committee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseSubject" ADD CONSTRAINT "CaseSubject_caseMetadataId_fkey" FOREIGN KEY ("caseMetadataId") REFERENCES "CaseMetadata"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseSubject" ADD CONSTRAINT "CaseSubject_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommitteeToPolitician" ADD CONSTRAINT "_CommitteeToPolitician_A_fkey" FOREIGN KEY ("A") REFERENCES "Committee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommitteeToPolitician" ADD CONSTRAINT "_CommitteeToPolitician_B_fkey" FOREIGN KEY ("B") REFERENCES "Politician"("id") ON DELETE CASCADE ON UPDATE CASCADE;

