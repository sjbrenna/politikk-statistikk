-- CreateTable
CREATE TABLE "Committee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Committee_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "_Subjects" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_Subjects_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CommitteeToPolitician_B_index" ON "_CommitteeToPolitician"("B");

-- CreateIndex
CREATE INDEX "_Subjects_B_index" ON "_Subjects"("B");

-- AddForeignKey
ALTER TABLE "_CommitteeToPolitician" ADD CONSTRAINT "_CommitteeToPolitician_A_fkey" FOREIGN KEY ("A") REFERENCES "Committee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommitteeToPolitician" ADD CONSTRAINT "_CommitteeToPolitician_B_fkey" FOREIGN KEY ("B") REFERENCES "Politician"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Subjects" ADD CONSTRAINT "_Subjects_A_fkey" FOREIGN KEY ("A") REFERENCES "CaseMetadata"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Subjects" ADD CONSTRAINT "_Subjects_B_fkey" FOREIGN KEY ("B") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
