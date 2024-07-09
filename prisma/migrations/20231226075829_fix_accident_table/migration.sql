/*
  Warnings:

  - A unique constraint covering the columns `[AR_number]` on the table `Accident` will be added. If there are existing duplicate values, this will fail.
  - Made the column `AR_number` on table `Accident` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Accident" ALTER COLUMN "AR_number" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Accident_AR_number_key" ON "Accident"("AR_number");
