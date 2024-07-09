/*
  Warnings:

  - Made the column `officeType` on table `Office` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Office" ALTER COLUMN "officeType" SET NOT NULL;
