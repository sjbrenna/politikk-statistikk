/*
  Warnings:

  - You are about to drop the `_Subjects` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Subjects" DROP CONSTRAINT "_Subjects_A_fkey";

-- DropForeignKey
ALTER TABLE "_Subjects" DROP CONSTRAINT "_Subjects_B_fkey";

-- DropTable
DROP TABLE "_Subjects";

-- CreateTable
CREATE TABLE "CaseSubject" (
    "caseMetadataId" TEXT NOT NULL,
    "subjectId" INTEGER NOT NULL,

    CONSTRAINT "CaseSubject_pkey" PRIMARY KEY ("caseMetadataId","subjectId")
);

-- AddForeignKey
ALTER TABLE "CaseSubject" ADD CONSTRAINT "CaseSubject_caseMetadataId_fkey" FOREIGN KEY ("caseMetadataId") REFERENCES "CaseMetadata"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseSubject" ADD CONSTRAINT "CaseSubject_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
