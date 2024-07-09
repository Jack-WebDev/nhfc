
import React from "react";
import { ReportHeader } from "./reportHeader";
import { GrandTotal, ReportDropMenu } from ".";
import { DataTable } from "@/components";

export const Report = async (props: Props) => {

    const {fromDate, toDate, tableColumns, tableData, title, fatal, serious, slight, noInjury} = props;
 
  return (
    <div className="w-full flex flex-col gap-2 bg-white shadow-lg rounded-md border border-gray-100 relative">
      <ReportHeader
        title={title}
        fromDate={fromDate}
        toDate={toDate}
      />

      <ReportDropMenu />

      <div className="p-4 flex flex-col gap-4">
        <DataTable
          pagination={true}
          columns={tableColumns}
          data={tableData}
          search={false}
          searchColumn={"code"}
        />

        <GrandTotal fatal={fatal} serious={serious} slight={slight} noInjury={noInjury}/>
      </div>
    </div>
  );
};

type Props = {
    fromDate: string,
    toDate: string,
    tableColumns: any[],
    tableData: any[],
    title: string,
    fatal: number,
    serious: number,
    slight: number,
    noInjury: number
};
