/*
  Warnings:

  - You are about to drop the column `licenseCode` on the `Driver` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Driver" DROP COLUMN "licenseCode",
ADD COLUMN     "licenceCode" TEXT;
