"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge, Button, DataTableColumnHeader, DropMenu } from "@/components";
import { Checkbox } from "@/components";
import { UserType } from "@/schema";
import { AccidentType } from "@/schema/accident";
import { AccidentByAccidentTypeType } from "../rows/accidentTypes";
import { fetchAccidentReportByAccidentType } from "@/apiCalls";
import { ReportResultsByAccidentType } from "../reportResults/byAccidentType";

export const accidentsPerTypeColumn: ColumnDef<AccidentByAccidentTypeType>[] = [
  
  {
    accessorKey: "accidentType",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Accident type" />;
    },

   
    
  },

  {
    accessorKey: "fatal",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Fatal" />;
    },

    
  },
  {
    accessorKey: "serious",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Serious" />;
    },

   
  },
  {
    accessorKey: "slight",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Slight" />;
    },

   
  },
  {
    accessorKey: "noInjury",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="No injury" />;
    },

    
  },
  {
    accessorKey: "total",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Total" />;
    },
    cell: ({ row }) => {
      const reportdata = row.original;
      const total = reportdata.fatal + reportdata.noInjury + reportdata.serious + reportdata.slight
      
      return (
        <p>{total}</p>
      )
    },
  },
];
