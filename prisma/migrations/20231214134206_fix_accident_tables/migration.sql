/*
  Warnings:

  - You are about to drop the column `vehicleCount` on the `Accident` table. All the data in the column will be lost.
  - You are about to drop the column `x_coordinates` on the `Accident` table. All the data in the column will be lost.
  - You are about to drop the column `y_coordinates` on the `Accident` table. All the data in the column will be lost.
  - You are about to drop the column `flatOrSloped` on the `GeneralDetail` table. All the data in the column will be lost.
  - You are about to drop the column `positionOfVehicleBeforeAccident` on the `GeneralDetail` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleId` on the `GeneralDetail` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleManoeuvre` on the `GeneralDetail` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleRef` on the `GeneralDetail` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleType` on the `GeneralDetail` table. All the data in the column will be lost.
  - You are about to drop the column `inspectedBy` on the `Office` table. All the data in the column will be lost.
  - You are about to drop the column `homeAddress` on the `Passenger` table. All the data in the column will be lost.
  - You are about to drop the column `pedestrianNumber` on the `Passenger` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleId` on the `Passenger` table. All the data in the column will be lost.
  - You are about to drop the column `gadjetAthand` on the `PersonObservation` table. All the data in the column will be lost.
  - You are about to drop the column `otherInformation` on the `PersonObservation` table. All the data in the column will be lost.
  - You are about to drop the column `passengerId` on the `PersonObservation` table. All the data in the column will be lost.
  - You are about to drop the column `personRef` on the `PersonObservation` table. All the data in the column will be lost.
  - You are about to drop the column `spaceCondition` on the `PersonObservation` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleId` on the `PersonObservation` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleRef` on the `PersonObservation` table. All the data in the column will be lost.
  - You are about to drop the column `addressddress` on the `Witness` table. All the data in the column will be lost.
  - You are about to drop the column `witnessType` on the `Witness` table. All the data in the column will be lost.
  - You are about to drop the `DangerousGoodsObservation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Licence` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PedestrianObservation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VehicleObservation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `courtData` to the `Accident` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discontinueUseOfVehicle` to the `Accident` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accidentId` to the `PersonObservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `driverRef` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `Witness` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Witness` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DangerousGoodsObservation" DROP CONSTRAINT "DangerousGoodsObservation_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "GeneralDetail" DROP CONSTRAINT "GeneralDetail_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "Licence" DROP CONSTRAINT "Licence_accidentId_fkey";

-- DropForeignKey
ALTER TABLE "Licence" DROP CONSTRAINT "Licence_driverId_fkey";

-- DropForeignKey
ALTER TABLE "Passenger" DROP CONSTRAINT "Passenger_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "PedestrianObservation" DROP CONSTRAINT "PedestrianObservation_accidentId_fkey";

-- DropForeignKey
ALTER TABLE "PedestrianObservation" DROP CONSTRAINT "PedestrianObservation_passengerId_fkey";

-- DropForeignKey
ALTER TABLE "PersonObservation" DROP CONSTRAINT "PersonObservation_passengerId_fkey";

-- DropForeignKey
ALTER TABLE "PersonObservation" DROP CONSTRAINT "PersonObservation_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "VehicleObservation" DROP CONSTRAINT "VehicleObservation_accidentId_fkey";

-- DropForeignKey
ALTER TABLE "VehicleObservation" DROP CONSTRAINT "VehicleObservation_vehicleId_fkey";

-- AlterTable
ALTER TABLE "Accident" DROP COLUMN "vehicleCount",
DROP COLUMN "x_coordinates",
DROP COLUMN "y_coordinates",
ADD COLUMN     "courtData" TEXT NOT NULL,
ADD COLUMN     "discontinueUseOfVehicle" TEXT NOT NULL,
ADD COLUMN     "numberOfVehicles" INTEGER,
ADD COLUMN     "observationColorOfClothing" TEXT,
ADD COLUMN     "observationLocation" TEXT,
ADD COLUMN     "observationManoeuvre" TEXT,
ADD COLUMN     "observationPedestrianAction" TEXT,
ADD COLUMN     "observationPersonRef" TEXT,
ADD COLUMN     "observationPosition" TEXT,
ADD COLUMN     "xCoordinates" TEXT,
ADD COLUMN     "yCoordinates" TEXT,
ALTER COLUMN "policeStation" DROP NOT NULL,
ALTER COLUMN "accidentType" DROP NOT NULL,
ALTER COLUMN "hitAndRun" DROP NOT NULL,
ALTER COLUMN "AR_number" DROP NOT NULL,
ALTER COLUMN "date" DROP NOT NULL,
ALTER COLUMN "day" DROP NOT NULL,
ALTER COLUMN "roadSpeedLimit" DROP NOT NULL,
ALTER COLUMN "time" DROP NOT NULL,
ALTER COLUMN "builtUpArea" DROP NOT NULL,
ALTER COLUMN "numberOfSlightlyInjured" DROP NOT NULL,
ALTER COLUMN "numberOfSeriouslyInjured" DROP NOT NULL,
ALTER COLUMN "numberOfNotInjured" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "licenceDateOfIssue" TEXT,
ADD COLUMN     "licenceNumber" TEXT,
ADD COLUMN     "licenceType" TEXT;

-- AlterTable
ALTER TABLE "GeneralDetail" DROP COLUMN "flatOrSloped",
DROP COLUMN "positionOfVehicleBeforeAccident",
DROP COLUMN "vehicleId",
DROP COLUMN "vehicleManoeuvre",
DROP COLUMN "vehicleRef",
DROP COLUMN "vehicleType",
ALTER COLUMN "lightCondition" DROP NOT NULL,
ALTER COLUMN "weatherConditionsAndVisibility" DROP NOT NULL,
ALTER COLUMN "roadSurfaceType" DROP NOT NULL,
ALTER COLUMN "qualityOfRoadSurface" DROP NOT NULL,
ALTER COLUMN "roadSurface" DROP NOT NULL,
ALTER COLUMN "roadMarkingVisibility" DROP NOT NULL,
ALTER COLUMN "obstructions" DROP NOT NULL,
ALTER COLUMN "overtakingControl" DROP NOT NULL,
ALTER COLUMN "traficControlType" DROP NOT NULL,
ALTER COLUMN "roadSignsClearlyVisible" DROP NOT NULL,
ALTER COLUMN "conditionOfRoadSigns" DROP NOT NULL,
ALTER COLUMN "directionOfRoad" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Office" DROP COLUMN "inspectedBy",
ADD COLUMN     "capturingNumber" TEXT,
ALTER COLUMN "officeType" DROP NOT NULL,
ALTER COLUMN "occurenceBookNumber" DROP NOT NULL,
ALTER COLUMN "department" DROP NOT NULL,
ALTER COLUMN "surname" DROP NOT NULL,
ALTER COLUMN "initials" DROP NOT NULL,
ALTER COLUMN "rank" DROP NOT NULL,
ALTER COLUMN "serviceNumber" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Passenger" DROP COLUMN "homeAddress",
DROP COLUMN "pedestrianNumber",
DROP COLUMN "vehicleId",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "age" INTEGER,
ADD COLUMN     "cellphoneNumberType" TEXT,
ALTER COLUMN "vehicleNumber" SET DATA TYPE TEXT,
ALTER COLUMN "idType" DROP NOT NULL,
ALTER COLUMN "idNumber" DROP NOT NULL,
ALTER COLUMN "telephoneNumber" DROP NOT NULL,
ALTER COLUMN "telephoneNumberType" DROP NOT NULL,
ALTER COLUMN "pedestrian" SET DATA TYPE TEXT,
ALTER COLUMN "cellphoneNumber" DROP NOT NULL,
ALTER COLUMN "race" DROP NOT NULL,
ALTER COLUMN "gender" DROP NOT NULL,
ALTER COLUMN "safetyPresent" DROP NOT NULL,
ALTER COLUMN "safetyPresent" SET DATA TYPE TEXT,
ALTER COLUMN "safetyUsed" DROP NOT NULL,
ALTER COLUMN "safetyUsed" SET DATA TYPE TEXT,
ALTER COLUMN "influenceSuspected" DROP NOT NULL,
ALTER COLUMN "influenceSuspected" SET DATA TYPE TEXT,
ALTER COLUMN "influenceTested" DROP NOT NULL,
ALTER COLUMN "influenceTested" SET DATA TYPE TEXT,
ALTER COLUMN "passengerInjury" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PersonObservation" DROP COLUMN "gadjetAthand",
DROP COLUMN "otherInformation",
DROP COLUMN "passengerId",
DROP COLUMN "personRef",
DROP COLUMN "spaceCondition",
DROP COLUMN "vehicleId",
DROP COLUMN "vehicleRef",
ADD COLUMN     "accidentId" TEXT NOT NULL,
ADD COLUMN     "instrument" BOOLEAN,
ADD COLUMN     "otherInfo" TEXT,
ADD COLUMN     "personNumber" TEXT,
ADD COLUMN     "trapped" TEXT,
ADD COLUMN     "vehicleNumber" TEXT;

-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN     "chevronQuality" TEXT,
ADD COLUMN     "codeSin" TEXT,
ADD COLUMN     "damage" TEXT,
ADD COLUMN     "dangerousGoodPlacard" TEXT,
ADD COLUMN     "dangerousGoodsCarried" TEXT,
ADD COLUMN     "driverRef" TEXT NOT NULL,
ADD COLUMN     "gasEmmissionOccured" TEXT,
ADD COLUMN     "lengthOfSkidMarks" TEXT,
ADD COLUMN     "lights" TEXT,
ADD COLUMN     "manoeuvre" TEXT,
ADD COLUMN     "otherComment" TEXT,
ADD COLUMN     "position" TEXT,
ADD COLUMN     "reflectorQuality" TEXT,
ADD COLUMN     "slope" TEXT,
ADD COLUMN     "splillageOccured" TEXT,
ADD COLUMN     "tiresBurst" TEXT,
ADD COLUMN     "type" TEXT,
ALTER COLUMN "travelDirection" DROP NOT NULL,
ALTER COLUMN "plateNumber" DROP NOT NULL,
ALTER COLUMN "color" DROP NOT NULL,
ALTER COLUMN "make" DROP NOT NULL,
ALTER COLUMN "model" DROP NOT NULL,
ALTER COLUMN "carryPassengersForReward" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Witness" DROP COLUMN "addressddress",
DROP COLUMN "witnessType",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- DropTable
DROP TABLE "DangerousGoodsObservation";

-- DropTable
DROP TABLE "Licence";

-- DropTable
DROP TABLE "PedestrianObservation";

-- DropTable
DROP TABLE "VehicleObservation";

-- CreateTable
CREATE TABLE "Area" (
    "id" TEXT NOT NULL,
    "accidentId" TEXT NOT NULL,
    "areaType" TEXT NOT NULL,
    "intersection" TEXT,
    "between" TEXT,
    "and" TEXT,
    "suburb" TEXT,
    "townName" TEXT,
    "approximateDistance" TEXT,
    "direction" TEXT,
    "from" TEXT,
    "kmMarker" TEXT,
    "kmMarkerDistance" TEXT,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Area" ADD CONSTRAINT "Area_accidentId_fkey" FOREIGN KEY ("accidentId") REFERENCES "Accident"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonObservation" ADD CONSTRAINT "PersonObservation_accidentId_fkey" FOREIGN KEY ("accidentId") REFERENCES "Accident"("id") ON DELETE CASCADE ON UPDATE CASCADE;
