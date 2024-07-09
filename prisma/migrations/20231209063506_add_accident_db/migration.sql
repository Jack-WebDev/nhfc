-- CreateTable
CREATE TABLE "Accident" (
    "id" TEXT NOT NULL,
    "policeStation" TEXT NOT NULL,
    "accidentType" TEXT NOT NULL,
    "hitAndRun" BOOLEAN NOT NULL,
    "AR_number" TEXT NOT NULL,
    "caseNumber" TEXT,
    "serialNumber" TEXT,
    "capturingNumber" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "day" TEXT NOT NULL,
    "vehicleCount" TEXT NOT NULL,
    "roadSpeedLimit" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "builtUpArea" BOOLEAN NOT NULL,
    "province" TEXT NOT NULL,
    "roadName" TEXT,
    "roadNumber" TEXT,
    "street" TEXT,
    "roadType" TEXT NOT NULL,
    "junctionType" TEXT NOT NULL,
    "x_coordinates" TEXT NOT NULL,
    "y_coordinates" TEXT NOT NULL,
    "numberOfDead" INTEGER NOT NULL,
    "numberOfSlightlyInjured" INTEGER NOT NULL,
    "numberOfSeriouslyInjured" INTEGER NOT NULL,
    "numberOfNotInjured" INTEGER NOT NULL,
    "descriptionD1" TEXT NOT NULL,
    "descriptionD2" TEXT NOT NULL,

    CONSTRAINT "Accident_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Driver" (
    "id" TEXT NOT NULL,
    "accidentId" TEXT NOT NULL,
    "idType" INTEGER NOT NULL,
    "idNumber" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "fullNames" TEXT NOT NULL,
    "initials" TEXT,
    "homeAddress" TEXT NOT NULL,
    "telephoneNumber" TEXT NOT NULL,
    "telephoneNumberType" TEXT NOT NULL,
    "workAddress" TEXT NOT NULL,
    "cellphoneNumber" TEXT NOT NULL,
    "race" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "injury" TEXT NOT NULL,
    "safetyPresent" BOOLEAN NOT NULL,
    "safetyUsed" BOOLEAN NOT NULL,
    "influenceSuspected" BOOLEAN NOT NULL,
    "influenceTested" BOOLEAN NOT NULL,
    "anyPassengerOrPedestrian" BOOLEAN NOT NULL,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Licence" (
    "id" TEXT NOT NULL,
    "accidentId" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "driverRef" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "licenceNumber" TEXT NOT NULL,
    "dateOfIssue" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Licence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "accidentId" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "travelDirection" TEXT NOT NULL,
    "plateNumber" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "trailer1Plate" TEXT,
    "trailer2Plate" TEXT,
    "carryPassengersForReward" BOOLEAN NOT NULL,
    "breakdownCompanyName" TEXT,
    "breakdownTelephoneNumber" TEXT,
    "breakdowndriverName" TEXT,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeneralDetail" (
    "id" TEXT NOT NULL,
    "accidentId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "vehicleRef" TEXT NOT NULL,
    "vehicleType" TEXT NOT NULL,
    "lightCondition" TEXT NOT NULL,
    "weatherConditionsAndVisibility" TEXT NOT NULL,
    "roadSurfaceType" TEXT NOT NULL,
    "qualityOfRoadSurface" TEXT NOT NULL,
    "roadSurface" TEXT NOT NULL,
    "roadMarkingVisibility" TEXT NOT NULL,
    "obstructions" TEXT NOT NULL,
    "overtakingControl" TEXT NOT NULL,
    "traficControlType" TEXT NOT NULL,
    "roadSignsClearlyVisible" TEXT NOT NULL,
    "conditionOfRoadSigns" TEXT NOT NULL,
    "directionOrRoad" TEXT NOT NULL,
    "flatOrSloped" TEXT NOT NULL,
    "positionOfVehicleBeforeAccident" TEXT NOT NULL,
    "vehicleManoeuvre" TEXT NOT NULL,
    "vehicleDagame" TEXT[],

    CONSTRAINT "GeneralDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Passenger" (
    "id" TEXT NOT NULL,
    "injury" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "initials" TEXT NOT NULL,
    "accidentId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "passengerNumber" INTEGER NOT NULL,
    "vehicleNumber" INTEGER NOT NULL,
    "idType" TEXT NOT NULL,
    "idNumber" TEXT NOT NULL,
    "telephoneNumber" TEXT NOT NULL,
    "telephoneNumberType" TEXT NOT NULL,
    "pedestrian" BOOLEAN,
    "pedestrianNumber" INTEGER,
    "country" TEXT,
    "homeAddress" TEXT,
    "cellphoneNumber" TEXT NOT NULL,
    "race" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "safetyPresent" BOOLEAN NOT NULL,
    "safetyUsed" BOOLEAN NOT NULL,
    "influenceSuspected" BOOLEAN NOT NULL,
    "influenceTested" BOOLEAN NOT NULL,

    CONSTRAINT "Passenger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Witness" (
    "id" TEXT NOT NULL,
    "accidentId" TEXT NOT NULL,
    "witnessType" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "initials" TEXT NOT NULL,
    "addressddress" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,

    CONSTRAINT "Witness_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonObservation" (
    "id" TEXT NOT NULL,
    "passengerId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "personRef" TEXT NOT NULL,
    "vehicleRef" TEXT NOT NULL,
    "spaceCondition" TEXT NOT NULL,
    "gadjetAthand" BOOLEAN NOT NULL,
    "otherInformation" TEXT NOT NULL,

    CONSTRAINT "PersonObservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleObservation" (
    "id" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "accidentId" TEXT NOT NULL,
    "vehicleRef" TEXT NOT NULL,
    "tiresBurst" TEXT NOT NULL,
    "lengthOfSkidMarks" DECIMAL(65,30) NOT NULL,
    "lights" TEXT NOT NULL,
    "reflectorQuality" TEXT NOT NULL,
    "chevronQuality" TEXT NOT NULL,
    "otherComment" TEXT NOT NULL,

    CONSTRAINT "VehicleObservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PedestrianObservation" (
    "id" TEXT NOT NULL,
    "accidentId" TEXT NOT NULL,
    "personRef" TEXT NOT NULL,
    "passengerId" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "manoeuvre" TEXT NOT NULL,
    "pedestrianAction" TEXT NOT NULL,
    "colorOfClothing" TEXT NOT NULL,

    CONSTRAINT "PedestrianObservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DangerousgoodsObservation" (
    "id" TEXT NOT NULL,
    "vehicleRef" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "dangerousGoodsCarried" BOOLEAN NOT NULL,
    "splillageOccured" BOOLEAN NOT NULL,
    "gasEmmissionOccured" BOOLEAN NOT NULL,
    "dangerousGoodPlacard" BOOLEAN NOT NULL,
    "codeSin" TEXT NOT NULL,

    CONSTRAINT "DangerousgoodsObservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Office" (
    "id" TEXT NOT NULL,
    "accidentId" TEXT NOT NULL,
    "officeType" TEXT NOT NULL,
    "occurenceBookNumber" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "accidentregisterNumber" TEXT,
    "sapscaseNumber" TEXT,
    "completedBy" TEXT,
    "inspectedBy" TEXT,
    "surname" TEXT NOT NULL,
    "initials" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "serviceNumber" TEXT NOT NULL,
    "date" TEXT,
    "time" TEXT,

    CONSTRAINT "Office_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_accidentId_fkey" FOREIGN KEY ("accidentId") REFERENCES "Accident"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Licence" ADD CONSTRAINT "Licence_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Licence" ADD CONSTRAINT "Licence_accidentId_fkey" FOREIGN KEY ("accidentId") REFERENCES "Accident"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_accidentId_fkey" FOREIGN KEY ("accidentId") REFERENCES "Accident"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneralDetail" ADD CONSTRAINT "GeneralDetail_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneralDetail" ADD CONSTRAINT "GeneralDetail_accidentId_fkey" FOREIGN KEY ("accidentId") REFERENCES "Accident"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Passenger" ADD CONSTRAINT "Passenger_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Passenger" ADD CONSTRAINT "Passenger_accidentId_fkey" FOREIGN KEY ("accidentId") REFERENCES "Accident"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Witness" ADD CONSTRAINT "Witness_accidentId_fkey" FOREIGN KEY ("accidentId") REFERENCES "Accident"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonObservation" ADD CONSTRAINT "PersonObservation_passengerId_fkey" FOREIGN KEY ("passengerId") REFERENCES "Passenger"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonObservation" ADD CONSTRAINT "PersonObservation_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleObservation" ADD CONSTRAINT "VehicleObservation_accidentId_fkey" FOREIGN KEY ("accidentId") REFERENCES "Accident"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleObservation" ADD CONSTRAINT "VehicleObservation_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedestrianObservation" ADD CONSTRAINT "PedestrianObservation_accidentId_fkey" FOREIGN KEY ("accidentId") REFERENCES "Accident"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedestrianObservation" ADD CONSTRAINT "PedestrianObservation_passengerId_fkey" FOREIGN KEY ("passengerId") REFERENCES "Passenger"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DangerousgoodsObservation" ADD CONSTRAINT "DangerousgoodsObservation_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Office" ADD CONSTRAINT "Office_accidentId_fkey" FOREIGN KEY ("accidentId") REFERENCES "Accident"("id") ON DELETE CASCADE ON UPDATE CASCADE;
