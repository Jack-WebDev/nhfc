"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge, Button, DataTableColumnHeader, DropMenu } from "@/components";
import { Checkbox } from "@/components";
import { NoticeType, UserType } from "@/schema";
import url from "@/lib/apiUrl";
import { NoticeNumber } from "./noticeNumber";


export const noticeColumns: ColumnDef<NoticeType>[] = [

    
  {
    accessorKey: "select",
    header: ({table}) => (
        <Checkbox
            className="bg-white"
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select All"
        />
    ),
    cell: ({row}) => (
        <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
        />
    ),

    enableSorting: false,
    enableHiding: true

  },
  {
    accessorKey: "notice",
    header: ({column}) => {
        return <DataTableColumnHeader column={column} title="NoticeNumber"/>

    },

    cell:  ({row}) => {
        const notice = row.original
        return (
          <NoticeNumber bookNumber={notice.bookNumber} check={notice.check} noticeNumber={Number(notice.noticeNumber)}  />
        )
    },
  },
  {
    accessorKey: "noticeNumber",
    header: ({column}) => {
        return <DataTableColumnHeader column={column} title="Notice"/>
    },

    
  },
  
  {
    accessorKey: "check",
    header: ({column}) => {
        return <DataTableColumnHeader column={column} title="Check"/>
    },

  },
  
  {
    accessorKey: "status",
    header: ({column}) => {
        return <DataTableColumnHeader column={column} title="Status"/>
    },
    cell: ({row}) => {
      const status: string = row.getValue("status")
      return (

        <Badge 
          variant={status === "Active" ? 'green': 'red' }
        >
          <p className="text-xs font-light">{status.toLocaleLowerCase()}</p>
        </Badge>
    
      )
    }
  },
 
 
];
