import { Zap } from "lucide-react";
import { z } from "zod";

export const accidentSchema = z.object({
  policeStation: z.string(),
  accidentType: z.string(),
  hitAndRun: z.string(),
  AR_number: z.string(),
  caseNumber: z.string().optional(),
  serialNumber: z.string().optional(),
  capturingNumber: z.string().optional(),
  date: z.string(),
  day: z.string(),
  time: z.string(),
  roadSpeedLimit: z.coerce.number().optional(),
  builtUpArea: z.string(),
  province: z.string(),
  roadName: z.string().optional(),
  roadNumber: z.string().optional(),
  street: z.string().optional(),
  roadType: z.string(),
  junctionType: z.string().optional(),
  xCoordinate: z.string().optional(),
  yCoordinate: z.string().optional(),
  numberOfVehicles: z.coerce.number(),
  numberOfDead: z.coerce.number(),
  numberOfSlightlyInjured: z.coerce.number(),
  numberOfSeriouslyInjured: z.coerce.number(),
  numberOfNotInjured: z.coerce.number(),
  descriptionD1: z.string(),
  descriptionD2: z.string(),
  courtData: z.string().optional(),
  discontinueUseOfVehicle: z.string().optional(),
  observationPersonRef: z.string().optional(),
  observationPosition: z.string().optional(),
  observationLocation: z.string().optional(),
  observationManoeuvre: z.string().optional(),
  observationPedestrianAction: z.string().optional(),
  observationColorOfClothing: z.string().optional(),
});

// Area
export const areaSchema = z.object({
  intersection: z.string().optional(),
  between: z.string().optional(),
  and: z.string().optional(),
  suburb: z.string().optional(),
  townName: z.string().optional(),
  kmMarker: z.string().optional(),
  kmMarkerDistance: z.string().optional(),
  approximateDistance: z.string().optional(),
  direction: z.string().optional(),
  from: z.string().optional(),
  areaType: z.string(),
});

export const vehicleSchema = z.object({
  travelDirection: z.string(),
  vehicleRef: z.string(),
  plateNumber: z.string(),
  color: z.string(),
  make: z.string(),
  model: z.string(),
  trailer1Plate: z.string().optional(),
  trailer2Plate: z.string().optional(),
  carryPassengersForReward: z.string(),
  breakdownCompanyName: z.string().optional(),
  breakdownTelephoneNumber: z.string().optional(),
  breakdowndriverName: z.string().optional(),
  type: z.string(),
  position: z.string(),
  manoeuvre: z.string(),
  slope: z.string(),

  dangerousGoodsCarried: z.string(),
  splillageOccured: z.string().optional(),
  gasEmmissionOccured: z.string().optional(),
  dangerousGoodPlacard: z.string().optional(),
  codeSin: z.string().optional().optional(),

  lights: z.string(),
  reflectorQuality: z.string().optional(),
  chevronQuality: z.string().optional(),
  otherComment: z.string().optional(),
  tiresBurst: z.string().optional(),
  lengthOfSkidMarks: z.string().optional(),
});

export const driverSchema = z.object({
  idType: z.coerce.number(),
  driverRef: z.string(),
  idNumber: z.string(),
  age: z.coerce.number(),
  country: z.string(),
  surname: z.string(),
  fullNames: z.string(),
  initials: z.string(),
  homeAddress: z.string(),
  workAddress: z.string(),
  telephoneNumber: z.string(),
  telephoneNumberType: z.string(),
  cellphoneNumber: z.string(),
  race: z.string(),
  gender: z.string(),
  injury: z.string(),
  safetyPresent: z.string(),
  safetyUsed: z.string(),
  influenceSuspected: z.string(),
  influenceTested: z.string(),
  anyPassengerOrPedestrian: z.string(),
  licenceType: z.string(),
  licenceDateOfIssue: z.string().optional(),
  licenceNumber: z.string().optional(),
  licenceCode: z.string().optional(),
});

export const generalInfoSchema = z.object({
  lightCondition: z.string(),
  weatherConditionsAndVisibility: z.string(),
  roadSurfaceType: z.string(),
  qualityOfRoadSurface: z.string(),
  roadSurface: z.string(),
  roadMarkingVisibility: z.string(),
  obstructions: z.string(),
  overtakingControl: z.string(),
  traficControlType: z.string(),
  roadSignsClearlyVisible: z.string(),
  conditionOfRoadSigns: z.string(),
  directionOfRoad: z.string(),
});

export const witnessSchema = z.object({
  surname: z.string(),
  initials: z.string(),
  address: z.string(),
  contactNumber: z.string(),
  type: z.string(),
});

export const personObservationSchema = z.object({
  personNumber: z.string(),
  vehicleNumber: z.string(),
  trapped: z.string(),
  instrument: z.string(),
  otherInfo: z.string().optional(),
});

export const passengerSchema = z.object({
  injury: z.string().optional(),
  idType: z.string(),
  idNumber: z.string(),
  surname: z.string(),
  initials: z.string(),
  gender: z.string().optional(),
  race: z.string().optional(),
  address: z.string().optional(),
  age: z.string().optional(),
  country: z.string().optional(),
  passengerNumber: z.string(),
  vehicleNumber: z.string(),
  cellphoneNumber: z.string().optional(),
  cellphoneNumberType: z.string().optional(),
  telephoneNumberType: z.string(),
  telephoneNumber: z.string(),
  pedestrian: z.string().optional(),
  safetyPresent: z.string().optional(),
  safetyUsed: z.string().optional(),
  influenceSuspected: z.string().optional(),
  influenceTested: z.string().optional(),
});

export const unInjuredPassengerSchema = z.object({
  idType: z.string(),
  idNumber: z.string(),
  surname: z.string(),
  initials: z.string(),
  passengerNumber: z.string(),
  vehicleNumber: z.string(),
  telephoneNumber: z.string(),
  telephoneNumberType: z.string(),
});

export const officeOccurenceSchema = z.object({
  occurenceBookNumber: z.string(),
  accidentRegisterNumber: z.string(),
  sapsCaseNumber: z.string(),
  department: z.string(),
  surname: z.string(),
  initials: z.string(),
  rank: z.string(),
  serviceNumber: z.string(),
  
});

export const officeReportedSchema = z.object({
  occurenceBookNumber: z.string(),
  department: z.string(),
  surname: z.string(),
  initials: z.string(),
  rank: z.string(),
  serviceNumber: z.string(),
  completedBy: z.string(),
  date: z.string(),
  time: z.string(),
});

export const fullAccidentSchema = z.object({
  accidentSchema,
  areaSchema,
  generalInfoSchema,
});

export type fullAccidentSchemaType = z.infer<typeof fullAccidentSchema>;
export type DriverSchemaType = z.infer<typeof driverSchema>;
export type VehicleSchemaType = z.infer<typeof vehicleSchema>;
export type PassengerSchemaType = z.infer<typeof passengerSchema>;
export type WitnessSchemaType = z.infer<typeof witnessSchema>;
export type OfficeOccuredSchemaType = z.infer<typeof officeOccurenceSchema>;
export type OfficeReportedSchemaType = z.infer<typeof officeReportedSchema>;
export type PesronObservationSchemaType = z.infer<
  typeof personObservationSchema
>;
