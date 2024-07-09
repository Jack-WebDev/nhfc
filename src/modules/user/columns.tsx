"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge, Button, DataTableColumnHeader, DropMenu } from "@/components";
import { Checkbox } from "@/components";
import { UserType } from "@/schema";
import url from "@/lib/apiUrl";
import { UserDropMenu } from "./userDropMenu";

export const userColumns: ColumnDef<UserType>[] = [
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
    accessorKey: "email",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Email" />;
    },
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Full name" />;
    },

    cell: ({ row }) => {
      const user = row.original;
      const display: string = user.firstName + " " + user.lastName;
      return <p>{display}</p>;
    },
  },

  {
    accessorKey: "role",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Role" />;
    },
    cell: ({ row }) => {
      const role: string = row.getValue("role");
      return (
        <span className="capitalize">
          {role.split("_").join(" ").toLowerCase()}
        </span>
      );
    },
  },

  {
    accessorKey: "status",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Status" />;
    },
    cell: ({ row }) => {
      const status: string = row.getValue("status");
      return (
        <Badge variant={status === "Active" ? "green" : "red"}>
          <p className="text-xs font-light">{status.toLocaleLowerCase()}</p>
        </Badge>
      );
    },
  },

  {
    id: "actions",
    header: ({ column }) => {
      return <div className="text-center w-full">Actions</div>;
    },
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex items-center justify-center">
          <UserDropMenu user={user} linkUrl={`users/${user.id}`} />
        </div>
      );

      //You can access the row data using row.original in the cell function.
      //Use this to handle actions for your row eg. use the id to make a DELETE call to your API
    },
  },
];
