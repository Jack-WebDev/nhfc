import React from "react";
import { TabHeader } from "./tabHeader";
import { batchColumns } from "../columns";
import { fetchBatchByType } from "@/apiCalls/batch";
import { DataTable } from "@/components";



export async function Section56ByLaw() {
  const { batch, error } = await fetchBatchByType(51);
  return (
    <div className="flex flex-col gap-2">
      <TabHeader title="Section 56 By-Law" type={51} />

      {
        batch && (
          <DataTable
          search={true}
            data={batch}
            columns={batchColumns}
            searchColumn="batchId"
          />
        )
      }
    </div>
  );
}
