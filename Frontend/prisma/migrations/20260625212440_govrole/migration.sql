/*
  Warnings:

  - The primary key for the `GovernmentRole` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `PoliticianId` on the `GovernmentRole` table. All the data in the column will be lost.
  - You are about to drop the column `department` on the `GovernmentRole` table. All the data in the column will be lost.
  - You are about to drop the column `logoURL` on the `Party` table. All the data in the column will be lost.
  - Added the required column `departement` to the `GovernmentRole` table without a default value. This is not possible if the table is not empty.
  - Added the required column `politicianId` to the `GovernmentRole` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GovernmentRole" DROP CONSTRAINT "GovernmentRole_PoliticianId_fkey";

-- AlterTable
ALTER TABLE "GovernmentRole" DROP CONSTRAINT "GovernmentRole_pkey",
DROP COLUMN "PoliticianId",
DROP COLUMN "department",
ADD COLUMN     "departement" TEXT NOT NULL,
ADD COLUMN     "politicianId" TEXT NOT NULL,
ADD CONSTRAINT "GovernmentRole_pkey" PRIMARY KEY ("politicianId");

-- AlterTable
ALTER TABLE "Party" DROP COLUMN "logoURL";

-- AddForeignKey
ALTER TABLE "GovernmentRole" ADD CONSTRAINT "GovernmentRole_politicianId_fkey" FOREIGN KEY ("politicianId") REFERENCES "Politician"("id") ON DELETE CASCADE ON UPDATE CASCADE;
