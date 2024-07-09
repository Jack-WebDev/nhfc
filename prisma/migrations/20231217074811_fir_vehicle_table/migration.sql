/*
  Warnings:

  - Made the column `travelDirection` on table `Vehicle` required. This step will fail if there are existing NULL values in that column.
  - Made the column `plateNumber` on table `Vehicle` required. This step will fail if there are existing NULL values in that column.
  - Made the column `color` on table `Vehicle` required. This step will fail if there are existing NULL values in that column.
  - Made the column `make` on table `Vehicle` required. This step will fail if there are existing NULL values in that column.
  - Made the column `model` on table `Vehicle` required. This step will fail if there are existing NULL values in that column.
  - Made the column `carryPassengersForReward` on table `Vehicle` required. This step will fail if there are existing NULL values in that column.
  - Made the column `damage` on table `Vehicle` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dangerousGoodsCarried` on table `Vehicle` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lights` on table `Vehicle` required. This step will fail if there are existing NULL values in that column.
  - Made the column `manoeuvre` on table `Vehicle` required. This step will fail if there are existing NULL values in that column.
  - Made the column `position` on table `Vehicle` required. This step will fail if there are existing NULL values in that column.
  - Made the column `slope` on table `Vehicle` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tiresBurst` on table `Vehicle` required. This step will fail if there are existing NULL values in that column.
  - Made the column `type` on table `Vehicle` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Vehicle" ALTER COLUMN "travelDirection" SET NOT NULL,
ALTER COLUMN "plateNumber" SET NOT NULL,
ALTER COLUMN "color" SET NOT NULL,
ALTER COLUMN "make" SET NOT NULL,
ALTER COLUMN "model" SET NOT NULL,
ALTER COLUMN "carryPassengersForReward" SET NOT NULL,
ALTER COLUMN "carryPassengersForReward" SET DATA TYPE TEXT,
ALTER COLUMN "damage" SET NOT NULL,
ALTER COLUMN "dangerousGoodsCarried" SET NOT NULL,
ALTER COLUMN "lights" SET NOT NULL,
ALTER COLUMN "manoeuvre" SET NOT NULL,
ALTER COLUMN "position" SET NOT NULL,
ALTER COLUMN "slope" SET NOT NULL,
ALTER COLUMN "tiresBurst" SET NOT NULL,
ALTER COLUMN "type" SET NOT NULL;
