"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge, Button, DataTableColumnHeader, DropMenu } from "@/components";
import { Checkbox } from "@/components";
import { UserType } from "@/schema";
import { AccidentType } from "@/schema/accident";
import { BookDropMenu } from "../book";
import { AccidentDropMenu } from "./accidentDropMenu";
   

export const accidentColumns: ColumnDef<AccidentType>[] = [
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
    accessorKey: "accidentType",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Accident type" />;
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Date" />;
    },
  },
  {
    accessorKey: "province",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Province" />;
    },

    
  },

  {
    accessorKey: "capturingNumber",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Capturing number" />;
    },
    
  },
  {
    accessorKey: "policeStation",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Police station" />;
    },
    
    
  },
  {
    accessorKey: "roadSpeedLimit",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Road speed limit" />;
    },
    cell: ({row}) => {
      const speed:string = row.getValue("roadSpeedLimit")
      return (
        <p>{speed}km</p>
      )
    }
    
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Status" />;
    },
    cell: ({row}) => {
      const status:string = row.getValue("status")
      return (
        <Badge variant={status === "Complete" ? "green" : "orange"}>{status}</Badge>
      )
    }
    
  },

  

  {
    id: "actions",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Action" />;
    },
    cell: ({ row }) => {
      const accident = row.original;

      return (
        <div className="flex items-center justify-center">
          <AccidentDropMenu id={accident.id} linkUrl={`accidents/${accident.id}`} />
        </div>
      );

      //You can access the row data using row.original in the cell function.
      //Use this to handle actions for your row eg. use the id to make a DELETE call to your API
    },
  },
];
