/*
  Warnings:

  - Made the column `occurenceBookNumber` on table `Office` required. This step will fail if there are existing NULL values in that column.
  - Made the column `department` on table `Office` required. This step will fail if there are existing NULL values in that column.
  - Made the column `surname` on table `Office` required. This step will fail if there are existing NULL values in that column.
  - Made the column `initials` on table `Office` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rank` on table `Office` required. This step will fail if there are existing NULL values in that column.
  - Made the column `serviceNumber` on table `Office` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Office" ALTER COLUMN "occurenceBookNumber" SET NOT NULL,
ALTER COLUMN "department" SET NOT NULL,
ALTER COLUMN "surname" SET NOT NULL,
ALTER COLUMN "initials" SET NOT NULL,
ALTER COLUMN "rank" SET NOT NULL,
ALTER COLUMN "serviceNumber" SET NOT NULL;
