/*
  Warnings:

  - Made the column `policeStation` on table `Accident` required. This step will fail if there are existing NULL values in that column.
  - Made the column `accidentType` on table `Accident` required. This step will fail if there are existing NULL values in that column.
  - Made the column `date` on table `Accident` required. This step will fail if there are existing NULL values in that column.
  - Made the column `day` on table `Accident` required. This step will fail if there are existing NULL values in that column.
  - Made the column `time` on table `Accident` required. This step will fail if there are existing NULL values in that column.
  - Made the column `vehicleCount` on table `Accident` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Accident" ALTER COLUMN "policeStation" SET NOT NULL,
ALTER COLUMN "accidentType" SET NOT NULL,
ALTER COLUMN "date" SET NOT NULL,
ALTER COLUMN "day" SET NOT NULL,
ALTER COLUMN "time" SET NOT NULL,
ALTER COLUMN "province" SET DEFAULT 'KZN',
ALTER COLUMN "junctionType" DROP NOT NULL,
ALTER COLUMN "vehicleCount" SET NOT NULL;

-- AlterTable
ALTER TABLE "Driver" ALTER COLUMN "idType" DROP NOT NULL,
ALTER COLUMN "idNumber" DROP NOT NULL,
ALTER COLUMN "age" DROP NOT NULL,
ALTER COLUMN "country" DROP NOT NULL,
ALTER COLUMN "surname" DROP NOT NULL,
ALTER COLUMN "fullNames" DROP NOT NULL,
ALTER COLUMN "homeAddress" DROP NOT NULL,
ALTER COLUMN "telephoneNumber" DROP NOT NULL,
ALTER COLUMN "telephoneNumberType" DROP NOT NULL,
ALTER COLUMN "workAddress" DROP NOT NULL,
ALTER COLUMN "cellphoneNumber" DROP NOT NULL,
ALTER COLUMN "race" DROP NOT NULL,
ALTER COLUMN "gender" DROP NOT NULL,
ALTER COLUMN "injury" DROP NOT NULL,
ALTER COLUMN "safetyPresent" DROP NOT NULL,
ALTER COLUMN "safetyUsed" DROP NOT NULL,
ALTER COLUMN "influenceSuspected" DROP NOT NULL,
ALTER COLUMN "influenceTested" DROP NOT NULL,
ALTER COLUMN "anyPassengerOrPedestrian" DROP NOT NULL;
