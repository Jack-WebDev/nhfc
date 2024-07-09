import { fetchAccidentPerVehicleTypeTotal, fetchAccidents, reportPerRoad } from "@/apiCalls";
import { PageHeader } from "@/components";
import { Report } from "@/modules/accidentReports";
import { accidentsPerRoadColumns } from "@/modules/accidentReports/columns/road";
import { accidentsPerVehicleTypeColumns } from "@/modules/accidentReports/columns/vehicleTypes";
import { accidentByVehicleType } from "@/modules/accidentReports/rows/vehicleTypes";
import { ScrollText } from "lucide-react";
import React from "react";

const page = async (props: PageProps) => {
  const { params, searchParams } = props;

  const period = searchParams.period.split("to");
  const fromDate = period[0];
  const toDate = period[1];


  const { accidents, error, total } = await reportPerRoad();
  const dateFilteredAccidents =
    accidents &&
    accidents.filter(
      (accident) =>
        new Date(accident.date) <= new Date(toDate) &&
        new Date(accident.date) >= new Date(fromDate)
    );


  return (
    <div className="flex flex-col gap-6 w-full">
      <PageHeader Icon={ScrollText} title="Accidents report" />

      {dateFilteredAccidents && (
        <Report
          title="Accidents per vehicle type"
          fromDate={fromDate}
          toDate={toDate}
          tableColumns={accidentsPerRoadColumns}
          tableData={dateFilteredAccidents}
          fatal={total?.fatal || 0}
          serious={total?.serious || 0}
          slight={total?.slight || 0}
          noInjury={total?.noInjury || 0}
        />
      )}
    </div>
  );
};

export default page;

export type PageProps = {
  params: Record<string, string>;
  searchParams: Record<string, string>;
};
