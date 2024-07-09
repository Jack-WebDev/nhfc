/*
  Warnings:

  - The `damage` column on the `Vehicle` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "damage",
ADD COLUMN     "damage" TEXT[];
