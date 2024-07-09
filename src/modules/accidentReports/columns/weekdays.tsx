"use client";

import { ColumnDef } from "@tanstack/react-table";
import {DataTableColumnHeader } from "@/components";
import { AccidentPerWeekdaysType } from "@/schema/reports";

export const accidentsPerWeekdaysColumns: ColumnDef<AccidentPerWeekdaysType>[] = [
  
  {
    accessorKey: "day",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="WeekDay" />;
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
