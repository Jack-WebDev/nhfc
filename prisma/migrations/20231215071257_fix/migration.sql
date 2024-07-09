/*
  Warnings:

  - Added the required column `idType` to the `Passenger` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Passenger" DROP COLUMN "idType",
ADD COLUMN     "idType" INTEGER NOT NULL;
