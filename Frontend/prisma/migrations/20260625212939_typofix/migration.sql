/*
  Warnings:

  - You are about to drop the column `departement` on the `GovernmentRole` table. All the data in the column will be lost.
  - Added the required column `department` to the `GovernmentRole` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GovernmentRole" DROP COLUMN "departement",
ADD COLUMN     "department" TEXT NOT NULL;
