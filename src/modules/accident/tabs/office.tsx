import { OfficeType, PassengerType } from "@/schema/accident";
import React from "react";
import { Item } from "./item";
import { pass } from "@/notifications";
import { Badge } from "@/components";
import { PassengerActions } from "../addPassenger";
import { OfficeActions } from "../addOffice";

export const Office = (props: OfficeProps) => {
  const { offices } = props;

  return (
    <div className="w-full flex flex-col gap-4">
      
        <div className="w-full flex items-center justify-between">
         
          <OfficeActions />
        </div>
      

      <div className="w-full flex gap-10 items-center flex-wrap">
        {offices.map((office) => (
          <div
            className="flex flex-col gap-4 shadow-md border border-gray-100 rounded-md p-4 bg-white min-w-[400px]"
            key={office.id}
          >
            <p className="text-md font-semibold border-b border-gray-100 text-center">
              Office where accident{" "}
              {office?.officeType === "Occurence" ? "occured" : "was reported"}
            </p>

            <div className="flex flex-col gap-2">
              <Item
                label="Occurence Book no"
                value={office?.occurenceBookNumber}
              />
              {office.officeType === "Occurence" && (
                <Item
                  label="Accident Register no"
                  value={office?.accidentRegisterNumber}
                />
              )}
              {office.officeType === "Occurence" && (
                <Item label="SAPS case no" value={office?.sapsCaseNumber} />
              )}
              <Item label="Department" value={office?.department} />
              {office.officeType === "Occurence" && (
                <Item label="Capturing no" value={office?.capturingNumber} />
              )}
            </div>

            {office.officeType === "Occurence" ? (
              <div className="w-full flex flex-col gap-2 border border-gray-100 p-2 rounded-md">
                <p className="text-blue-500 text-xs font-semibold">
                  Inspected by:
                </p>
                <Item label="Initials" value={office?.initials} />
                <Item label="Surname" value={office?.surname} />
                <Item label="rank" value={office?.rank} />
                <Item label="Service number" value={office?.serviceNumber} />
              </div>
            ) : (
              <div className="w-full flex flex-col gap-2 border border-gray-100 p-2 rounded-md">
                <div className="flex items-center justify-between">
                  <p className="text-blue-500 text-xs font-semibold">
                    Completed by:
                  </p>
                  <p className="text-blue-500 text-xs font-semibold">
                    {office?.completedBy}
                  </p>
                </div>

                <Item label="Initials" value={office?.initials} />
                <Item label="Surname" value={office?.surname} />
                <Item label="rank" value={office?.rank} />
                <Item label="Service number" value={office?.serviceNumber} />
                <Item label="Date" value={office?.date} />
                <Item label="Time" value={office?.time} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

type OfficeProps = {
  offices: OfficeType[];
};
