"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge, Button, DataTableColumnHeader, DropMenu } from "@/components";
import { Checkbox } from "@/components";
import { ReportType, UserType } from "@/schema";
import url from "@/lib/apiUrl";
import { ReportDropMenu } from "./reportDropMenu";
import { formatDate } from "@/lib";
import { User } from "..";

export const reportColumns: ColumnDef<ReportType>[] = [
  {
    accessorKey: "select",
    header: ({ table }) => (
      <Checkbox
        className="bg-white"
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select All"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),

    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "activity",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Action" />;
    },
    cell: ({row}) => {
        const activity: string = row.getValue("activity");

        return (
            <p className="font-semibold uppercase">{activity.split("_").join(" ")}</p>
        )
    }
  },
  {
    accessorKey: "activityAction",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Action type" />;
    },
    cell: ({row}) => {
        const action: string = row.getValue("activityAction");

        return (
            <Badge variant={action === "Create" ? "green" : action === "Update"? "gray" : "red"}>
                {action}
            </Badge>
        )
    }
  },
  {
    accessorKey: "message",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Description" />;
    },

  },

  {
    accessorKey: "date",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Date" />;
    },
    cell: ({ row }) => {
      const date: string = row.getValue("date");
      return (
        <span className="capitalize">
          {formatDate(date, true)}
        </span>
      );
    },
  },

  {
    accessorKey: "adminId",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Admin" />;
    },
    cell: ({ row }) => {
      const adminId: string = row.getValue("adminId");
      return (
        <User userId={adminId}/>
      );
    },
  },

//   {
//     id: "actions",
//     header: ({ column }) => {
//       return <div className="text-center w-full">Actions</div>;
//     },
//     cell: ({ row }) => {
//       const report = row.original;

//       return (
//         <div className="flex items-center justify-center">
//           <ReportDropMenu  linkUrl={`reports/${report.id}`} />
//         </div>
//       );

//       //You can access the row data using row.original in the cell function.
//       //Use this to handle actions for your row eg. use the id to make a DELETE call to your API
//     },
//   },
];
