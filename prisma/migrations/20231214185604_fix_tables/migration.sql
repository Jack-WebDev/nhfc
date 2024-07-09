/*
  Warnings:

  - You are about to drop the column `numberOfVehicles` on the `Accident` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Accident" DROP COLUMN "numberOfVehicles",
ADD COLUMN     "vehicleCount" INTEGER;
