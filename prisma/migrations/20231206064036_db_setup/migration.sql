-- CreateEnum
CREATE TYPE "UserActivity" AS ENUM ('User_Management', 'Batch_Management', 'Book_Management', 'Notice_Management');

-- CreateEnum
CREATE TYPE "BookStatus" AS ENUM ('Issued', 'Handed_In', 'New_Stock', 'Complete', 'Re_Issued');

-- CreateEnum
CREATE TYPE "UserActivityAction" AS ENUM ('Create', 'Delete', 'Update');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('Active', 'Inactive', 'Removed');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('Admin', 'Data_Capture', 'Camera_Uploader', 'Traffic_Officer');

-- CreateEnum
CREATE TYPE "UserEthnicity" AS ENUM ('Black', 'Coloured', 'White', 'Indian', 'Asian');

-- CreateEnum
CREATE TYPE "UserTitle" AS ENUM ('Mr', 'Mrs', 'Miss', 'Ms', 'Dr');

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "refreshToken" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "userId" TEXT,
    "batchId" INTEGER,
    "bookNumber" INTEGER,
    "activity" "UserActivity" NOT NULL,
    "activityAction" "UserActivityAction" NOT NULL,
    "message" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Otp" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "otp" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Otp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "title" "UserTitle" NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "IdNumber" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "ethnicity" "UserEthnicity" NOT NULL,
    "role" "UserRole" NOT NULL,
    "gender" TEXT,
    "status" "UserStatus" NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "passwordChangedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nextPasswordChangedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Batch" (
    "batchId" SERIAL NOT NULL,
    "batchType" INTEGER NOT NULL,
    "firstNotice" INTEGER NOT NULL,
    "lastNotice" INTEGER NOT NULL,
    "capturedBy" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Batch_pkey" PRIMARY KEY ("batchId")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "batchId" INTEGER NOT NULL,
    "bookType" INTEGER NOT NULL,
    "bookNumber" INTEGER NOT NULL,
    "firstNotice" INTEGER NOT NULL,
    "lastNotice" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "complete" INTEGER NOT NULL,
    "officerId" TEXT,
    "status" "BookStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" TIMESTAMP(3),

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notice" (
    "id" TEXT NOT NULL,
    "bookNumber" INTEGER NOT NULL,
    "noticeNumber" INTEGER NOT NULL,
    "check" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'New',

    CONSTRAINT "Notice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Session_userId_key" ON "Session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Otp_userId_key" ON "Otp"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Otp_otp_key" ON "Otp"("otp");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_IdNumber_key" ON "User"("IdNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Batch_batchId_key" ON "Batch"("batchId");

-- CreateIndex
CREATE UNIQUE INDEX "Book_bookNumber_key" ON "Book"("bookNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Book_firstNotice_key" ON "Book"("firstNotice");

-- CreateIndex
CREATE UNIQUE INDEX "Book_lastNotice_key" ON "Book"("lastNotice");

-- CreateIndex
CREATE UNIQUE INDEX "Notice_noticeNumber_key" ON "Notice"("noticeNumber");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Otp" ADD CONSTRAINT "Otp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Batch" ADD CONSTRAINT "Batch_capturedBy_fkey" FOREIGN KEY ("capturedBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("batchId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_officerId_fkey" FOREIGN KEY ("officerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notice" ADD CONSTRAINT "Notice_bookNumber_fkey" FOREIGN KEY ("bookNumber") REFERENCES "Book"("bookNumber") ON DELETE CASCADE ON UPDATE CASCADE;
