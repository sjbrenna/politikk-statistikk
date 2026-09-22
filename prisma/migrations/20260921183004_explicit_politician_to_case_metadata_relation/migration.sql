-- CreateTable
CREATE TABLE "CaseProposer" (
    "caseMetadataId" TEXT NOT NULL,
    "politicianId" TEXT NOT NULL,

    CONSTRAINT "CaseProposer_pkey" PRIMARY KEY ("caseMetadataId","politicianId")
);

-- AddForeignKey
ALTER TABLE "CaseProposer" ADD CONSTRAINT "CaseProposer_caseMetadataId_fkey" FOREIGN KEY ("caseMetadataId") REFERENCES "CaseMetadata"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseProposer" ADD CONSTRAINT "CaseProposer_politicianId_fkey" FOREIGN KEY ("politicianId") REFERENCES "Politician"("id") ON DELETE CASCADE ON UPDATE CASCADE;
