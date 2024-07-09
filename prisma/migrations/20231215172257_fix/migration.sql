/*
  Warnings:

  - Made the column `idType` on table `Driver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `idNumber` on table `Driver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `age` on table `Driver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country` on table `Driver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `surname` on table `Driver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fullNames` on table `Driver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `initials` on table `Driver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `homeAddress` on table `Driver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `telephoneNumber` on table `Driver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `telephoneNumberType` on table `Driver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `workAddress` on table `Driver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cellphoneNumber` on table `Driver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `race` on table `Driver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gender` on table `Driver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `injury` on table `Driver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `safetyPresent` on table `Driver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `safetyUsed` on table `Driver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `influenceSuspected` on table `Driver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `influenceTested` on table `Driver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `anyPassengerOrPedestrian` on table `Driver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `licenceDateOfIssue` on table `Driver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `licenceNumber` on table `Driver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `licenceType` on table `Driver` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Driver" ALTER COLUMN "idType" SET NOT NULL,
ALTER COLUMN "idNumber" SET NOT NULL,
ALTER COLUMN "age" SET NOT NULL,
ALTER COLUMN "country" SET NOT NULL,
ALTER COLUMN "surname" SET NOT NULL,
ALTER COLUMN "fullNames" SET NOT NULL,
ALTER COLUMN "initials" SET NOT NULL,
ALTER COLUMN "homeAddress" SET NOT NULL,
ALTER COLUMN "telephoneNumber" SET NOT NULL,
ALTER COLUMN "telephoneNumberType" SET NOT NULL,
ALTER COLUMN "workAddress" SET NOT NULL,
ALTER COLUMN "cellphoneNumber" SET NOT NULL,
ALTER COLUMN "race" SET NOT NULL,
ALTER COLUMN "gender" SET NOT NULL,
ALTER COLUMN "injury" SET NOT NULL,
ALTER COLUMN "safetyPresent" SET NOT NULL,
ALTER COLUMN "safetyUsed" SET NOT NULL,
ALTER COLUMN "influenceSuspected" SET NOT NULL,
ALTER COLUMN "influenceTested" SET NOT NULL,
ALTER COLUMN "anyPassengerOrPedestrian" SET NOT NULL,
ALTER COLUMN "licenceDateOfIssue" SET NOT NULL,
ALTER COLUMN "licenceNumber" SET NOT NULL,
ALTER COLUMN "licenceType" SET NOT NULL;
