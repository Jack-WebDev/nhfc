"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge, Button, DataTableColumnHeader, DropMenu } from "@/components";
import { Checkbox } from "@/components";
import { UserType } from "@/schema";
import { AccidentType } from "@/schema/accident";
import { AccidentByAccidentTypeType } from "../rows/accidentTypes";
import { fetchAccidentReportByAccidentType } from "@/apiCalls";
import { AccidentByVehicleTypeType } from "../rows/vehicleTypes";
import { ReportResultsByVehicleType } from "../reportResults/byVehicleType";

export const accidentsPerVehicleTypeColumns: ColumnDef<AccidentByVehicleTypeType>[] = [
  {
    accessorKey: "code",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Code" />;
    },

    cell: ({ row }) => {
        const code: string = row.getValue("code");
        
        return (
          <p className="text-sm font-semibold">{code}</p>
        )
      },
  },
  {
    accessorKey: "vehicleType",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Vehicle type" />;
    },

    cell: ({ row }) => {
        const vehicleType: string = row.getValue("vehicleType");
        
        return (
          <p className="text-sm font-semibold">{vehicleType}</p>
        )
      },
    
  },

  {
    accessorKey: "fatal",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Fatal" />;
    },

    cell: ({ row }) => {
      const vehicleType: string = row.getValue("vehicleType");
      
      return (
        <ReportResultsByVehicleType vehicleType={vehicleType} type="fatal"/>  
      )
    },
  },
  {
    accessorKey: "serious",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Serious" />;
    },

    cell: ({ row }) => {
        const vehicleType: string = row.getValue("vehicleType");
        
        return (
          <ReportResultsByVehicleType vehicleType={vehicleType} type="serious"/>  
        )
      },
  },
  {
    accessorKey: "slight",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Slight" />;
    },

    cell: ({ row }) => {
        const vehicleType: string = row.getValue("vehicleType");
        
        return (
          <ReportResultsByVehicleType vehicleType={vehicleType} type="slight"/>  
        )
      },
  },
  {
    accessorKey: "noInjury",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="No injury" />;
    },

    cell: ({ row }) => {
        const vehicleType: string = row.getValue("vehicleType");
        
        return (
          <ReportResultsByVehicleType vehicleType={vehicleType} type="noInjury"/>  
        )
      },
  },
  {
    accessorKey: "total",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Total" />;
    },
    cell: ({ row }) => {
        const vehicleType: string = row.getValue("vehicleType");
        
        return (
          <ReportResultsByVehicleType vehicleType={vehicleType} type="total"/>  
        )
      },
  },
];
