import React from "react";
import { BookOpenText, Users } from "lucide-react";
import { PageNotFoundError } from "next/dist/shared/lib/utils";
import { PageHeader } from "@/components";
import { UserActions, userColumns } from "@/modules";
import { fetchUsers } from "@/apiCalls";
import { DataTable } from "@/components/ui";
import { BatchTabs } from "@/modules";
import { createBatch } from "@/modules/batch/createBatch";

async function Page() {
  const { users, error } = await fetchUsers();
  return (
    <div className="flex flex-col gap-4 w-full ">
      <div className="flex items-center justify-between ">
        <PageHeader Icon={BookOpenText} title="Capturing" />
      </div>

      <BatchTabs />
    </div>
  );
}

export default Page;
