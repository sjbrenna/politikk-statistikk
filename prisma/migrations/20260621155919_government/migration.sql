-- CreateTable
CREATE TABLE "GovernmentRole" (
    "PoliticianId" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "GovernmentRole_pkey" PRIMARY KEY ("PoliticianId")
);

-- AddForeignKey
ALTER TABLE "GovernmentRole" ADD CONSTRAINT "GovernmentRole_PoliticianId_fkey" FOREIGN KEY ("PoliticianId") REFERENCES "Politician"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
