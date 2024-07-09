/*
  Warnings:

  - Made the column `instrument` on table `PersonObservation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `personNumber` on table `PersonObservation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `trapped` on table `PersonObservation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `vehicleNumber` on table `PersonObservation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PersonObservation" ALTER COLUMN "instrument" SET NOT NULL,
ALTER COLUMN "instrument" SET DATA TYPE TEXT,
ALTER COLUMN "personNumber" SET NOT NULL,
ALTER COLUMN "trapped" SET NOT NULL,
ALTER COLUMN "vehicleNumber" SET NOT NULL;
