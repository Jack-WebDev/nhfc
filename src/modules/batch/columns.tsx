"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge, Button, DataTableColumnHeader, DropMenu } from "@/components";
import { Checkbox } from "@/components";
import { BatchType, UserType } from "@/schema";
import url from "@/lib/apiUrl";
import { UserDropMenu } from "../user/userDropMenu";
import { batchTypeString } from "./batchType";
import { CapturingUser } from "./capturingUser";
import { formatDate } from "@/lib";
import { BatchDropMenu } from "./batchDropMenu";
import { User } from "..";

export const batchColumns: ColumnDef<BatchType>[] = [
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
    accessorKey: "batchId",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Batch ID" />;
    },
  },
  {
    accessorKey: "batchType",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Batch Type" />;
    },

    cell: ({ row }) => {
      const type: number = row.getValue("batchType");
      const typeString: string = batchTypeString(type);
      return <p>{typeString}</p>;
    },
  },

  {
    accessorKey: "firstNotice",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="First Notice" />;
    },
  },
  {
    accessorKey: "lastNotice",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Last Notice" />;
    },
  },

  {
    accessorKey: "capturedBy",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="captured By" />;
    },

    cell: ({row}) => {
      const userId: string = row.getValue("capturedBy");
      return <User userId={userId}/>
    }
   
  },

  {
    accessorKey: "date",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Date" />;
    },
    cell: ({ row }) => {
      const dateIso: string = row.getValue("date");
      const date = formatDate(dateIso);
      return (
        <p>{date}</p>
      );
    },
  },

  {
    id: "actions",
    header: ({ column }) => {
      return <div className="text-center w-full">Actions</div>;
    },
    cell: ({ row }) => {
      const batch = row.original;

      return (
        <div className="flex items-center justify-center">
          <BatchDropMenu batch={batch} linkUrl={`capturing/${batch.batchId}/books`} />
        </div>
      );

      //You can access the row data using row.original in the cell function.
      //Use this to handle actions for your row eg. use the id to make a DELETE call to your API
    },
  },
];
