/*
  Warnings:

  - Made the column `surname` on table `Passenger` required. This step will fail if there are existing NULL values in that column.
  - Made the column `initials` on table `Passenger` required. This step will fail if there are existing NULL values in that column.
  - Made the column `passengerNumber` on table `Passenger` required. This step will fail if there are existing NULL values in that column.
  - Made the column `vehicleNumber` on table `Passenger` required. This step will fail if there are existing NULL values in that column.
  - Made the column `idNumber` on table `Passenger` required. This step will fail if there are existing NULL values in that column.
  - Made the column `telephoneNumber` on table `Passenger` required. This step will fail if there are existing NULL values in that column.
  - Made the column `telephoneNumberType` on table `Passenger` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Passenger" ALTER COLUMN "surname" SET NOT NULL,
ALTER COLUMN "initials" SET NOT NULL,
ALTER COLUMN "passengerNumber" SET NOT NULL,
ALTER COLUMN "vehicleNumber" SET NOT NULL,
ALTER COLUMN "idNumber" SET NOT NULL,
ALTER COLUMN "telephoneNumber" SET NOT NULL,
ALTER COLUMN "telephoneNumberType" SET NOT NULL;
