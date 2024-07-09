export type AccidentType = {
  id: string;
  policeStation: string;
  accidentType: string;
  hitAndRun: string;
  AR_number: string | null;
  caseNumber: string | null;
  serialNumber: string | null;
  capturingNumber: string | null;
  date: string;
  day: string;
  time: string;
  numberOfVehicles: number;
  roadSpeedLimit: number;
  builtUpArea: string;
  province: string;
  roadName: string | null;
  roadNumber: string | null;
  street: string | null;
  roadType: string;
  junctionType: string | null;
  xCoordinate: string | null;
  yCoordinate: string | null;
  numberOfDead: number;
  numberOfSlightlyInjured: number;
  numberOfSeriouslyInjured: number;
  numberOfNotInjured: number;
  descriptionD1: string | null;
  descriptionD2: string | null;
  courtData: string | null;
  status: string
  discontinueUseOfVehicle: string | null;
  observationPersonRef: string | null;
  observationPosition: string | null;
  observationLocation: string | null;
  observationManoeuvre: string | null;
  observationPedestrianAction: string | null;
  observationColorOfClothing: string | null;
};

export type AreaType = {
  id: string;
  accidentId: string;
  areaType: string;
  intersection: string | null;
  between: string | null;
  and: string | null;
  suburb: string | null;
  townName: string | null;
  approximateDistance: string | null;
  direction: string | null;
  from: string | null;
  kmMarker: string | null;
  kmMarkerDistance: string | null;
};

export type DriverType = {
  id                       :string,   
  idType                   :number
  idNumber                 :string,
  age                      :number
  country                  :string,
  surname                  :string,
  fullNames                :string,
  initials                 :string,
  homeAddress              :string,
  telephoneNumber          :string,
  telephoneNumberType      :string,
  workAddress              :string,
  cellphoneNumber          :string,
  race                     :string,
  gender                   :string,
  injury                   :string,
  safetyPresent            :string,
  safetyUsed               :string,
  influenceSuspected       :string,
  influenceTested          :string,
  anyPassengerOrPedestrian :string,
  licenceDateOfIssue       :string | null,
  licenceNumber            :string | null,
  licenceType              :string,
  licenceCode              :string | null,
  driverRef                :string,
}
export type VehicleType = {
  id                       :string   
  accidentId               :string
  travelDirection          :string
  plateNumber              :string
  color                    :string
  make                     :string
  model                    :string
  trailer1Plate            :string | null
  trailer2Plate            :string | null
  carryPassengersForReward :string
  breakdownCompanyName     :string | null
  breakdownTelephoneNumber :string | null
  breakdowndriverName      :string | null
  chevronQuality           :string | null
  codeSin                  :string | null
  damage                   :string[] 
  dangerousGoodPlacard     :string  | null
  dangerousGoodsCarried    :string
  gasEmmissionOccured      :string | null
  lengthOfSkidMarks        :string | null
  lights                   :string
  manoeuvre                :string | null
  otherComment             :string  | null
  position                 :string | null
  reflectorQuality         :string | null
  slope                    :string
  splillageOccured         :string | null
  tiresBurst               :string
  type                     :string
  vehicleRef               :string
}

export type PassengerType = {
  id                  :string  
  surname             :string
  initials            :string
  accidentId          :string  
  passengerNumber     :string
  vehicleNumber       :string
  idNumber            :string
  telephoneNumber     :string
  telephoneNumberType :string
  pedestrian          :string | null
  country             :string  | null
  cellphoneNumber     :string | null
  race                :string | null
  gender              :string | null
  safetyPresent       :string | null
  safetyUsed          :string | null
  influenceSuspected  :string | null
  influenceTested     :string | null
  address             :string | null
  age                 :number  | null
  cellphoneNumberType :string | null
  idType              :string | null
  injury              :string | null
}


export type WitnessType = {
  id            :string   
  accidentId    :string
  surname       :string
  initials      :string
  contactNumber :string
  address       :string
  type          :string
}

export type PersonObservationType = {
  id            :string  
  accidentId    :string
  instrument    :string
  otherInfo     :string | null
  personNumber  :string
  trapped       :string
  vehicleNumber :string
}

export type OfficeType = {
  id                     :string   
  accidentId             :string
  officeType             :string
  occurenceBookNumber    :string
  department             :string
  completedBy            :string | null,
  surname                :string
  initials               :string
  rank                   :string
  serviceNumber          :string
  date                   :string | null,
  time                   :string | null,
  accidentRegisterNumber :string | null,
  sapsCaseNumber         :string | null,
  capturingNumber        :string | null,
}