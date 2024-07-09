import { fetchAccidentPerVehicleTypeTotal, fetchAccidents } from "@/apiCalls";
import { PageHeader } from "@/components";
import { Report } from "@/modules/accidentReports";
import { accidentsPerVehicleTypeColumns } from "@/modules/accidentReports/columns/vehicleTypes";
import { accidentByVehicleType } from "@/modules/accidentReports/rows/vehicleTypes";
import { ScrollText } from "lucide-react";
import React from "react";

const page = async (props: PageProps) => {
  const { params, searchParams } = props;

  const period = searchParams.period.split("to");
  const fromDate = period[0];
  const toDate = period[1];

  const { fatal, serious, slight, noInjury } =
    await fetchAccidentPerVehicleTypeTotal();

  const { accidents, error } = await fetchAccidents();
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
          tableColumns={accidentsPerVehicleTypeColumns}
          tableData={accidentByVehicleType}
          fatal={fatal}
          serious={serious}
          slight={slight}
          noInjury={noInjury}
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
