import { PassengerType, WitnessType } from "@/schema/accident";
import React from "react";
import { Item } from "./item";
import { pass } from "@/notifications";
import { Badge } from "@/components";
import { Witnessctions } from "../addWitness";

export const Witness = (props: WitnessProps) => {
  const { witnesses } = props;

  return (
    <div className="w-full flex flex-col gap-4">
      
        <div className="w-full flex items-center justify-between">
          
          <Witnessctions />
        </div>
      

      <div className="w-full flex gap-10 items-center flex-wrap">
        {witnesses.map((witness, count) => (
          <div
            className="flex flex-col gap-4 shadow-md border border-gray-100 rounded-md p-4 bg-white min-w-[400px]"
            key={witness.id}
          >
            <p className="text-md font-semibold border-b border-gray-100 text-center">
              Witness {count + 1}
            </p>

            <div className="flex flex-col gap-2">
              <Item label="Type of witness" value={witness?.type} />
              <Item label="Username" value={witness?.surname} />
              <Item label="Initials" value={witness?.initials} />
            </div>

            <div className="w-full flex flex-col gap-2 border border-gray-100 p-2 rounded-md">
              <p className="text-blue-500 text-xs font-semibold">
                Contact information
              </p>

              <Item label="Contact number" value={witness?.contactNumber} />
              <Item label="Address" value={witness?.address} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

type WitnessProps = {
  witnesses: WitnessType[];
};
