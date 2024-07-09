"use client";

import React from 'react'


import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus } from 'lucide-react';

const data: Payment[] = [
  {
    referenceNumber: "NHFC-34de",
    fullName: "John Doe",
    queryType: "Home Purchase Loan",
    queryDate: "2022-10-09",
    status: "Open",
  },
  {
    referenceNumber: "NHFC-34de",
    fullName: "John Doe",
    queryType: "Home Purchase Loan",
    queryDate: "2022-10-09",
    status: "Open",
  },
  {
    referenceNumber: "NHFC-34de",
    fullName: "John Doe",
    queryType: "Home Purchase Loan",
    queryDate: "2022-10-09",
    status: "Open",
  },
  {
    referenceNumber: "NHFC-34de",
    fullName: "John Doe",
    queryType: "Home Purchase Loan",
    queryDate: "2022-10-09",
    status: "Open",
  },
  {
    referenceNumber: "NHFC-34de",
    fullName: "John Doe",
    queryType: "Home Purchase Loan",
    queryDate: "2022-10-09",
    status: "Open",
  },
  

]

export type Payment = {
  status: string;
  referenceNumber: string;
  fullName: string;
  queryType: string;
  queryDate: string;
}

const columns: ColumnDef<Payment>[] = [


  {
    accessorKey: "referenceNumber",
    header: "Reference Number",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("referenceNumber")}</div>
    ),
  },
  {
    accessorKey: "queryType",
    header: "Query Type",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("queryType")}</div>
    ),
  },
  {
    accessorKey: "queryDate",
    header: "Query Date",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("queryDate")}</div>
    ),
  },
  {
    accessorKey: "fullName",
    header: "Full Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("fullName")}</div>
    ),
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },


  {
    id: "actions",
    header: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">

            <DropdownMenuItem>View Query</DropdownMenuItem>
            <DropdownMenuItem>Close Query</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <h1 className='text-3xl font-semibold'>My Queries</h1>
      <div className="flex justify-between items-baseline my-8">
        <h2>Queries List</h2>
      </div>
      <div className="rounded-xl border">
        <Table className='bg-white rounded-xl'>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
 
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
