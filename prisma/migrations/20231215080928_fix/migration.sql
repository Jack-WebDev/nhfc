/*
  Warnings:

  - You are about to drop the column `vehicleCount` on the `Accident` table. All the data in the column will be lost.
  - Added the required column `numberOfVehicles` to the `Accident` table without a default value. This is not possible if the table is not empty.
  - Made the column `hitAndRun` on table `Accident` required. This step will fail if there are existing NULL values in that column.
  - Made the column `roadSpeedLimit` on table `Accident` required. This step will fail if there are existing NULL values in that column.
  - Made the column `builtUpArea` on table `Accident` required. This step will fail if there are existing NULL values in that column.
  - Made the column `numberOfDead` on table `Accident` required. This step will fail if there are existing NULL values in that column.
  - Made the column `numberOfSlightlyInjured` on table `Accident` required. This step will fail if there are existing NULL values in that column.
  - Made the column `numberOfSeriouslyInjured` on table `Accident` required. This step will fail if there are existing NULL values in that column.
  - Made the column `numberOfNotInjured` on table `Accident` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Accident" DROP COLUMN "vehicleCount",
ADD COLUMN     "numberOfVehicles" INTEGER NOT NULL,
ALTER COLUMN "hitAndRun" SET NOT NULL,
ALTER COLUMN "roadSpeedLimit" SET NOT NULL,
ALTER COLUMN "builtUpArea" SET NOT NULL,
ALTER COLUMN "numberOfDead" SET NOT NULL,
ALTER COLUMN "numberOfSlightlyInjured" SET NOT NULL,
ALTER COLUMN "numberOfSeriouslyInjured" SET NOT NULL,
ALTER COLUMN "numberOfNotInjured" SET NOT NULL,
ALTER COLUMN "courtData" DROP NOT NULL,
ALTER COLUMN "discontinueUseOfVehicle" DROP NOT NULL;
