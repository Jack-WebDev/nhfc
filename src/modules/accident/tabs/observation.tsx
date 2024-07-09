import { PassengerType, PersonObservationType } from "@/schema/accident";
import React from "react";
import { Item } from "./item";
import { pass } from "@/notifications";
import { Badge } from "@/components";
import { ObservationActions } from "../addObservation";

export const PersonObservation = (props: PersonObservationProps) => {
  const { observations } = props;

  return (
    <div className="w-full flex flex-col gap-4">
 
        <div className="w-full flex items-center justify-between">
          
          <ObservationActions />
        </div>
    

      <div className="w-full flex gap-10 items-center flex-wrap">
        {observations.map((observation, count) => (
          <div
            className="flex flex-col gap-4 shadow-md border border-gray-100 rounded-md p-4 bg-white min-w-[400px]"
            key={observation.id}
          >
            <p className="text-md font-semibold border-b border-gray-100 text-center">
              Observation: Person {observation?.personNumber} in Vehicle{" "}
              {observation?.vehicleNumber}
            </p>

            <div className="flex flex-col gap-2">
              <Item label="Person number" value={observation?.personNumber} />
              <Item label="Vehicle number" value={observation?.vehicleNumber} />
              <Item label="Trapped/fallen out" value={observation?.trapped} />
              <Item
                label="Use of cellphone or other instrument"
                value={observation?.instrument}
              />

              <div className="flex flex-col gap-2 w-full">
                <p className="text-sm font-semibold text-blue-500">
                  Other related information:
                </p>
                <p className="text-sm font-normal text-gray-500 max-w-[400px] border border-gray-100 p-2 rounded-md">
                  {observation?.otherInfo}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

type PersonObservationProps = {
  observations: PersonObservationType[];
};
