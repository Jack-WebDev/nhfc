import React from "react";
import { TabHeader } from "./tabHeader";
import { fetchBatchByType } from "@/apiCalls/batch";
import { DataTable } from "@/components";
import { fetchAllReportsByType } from "@/apiCalls/report";
import { reportColumns } from "..";

type Props = {};

export async function BookManagement(props: Props) {
  const { reports, error } = await fetchAllReportsByType("Book_Management");

  return (
    <div className="flex flex-col gap-2">
      <TabHeader title="Book management"  />

      {reports && <DataTable search={false} data={reports} columns={reportColumns} searchColumn="" />}
    </div>
  );
}
