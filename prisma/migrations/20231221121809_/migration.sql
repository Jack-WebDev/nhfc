/*
  Warnings:

  - A unique constraint covering the columns `[accidentId]` on the table `AccidentFile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AccidentFile_accidentId_key" ON "AccidentFile"("accidentId");
