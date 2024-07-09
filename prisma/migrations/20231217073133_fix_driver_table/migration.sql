-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "licenseCode" TEXT,
ALTER COLUMN "licenceDateOfIssue" DROP NOT NULL,
ALTER COLUMN "licenceNumber" DROP NOT NULL;
