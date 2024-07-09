import { PassengerType } from '@/schema/accident'
import React from 'react'
import { Item } from './item';
import { pass } from '@/notifications';
import { Badge } from '@/components';
import { PassengerActions } from '../addPassenger';

export const Passenger = (props: PassengerProps) => {

  const {passengers} = props;

  return (
    
   
    <div className="w-full flex flex-col gap-4">
     
   
    <div className='w-full flex items-center justify-between'>
      
      <PassengerActions />
    </div>
      <div className="w-full flex gap-10 items-center flex-wrap">
        {passengers.map((passenger) => (
          <div className="flex flex-col gap-4 shadow-md border border-gray-100 rounded-md p-4 bg-white min-w-[400px]" key={passenger.id}>
            <p className="text-md font-semibold border-b border-gray-100 text-center">
              Passenger {passenger?.passengerNumber} in Vehicle {passenger?.vehicleNumber}
            </p>

            <div className='flex flex-col gap-2'>

            <Item label='Username' value={passenger?.surname}/>
            <Item label='Id type' value={passenger?.idType}/>
            <Item label='ID number' value={passenger?.idNumber}/>
            <Item label='Initials' value={passenger?.initials}/>

            {passenger?.injury !== "No injury" &&<>
            <Item label='Description' value={passenger?.race}/>
            <Item label='Country' value={passenger?.country}/>
            <Item label='Gender' value={passenger?.gender}/>
            <Item label='Pedestrian' value={passenger?.pedestrian === null ? "Not a pedestrian" : passenger?.pedestrian}/>
            </>}


            </div>

            

            <div className="w-full flex flex-col gap-2 border border-gray-100 p-2 rounded-md">
              <p className="text-blue-500 text-xs font-semibold">
                Contact info
              </p>

              <Item label='Telephone number' value={passenger?.telephoneNumber} secondValue={passenger?.telephoneNumberType}/>
              <Item label='Cellphone number' value={passenger?.cellphoneNumber} secondValue={passenger?.cellphoneNumberType}/>
              <Item label='Address' value={passenger?.address}/>

            </div>
            <div className="w-full flex flex-col gap-2 border border-gray-100 p-2 rounded-md">
              <p className="text-blue-500 text-xs font-semibold">
                Injury
              </p>

              
              <Badge
              variant={passenger?.injury === "No injury" ? "green" : passenger?.injury === "Killed"? "red" : "orange"}
              className='text-center flex itmes-center justify-center'
              >{passenger.injury}</Badge>
             


            </div>
            {passenger?.injury !== "No injury" && <div className="w-full flex flex-col gap-2 border border-gray-100 p-2 rounded-md">
              <p className="text-blue-500 text-xs font-semibold">
                Observation
              </p>
              
                <Item label='Seatbelt fitted/helmet present' value={passenger?.safetyPresent}/>
                <Item label='Seatbelt/helmet definitely used' value={passenger?.safetyUsed}/>
                <Item label='Liquor/drug use suspected' value={passenger?.influenceSuspected}/>
                <Item label='Liquor/drug evidentiary tested' value={passenger?.influenceTested}/>
              


            </div>}
          </div>
        ))}
      </div>
    </div>
  );
}

type PassengerProps = {
  passengers: PassengerType[]
}


