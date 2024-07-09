/*
  Warnings:

  - Made the column `idNumber` on table `Passenger` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Passenger" ALTER COLUMN "idNumber" SET NOT NULL;
