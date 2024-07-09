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
    loanType: "Home Purchase Loan",
    applicationID: "NHFC-34de",
    submittedDate: "2022-10-09",
    loanAmount: 10000000,
    status: "pending",
  },
  {
    loanType: "Home Purchase Loan",
    applicationID: "NHFC-34de",
    submittedDate: "2022-10-09",
    loanAmount: 10000000,
    status: "pending",
  },
  {
    loanType: "Home Purchase Loan",
    applicationID: "NHFC-34de",
    submittedDate: "2022-10-09",
    loanAmount: 10000000,
    status: "pending",
  },
  {
    loanType: "Home Purchase Loan",
    applicationID: "NHFC-34de",
    submittedDate: "2022-10-09",
    loanAmount: 10000000,
    status: "pending",
  }

]

export type Payment = {
  status: string
  loanAmount: number,
  submittedDate: string
  loanType: string
  applicationID: string
}

const columns: ColumnDef<Payment>[] = [


  {
    accessorKey: "loanType",
    header: "Loan Type",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("loanType")}</div>
    ),
  },
  {
    accessorKey: "applicationID",
    header: "Application ID",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("applicationID")}</div>
    ),
  },
  {
    accessorKey: "submittedDate",
    header: "Submitted Date",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("submittedDate")}</div>
    ),
  },
  {
    accessorKey: "loanAmount",
    header: () => <div className="text-right">Loan Amount</div>,
    cell: ({ row }) => {
      const loanAmount = parseFloat(row.getValue("loanAmount"))

      return <div className="text-right font-medium">{`R${loanAmount}`}</div>
    },
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

            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Edit Application</DropdownMenuItem>
            <DropdownMenuItem>Generate PDF</DropdownMenuItem>
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
      <div className="flex justify-between items-baseline mb-8">
        <h2>Queries List</h2>
        <button className='flex items-center gap-x-2 bg-blue-500 text-white py-2 px-8 rounded-lg'><Plus/> Open Query</button>
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
