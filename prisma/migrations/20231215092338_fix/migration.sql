/*
  Warnings:

  - You are about to drop the column `xCoordinates` on the `Accident` table. All the data in the column will be lost.
  - You are about to drop the column `yCoordinates` on the `Accident` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Accident" DROP COLUMN "xCoordinates",
DROP COLUMN "yCoordinates",
ADD COLUMN     "xCoordinate" TEXT,
ADD COLUMN     "yCoordinate" TEXT;
