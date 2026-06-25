/*
  Warnings:

  - Added the required column `representative` to the `Politician` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Politician" ADD COLUMN     "representative" BOOLEAN NOT NULL;
