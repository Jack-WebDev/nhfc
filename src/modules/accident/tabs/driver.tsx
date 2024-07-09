import { DriverType } from "@/schema/accident";
import React from "react";
import { DriverActions } from "../addDriver";

export const Driver = (props: DriverProps) => {
  const { drivers } = props;
  return (
    <div className="w-full flex flex-col gap-4">
     
        <div className="w-full flex items-center justify-between">
          <DriverActions />
        </div>
      

      <div className="w-full flex gap-10 items-center">
        {drivers.map((driver) => (
          <div
            className="flex flex-col gap-4 shadow-md border border-gray-100 rounded-md p-4 bg-white min-w-[400px]"
            key={driver.id}
          >
            <p className="text-md font-semibold border-b border-gray-100 text-center">
              Driver {driver.driverRef}
            </p>

            <div className="w-full flex flex-col gap-2">
              <Item label="Surname" value={driver?.surname} />
              <Item label="Full names" value={driver?.fullNames} />
              <Item label="Initials" value={driver?.initials} />
              <Item label="Age" value={driver?.age} />
              <Item label="Gender" value={driver?.gender} />
              <Item label="Driver desciption" value={driver?.race} />
              <Item label="Country" value={driver?.country} />
            </div>

            <div className="w-full flex flex-col gap-2 border border-gray-100 p-2 rounded-md">
              <p className="text-blue-500 text-xs font-semibold">
                Contact info
              </p>

              <Item
                label="Telephone number"
                value={driver?.telephoneNumber}
                secondValue={driver?.telephoneNumberType}
              />
              <Item label="Cellphone number" value={driver?.cellphoneNumber} />
              <Item label="Work address" value={driver?.workAddress} />
              <Item label="Home address" value={driver?.homeAddress} />
            </div>
            <div className="w-full flex flex-col gap-2 border border-gray-100 p-2 rounded-md">
              <p className="text-blue-500 text-xs font-semibold">
                Licence information
              </p>

              <Item label="Licence type" value={driver?.licenceType} />
              <Item label="Licence number" value={driver?.licenceNumber} />
              <Item label="Date of issue" value={driver?.licenceDateOfIssue} />
              <Item label="Code" value={driver?.licenceCode} />
            </div>
            <div className="w-full flex flex-col gap-2 border border-gray-100 p-2 rounded-md">
              <p className="text-blue-500 text-xs font-semibold">
                Accident related information
              </p>

              <Item label="Severity of injury" value={driver?.injury} />
              <Item
                label="Seatbelt fitted/helmet present"
                value={driver?.safetyPresent}
              />
              <Item
                label="Seatbelt/helmet definitely used"
                value={driver?.safetyUsed}
              />
              <Item
                label="Liquor/drug use suspected"
                value={driver?.influenceSuspected}
              />
              <Item
                label="Liquor/drug use: evidentiary tested"
                value={driver?.influenceTested}
              />
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
        <p className="text-xs font-semibold">{value}</p>
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

type DriverProps = {
  drivers: DriverType[];
};
