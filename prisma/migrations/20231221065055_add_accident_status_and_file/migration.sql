-- CreateEnum
CREATE TYPE "AccidentStatus" AS ENUM ('Complete', 'Incomplete');

-- AlterTable
ALTER TABLE "Accident" ADD COLUMN     "status" "AccidentStatus" NOT NULL DEFAULT 'Incomplete';

-- CreateTable
CREATE TABLE "AccidentFile" (
    "id" TEXT NOT NULL,
    "accidentId" TEXT NOT NULL,
    "file" TEXT NOT NULL,

    CONSTRAINT "AccidentFile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AccidentFile" ADD CONSTRAINT "AccidentFile_accidentId_fkey" FOREIGN KEY ("accidentId") REFERENCES "Accident"("id") ON DELETE CASCADE ON UPDATE CASCADE;
