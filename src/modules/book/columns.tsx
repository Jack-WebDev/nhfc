"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge, Button, DataTableColumnHeader, DropMenu } from "@/components";
import { Checkbox } from "@/components";
import { BatchType, BookType, UserType } from "@/schema";
import url from "@/lib/apiUrl";
import { UserDropMenu } from "../user/userDropMenu";
import { formatDate } from "@/lib";
import { BatchDropMenu, User } from "..";
import { BookDropMenu } from "./bookDropMenu";

export const bookColumns: ColumnDef<BookType>[] = [
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
    accessorKey: "bookNumber",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Book number" />;
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
    accessorKey: "total",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Total" />;
    },
    
  },
  {
    accessorKey: "complete",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Complete" />;
    },

    cell: ({ row }) => {
      
      const complete: number = row.getValue("complete");
      return (
        <p className="w-full text-center">
          {complete}
        </p>
      );
    },
  },
  {
    accessorKey: "officerId",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Officer" />;
    },

    cell: ({row}) => {
      const officerId: string = row.getValue("officerId");
      return (
        <User userId={officerId}/>
      )
    }
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Status" />;
    },

    cell: ({row}) => {
      const status: string = row.getValue("status")
      return (
        <Badge variant={status === "New_Stock"? "red" : status === "Issued"? "orange" :  "green"}>
          {status.split("_").join(" ")}
        </Badge>
      )
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
      const book = row.original;

      return (
        <div className="flex items-center justify-center">
          <BookDropMenu book={book} linkUrl={`books/${book.bookNumber}/notices`} />
        </div>
      );

      //You can access the row data using row.original in the cell function.
      //Use this to handle actions for your row eg. use the id to make a DELETE call to your API
    },
  },
];
