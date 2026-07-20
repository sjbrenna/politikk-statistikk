-- CreateTable
CREATE TABLE "Politician" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "partyId" TEXT NOT NULL,

    CONSTRAINT "Politician_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Politician" ADD CONSTRAINT "Politician_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "Party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
