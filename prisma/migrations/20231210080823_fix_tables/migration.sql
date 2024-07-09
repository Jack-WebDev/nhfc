/*
  Warnings:

  - You are about to drop the column `directionOrRoad` on the `GeneralDetail` table. All the data in the column will be lost.
  - You are about to drop the column `accidentregisterNumber` on the `Office` table. All the data in the column will be lost.
  - You are about to drop the column `sapscaseNumber` on the `Office` table. All the data in the column will be lost.
  - You are about to drop the column `injury` on the `Passenger` table. All the data in the column will be lost.
  - You are about to drop the `DangerousgoodsObservation` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `vehicleCount` on the `Accident` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `directionOfRoad` to the `GeneralDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passengerInjury` to the `Passenger` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DangerousgoodsObservation" DROP CONSTRAINT "DangerousgoodsObservation_vehicleId_fkey";

-- AlterTable
ALTER TABLE "Accident" ALTER COLUMN "date" SET DATA TYPE TEXT,
DROP COLUMN "vehicleCount",
ADD COLUMN     "vehicleCount" INTEGER NOT NULL,
ALTER COLUMN "time" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Driver" ALTER COLUMN "safetyPresent" SET DATA TYPE TEXT,
ALTER COLUMN "safetyUsed" SET DATA TYPE TEXT,
ALTER COLUMN "influenceSuspected" SET DATA TYPE TEXT,
ALTER COLUMN "influenceTested" SET DATA TYPE TEXT,
ALTER COLUMN "anyPassengerOrPedestrian" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "GeneralDetail" DROP COLUMN "directionOrRoad",
ADD COLUMN     "directionOfRoad" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Office" DROP COLUMN "accidentregisterNumber",
DROP COLUMN "sapscaseNumber",
ADD COLUMN     "accidentRegisterNumber" TEXT,
ADD COLUMN     "sapsCaseNumber" TEXT;

-- AlterTable
ALTER TABLE "Passenger" DROP COLUMN "injury",
ADD COLUMN     "passengerInjury" TEXT NOT NULL;

-- DropTable
DROP TABLE "DangerousgoodsObservation";

-- CreateTable
CREATE TABLE "DangerousGoodsObservation" (
    "id" TEXT NOT NULL,
    "vehicleRef" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "dangerousGoodsCarried" BOOLEAN NOT NULL,
    "splillageOccured" BOOLEAN NOT NULL,
    "gasEmmissionOccured" BOOLEAN NOT NULL,
    "dangerousGoodPlacard" BOOLEAN NOT NULL,
    "codeSin" TEXT NOT NULL,

    CONSTRAINT "DangerousGoodsObservation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DangerousGoodsObservation" ADD CONSTRAINT "DangerousGoodsObservation_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
