import {
    fetchAccidentArea,
    fetchAccidents,
    fetchAccidentsByStatus,
    fetchDrivers,
  fetchPassengers,
  fetchVehicles,
  totalFatalReport,
  totalNoInjuryReport,
  totalSeriousReport,
  totalSlightReport,
} from "@/apiCalls";
import React from "react";
import { DataItem } from "../accidentReports/dataItem";
import { ChartView } from "../accidentReports/chartView";
import { Widget } from ".";
import { BookOpen, CarFront, ShipWheel } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components";
import { PersonIcon } from "@radix-ui/react-icons";
import { AccidentStatus } from "@prisma/client";

export const AccidentDashboard = async () => {
  const fatal = await totalFatalReport();
  const serious = await totalSeriousReport();
  const slight = await totalSlightReport();
  const noInjury = await totalNoInjuryReport();

  const drivers = await fetchDrivers();
  const vehicles = await fetchVehicles();
  const passengers = await fetchPassengers();
  const {accidents} = await fetchAccidents();
  const completeAccidents = await fetchAccidentsByStatus(AccidentStatus.Complete)
  const inCompleteAccidents = await fetchAccidentsByStatus(AccidentStatus.Incomplete)


  return (
    <div className="w-full flex flex-col items-start justify-between p-6 gap-5 bg-white shadow-md border border-gray-100 rounded-lg">
        <h1 className="text-md font-semibold ">Accident Management</h1>
      <div className="flex items-start w-full justify-between gap-10">
        <div className="w-1/3 flex flex-col gap-4  bg-white shadow-lg border border-gray-100 rounded-lg p-4 ">
          <h1 className="text-md font-semibold border-b border-gray-100 pb-1 w-fit">
            Grand total
          </h1>

          <div className="flex flex-col gay-2 w-full ">
            <DataItem label="Fatal" value={fatal} />
            <DataItem label="Seriously injured" value={serious} />
            <DataItem label="Slightly Injured" value={slight} />
            <DataItem label="No injury" value={noInjury} />
          </div>
        </div>

        <div className="flex flex-col gap-3 w-2/3 items-center bg-white shadow-lg border border-gray-100 rounded-lg p-4">
          
          <ChartView
            fatal={fatal ? fatal : 0}
            serious={serious ? serious : 0}
            slight={slight ? slight : 0}
            noInjury={noInjury ? noInjury : 0}
          />
        </div>
      </div>

      <div className="w-full flex flex-col items-start gap-4 ">
        <div className="flex flex-wrap w-full gap-5">
          <Widget
            title="Accident forms"
            count={accidents ? accidents.length : 0}
            Icon={CarFront}
            bgColor="white"
            iconBgColor="white"
            iconColor="black"
            textColor="black"
          />
          <Widget
            title="Complete"
            count={completeAccidents.length}
            Icon={CarFront}
            bgColor="#09814A"
            iconBgColor="#09814A"
            iconColor="white"
            textColor="white"
          />
          <Widget
            title="Incomplete"
            count={inCompleteAccidents.length}
            Icon={CarFront}
            bgColor="#BC4749"
            iconBgColor="#BC4749"
            iconColor="white"
            textColor="white"
          />
        </div>
        <div className="flex flex-wrap w-full gap-5">
          <Widget
            title="Drivers"
            count={drivers.length}
            Icon={ShipWheel}
            bgColor="white"
            iconBgColor="white"
            iconColor="black"
            textColor="black"
          />
          <Widget
            title="Vehicles"
            count={vehicles.length}
            Icon={CarFront}
            bgColor="#D6E5E3"
            iconBgColor="#D6E5E3"
            iconColor="black"
            textColor="black"
          />
          <Widget
            title="Passengers"
            count={passengers.length}
            Icon={PersonIcon}
            bgColor="#A89B9D"
            iconBgColor="#A89B9D"
            iconColor="white"
            textColor="white"
          />
        </div>
      </div>

      <Link href={"/dashboard/accidents"}><Button className="text-xs bg-gray-200 text-black hover:bg-blue-500 hover:text-white">View more</Button></Link>
    </div>
  );
};
