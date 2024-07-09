import { Badge } from "@/components";
import { DriverType, VehicleType } from "@/schema/accident";
import React from "react";
import { VehicleActions } from "../addVehicle";

export const Vehicle = (props: VehicleProps) => {
  const { vehicles } = props;
  return (
    
    
    <div className="w-full flex flex-col gap-4">

  
    <div className='w-full flex items-center justify-between'>
      
      <VehicleActions />
    </div>
      
      <div className="w-full flex flex-wrap gap-10 items-center">
        {vehicles.map((vehicle) => (
          <div
            className="flex flex-col gap-4 shadow-md border border-gray-100 rounded-md p-4 bg-white min-w-[400px]"
            key={vehicle.id}
          >
            <p className="text-md font-semibold border-b border-gray-100 text-center">
              Vehicle {vehicle?.vehicleRef}
            </p>

            <div className="w-full flex flex-col gap-2">
              <p className="text-blue-500 text-xs font-semibold">
                Vehicle information
              </p>
              <Item label="Number plate" value={vehicle?.plateNumber}/>
              <Item label="Make" value={vehicle?.make}/>
              <Item label="Model" value={vehicle?.model}/>
              <Item label="Color" value={vehicle?.color}/>
              <Item label="Vehicle type" value={vehicle?.type}/>
              <Item label="Color" value={vehicle?.color}/>
            </div>

            <div className="w-full flex flex-col gap-2 border border-gray-100 p-2 rounded-md">
              <p className="text-blue-500 text-xs font-semibold">
                Accident info
              </p>
              <Item label="Travel direction" value={vehicle?.travelDirection}/>
              <Item label="Position before accident" value={vehicle?.position}/>
              <Item label="Manoeuvre" value={vehicle?.manoeuvre}/>
              <Item label="Flat or sloped" value={vehicle?.slope}/>
              <Item label="Lights" value={vehicle?.lights}/>
              <Item label="Tires burst" value={vehicle?.tiresBurst}/>
              <Item label="Reflector quality" value={vehicle?.reflectorQuality}/>
              <Item label="Length of skidmarks" value={vehicle?.lengthOfSkidMarks + "m"}/>
              <Item label="Chevron quality" value={vehicle?.chevronQuality}/>
              <Item label="Carry passengers fort reward" value={vehicle?.carryPassengersForReward}/>

            </div>
            <div className="w-full flex flex-col gap-2 border border-gray-100 p-2 rounded-md">
              <p className="text-blue-500 text-xs font-semibold">
                Damage
              </p>
              <div className="flex flex-wrap gap-2">
                  {
                    vehicle?.damage.map((damage) => (
                      <Badge variant="red" key={damage}>{damage}</Badge>
                    ))
                  }
              </div>
            </div>
            <div className="w-full flex flex-col gap-2 border border-gray-100 p-2 rounded-md">
              <p className="text-blue-500 text-xs font-semibold">
                Dangerous goods 
              </p>
              <Item label="Carrying dangerous goods" value={vehicle?.dangerousGoodsCarried}/>
              <Item label="Spillage occured" value={vehicle?.splillageOccured}/>
              <Item label="Gas emission cooured" value={vehicle?.gasEmmissionOccured}/>
              <Item label="Dangerous goods placard" value={vehicle?.dangerousGoodPlacard}/>
            </div>
            <div className="w-full flex flex-col gap-2 border border-gray-100 p-2 rounded-md">
              <p className="text-blue-500 text-xs font-semibold">
                Breakdown information
              </p>
              <Item label="Breakdown company" value={vehicle?.breakdownCompanyName}/>
              <Item label="Breakdown telephone" value={vehicle?.breakdownTelephoneNumber}/>
              <Item label="Driver name" value={vehicle?.breakdowndriverName}/>
            </div>

            <div className="w-full flex flex-col gap-2 border border-gray-100 p-2 rounded-md">
              <p className="text-blue-500 text-xs font-semibold">
                Trailers
              </p>
              <Item label="Trailer1 number plate" value={vehicle?.trailer1Plate}/>
              <Item label="Trailer1 number plate" value={vehicle?.trailer2Plate}/>
            </div>

            <div className="w-full flex flex-col gap-2 border border-gray-100 p-2 rounded-md">
              <p className="text-blue-500 text-xs font-semibold">
                Orther comment
              </p>
              <p className="max-w-[300] text-xs ">{vehicle?.otherComment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function Item(props: ItemProps) {
  const { label, value, element, secondValue } = props;
  return (
    <div className="flex  items-center justify-between gap-3">
      <p className="text-sm font-normal text-gray-500">{label}:</p>

      {element ? (
        element
      ) : secondValue ? (
        <div className="flex items-center gap-4">
          <p className="text-xs font-semibold">{value}</p>
          <p className="text-sm font-semibold">{secondValue}</p>
        </div>
      ) : (
        <p className="text-xs font-semibold max-w-[200px]">{value}</p>
      )}
    </div>
  );
}

type ItemProps = {
  label: string;
  value?: string | number | null | undefined;
  secondValue?: number | string | null | undefined;
  element?: React.ReactNode;
};

type VehicleProps = {
  vehicles: VehicleType[];
};
