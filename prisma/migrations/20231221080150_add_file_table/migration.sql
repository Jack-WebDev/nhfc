/*
  Warnings:

  - Added the required column `fileType` to the `AccidentFile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AccidentFile" ADD COLUMN     "fileType" TEXT NOT NULL;
