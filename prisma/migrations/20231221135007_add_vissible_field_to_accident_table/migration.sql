-- CreateEnum
CREATE TYPE "AccidentVisibility" AS ENUM ('Vissible', 'Invissible');

-- AlterTable
ALTER TABLE "Accident" ADD COLUMN     "visibility" "AccidentVisibility" NOT NULL DEFAULT 'Vissible';
