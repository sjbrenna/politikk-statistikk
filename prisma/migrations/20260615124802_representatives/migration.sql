-- CreateTable
CREATE TABLE "Representative" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "partyId" TEXT NOT NULL,

    CONSTRAINT "Representative_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Representative" ADD CONSTRAINT "Representative_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "Party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
