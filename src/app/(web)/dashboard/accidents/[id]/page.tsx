import {
  fetchAccidentArea,
  fetchAccidentGeneralDetails,
  fetchSingleAccident,
  fetchSingleUser,
} from "@/apiCalls";
import { Badge, Button, PageHeader } from "@/components";
import { AccidentStatusDropMenu, AccidentTabs, ActionBar } from "@/modules";
import { FileAcions } from "@/modules/accident/fileAcions";
import { CarFront } from "lucide-react";
import Link from "next/link";

import React from "react";
import { z } from "zod";

const schema = z.string().cuid();
const isCUID = (id: string) => schema.safeParse(id).success;

async function Page(props: UserPageProps) {
  const { params } = props;

  if (!isCUID(params.id)) {
    return null;
  }

  const { accident, error } = await fetchSingleAccident(params.id);
  const { area } = await fetchAccidentArea(params.id);
  const { generalDetails } = await fetchAccidentGeneralDetails(params.id);

  if(!accident){
    return (
      <div className=" bg-white p-4 rounded-lg h-full w-full flex flex-col items-center justify-center gap-2">
        <p className="text-sm font-semibold text-gray-500">It looks like the data you are looking for is removed</p>
        <Link href="/dashboard/accidents">
          <Button variant="destructive" className="h-fit text-xs">
            Go back
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 w-full ">
      <div className="flex items-center w-full justify-between">
        
          <PageHeader Icon={CarFront} title={`${accident?.AR_number}`} />
         
     
        {accident && (
          <Badge variant={accident.status === "Complete"? "green" : "orange"}>{accident.status}</Badge>
        )}
      </div>

      <div className="w-full shadow-lg border flex flex-col bg-white rounded-lg p-6 gap-4">
        <div className="flex items-center w-full justify-between">
        <p className="text-lg font-semibold">Accident details</p>
          <div className="max-w-[100px]">

            {accident && <AccidentStatusDropMenu accidentId={params.id} status={accident?.status}/>}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center w-fit self-end">
          <FileAcions accidentId={params.id}/>
          {/* {accident && <ActionBar accidentId={accident.id} />} */}
        </div>

        <div className="w-full flex flex-col gap-3 ">
          <div className="flex items-center gap-10 border-b w-full justify-between bg-gray-200 p-2">
            <Item
              label="Police station"
              element={
                <Badge variant={"blue"}>{accident?.policeStation}</Badge>
              }
            />
            <Item
              label="AR number"
              element={<Badge variant={"blue"}>{accident?.AR_number}</Badge>}
            />
          </div>

          <div className="flex items-center gap-10 ">
            <div className="flex flex-col gap-1">
              <Item label="Case number" value={accident?.caseNumber} />
              <Item label="Serial number" value={accident?.serialNumber} />
              <Item
                label="Capturing number"
                value={accident?.capturingNumber}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Item label="Accident date" value={accident?.date} />
              <Item label=" Day of the week" value={accident?.day} />
              <Item label="Time of accident" value={accident?.time} />
              <Item
                label="Number of vehicles involved"
                value={accident?.numberOfVehicles}
              />
            </div>
          </div>
        </div>

        <p className="text-sm font-semibold">Location</p>
        <div className="flex items-center justify-between bg-gray-200 p-2">
          <Item
            label="Buil-up area"
            element={
              <Badge variant={accident?.builtUpArea === "No" ? "red" : "green"}>
                {accident?.builtUpArea}
              </Badge>
            }
          />

          <Item
            label="Speed limit on road"
            element={
              <Badge variant={"blue"}>{accident?.roadSpeedLimit}km</Badge>
            }
          />
          <Item
            label="Province"
            element={<Badge variant={"blue"}>{accident?.province}</Badge>}
          />
        </div>
        <div className="flex items-start gap-10 ">
          <div className="flex flex-col gap-1">
            <Item label="Street" value={accident?.street} />
            <Item label="Road number" value={accident?.roadNumber} />
            <Item label="Road name" value={accident?.roadName} />
            <Item label="Road type" value={accident?.roadType} />
            <Item label="Junction type" value={accident?.junctionType} />
            <Item label="X Coordinate" value={accident?.xCoordinate} />
            <Item label="Y Coordinate" value={accident?.yCoordinate} />
          </div>

          <div className="flex flex-col gap-2">
            <Item
              label="Area type"
              element={
                <Badge
                  variant={
                    area?.areaType === "Freeway/Rural" ? "orange" : "default"
                  }
                >
                  {area?.areaType}
                </Badge>
              }
            />
            {area?.areaType === "Freeway/Rural" ? (
              <>
                <Item label="At intersection with" value={area?.intersection} />
                <Item label="Or between" value={area?.between} />
                <Item label="And" value={area?.and} />
                <Item label="Suburb" value={area?.suburb} />
                <Item label="City/Town name" value={area?.townName} />
              </>
            ) : (
              <>
                <Item label="At intersection with" value={area?.intersection} />
                <Item
                  label="Or approximate"
                  value={area?.approximateDistance + "km"}
                />
                <Item label="Direction" value={area?.direction} />
                <Item label="from" value={area?.from} />
                <Item label="Kilometer marker" value={area?.kmMarker} />
                <Item label="Dispance" value={area?.kmMarkerDistance} />
                <Item label="Between" value={area?.between} />
                <Item label="And" value={area?.and} />
              </>
            )}
          </div>
        </div>

        <p className="text-sm font-semibold">General information</p>
        <div className="flex items-start flex-col justify-between gap-10 w-full mb-2 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2 bg-gray-200 p-2 w-full justify-between">
            <p className="text-sm text-gray-500 font-semibold">
              Persons involved:
            </p>

            <Item
              label="Dead (killed)"
              element={
                <Badge
                  className="w-6 h-6 flex items-center justify-center p-0 px-1"
                  variant={"red"}
                >
                  {accident?.numberOfDead}
                </Badge>
              }
            />
            <Item
              label="Seriously injured"
              element={
                <Badge
                  className="w-6 h-6 flex items-center justify-center p-0 px-1"
                  variant={"orange"}
                >
                  {accident?.numberOfSeriouslyInjured}
                </Badge>
              }
            />
            <Item
              label="Slightly injured"
              element={
                <Badge
                  className="w-6 h-6 flex items-center justify-center p-0 px-1"
                  variant={"gray"}
                >
                  {accident?.numberOfSlightlyInjured}
                </Badge>
              }
            />
            <Item
              label="Not injured"
              element={
                <Badge
                  className="w-6 h-6 flex items-center justify-center p-0 px-1"
                  variant={"green"}
                >
                  {accident?.numberOfNotInjured}
                </Badge>
              }
            />
          </div>

          <div className="flex gap-4 w-full justify-between">
            <div className="w-1/2 rounded-md shadow-md border border-gray-100 flex flex-col gap-2 p-4 h-full">
              <Item
                label="Light condition"
                value={generalDetails?.lightCondition}
              />
              <Item
                label="Weather conditions and visibility"
                value={generalDetails?.weatherConditionsAndVisibility}
              />
              <Item
                label="Road surface type"
                value={generalDetails?.roadSurfaceType}
              />
              <Item
                label="Quality of road surface"
                value={generalDetails?.qualityOfRoadSurface}
              />
              <Item label="Road surface" value={generalDetails?.roadSurface} />
              <Item label="Obstructions" value={generalDetails?.obstructions} />
              <Item
                label="Road marking visibility"
                value={generalDetails?.roadMarkingVisibility}
              />
              <Item
                label="Overtaking controls"
                value={generalDetails?.overtakingControl}
              />
              <Item
                label="Traffic control type"
                value={generalDetails?.traficControlType}
              />
              <Item
                label="Road signs clearly visible"
                value={generalDetails?.roadSignsClearlyVisible}
              />
              <Item
                label="Condition of road signs"
                value={generalDetails?.conditionOfRoadSigns}
              />
              <Item
                label="Direction of road"
                value={generalDetails?.directionOfRoad}
              />
            </div>
            <div className="h-full flex flex-col justify-between gap-4 min-h-max">
              <p className="text-sm font-semibold">Comments</p>
              <div className="flex flex-col items-start justify-between gap-6 h-max">
                <div className="flex flex-col shadow-md brounded-md border gap-2 border-gray-100 p-4 flex-1">
                  <p className="text-sm font-semibold text-blue-500">
                    Officer statements
                  </p>
                  <div className="flex flex-col gap-2 border border-gray-100 p-2 rounded-md">
                    <p className="text-sm font-normal text-gray-500">
                      Particulars of summomns/ written notice to appear in
                      court:
                    </p>
                    <p className="text-xs ">{accident?.courtData}</p>
                  </div>

                  <div className="flex flex-col gap-2 border border-gray-100 p-2 rounded-md">
                    <p className="text-sm font-normal text-gray-500">
                      Particulars of notice to discontinue use of vehicle:
                    </p>
                    <p className="text-xs ">
                      {accident?.discontinueUseOfVehicle}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col shadow-md brounded-md border gap-2 border-gray-100 p-4 flex-1">
                  <p className="text-sm font-semibold text-blue-500">
                    Deivers statements
                  </p>
                  <div className="flex flex-col gap-1 border border-gray-100 p-2 rounded-md">
                    <p className="text-sm font-normal text-gray-500">
                      DriverA statement
                    </p>
                    <p className="text-xs ">{accident?.descriptionD1}</p>
                  </div>
                  <div className="flex flex-col gap-1 border border-gray-100 p-2 rounded-md">
                    <p className="text-sm font-normal text-gray-500">
                      DriverB statement
                    </p>
                    <p className="text-xs ">{accident?.descriptionD2}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AccidentTabs accidentId={params.id} />
      </div>
    </div>
  );
}

export type UserPageProps = {
  params: Record<string, string>;
  searchParams: Record<string, string>;
};

export default Page;

function Item(props: ItemProps) {
  const { label, value, element } = props;
  return (
    <div className="flex  items-center justify-between gap-3">
      <p className="text-sm font-normal text-gray-500">{label}:</p>
      {element ? element : <p className="text-xs font-semibold">{value}</p>}
    </div>
  );
}

type ItemProps = {
  label: string;
  value?: string | number | null | undefined;
  element?: React.ReactNode;
};
