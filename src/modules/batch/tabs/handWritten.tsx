import React from "react";
import { TabHeader } from "./tabHeader";
import { fetchBatchByType } from "@/apiCalls/batch";
import { DataTable } from "@/components";
import { batchColumns } from "../columns";



export async function HandWritten() {
  const { batch, error } = await fetchBatchByType(10);

  return (
    <div className="flex flex-col gap-2">
      <TabHeader title="341 Hand Written" type={10} />

      <DataTable search={true} data={batch} columns={batchColumns} searchColumn="batchId" />
    </div>
  );
}

