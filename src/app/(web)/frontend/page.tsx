"use client";

import React from 'react'
import { useRouter } from "next/navigation";


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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components';

const data: Payment[] = [
  {
    id: "1",
    loanType: "Home Purchase Loan",
    applicationID: "NHFC-34de",
    submittedDate: "2022-10-09",
    loanAmount: 10000000,
    status: "pending",
  },
  {
    id: "2",
    loanType: "Car Purchase Loan",
    applicationID: "NHFC-34de",
    submittedDate: "2022-10-09",
    loanAmount: 10000000,
    status: "pending",
  },
  {
    id: "3",
    loanType: "House Purchase Loan",
    applicationID: "NHFC-34de",
    submittedDate: "2022-10-09",
    loanAmount: 10000000,
    status: "pending",
  },
  {
    id: "4",
    loanType: "Home Purchase Loan",
    applicationID: "NHFC-34de",
    submittedDate: "2022-10-09",
    loanAmount: 10000000,
    status: "pending",
  }

]

export type Payment = {
  id: string
  status: string
  loanAmount: number,
  submittedDate: string
  loanType: string
  applicationID: string
}



export default function Applications() {
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const [selectedLoan, setSelectedLoan] =
    React.useState<any | null>(null);

  const handleViewLoan = (loan: any) => {
    setSelectedLoan(loan);
    setDialogOpen(true);
  };

  const LoanModal = ({ loan,closeDialog }: any) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Dialog open={true} onOpenChange={closeDialog}>
            <DialogTrigger asChild>
              <span className="cursor-pointer">
                <DotsHorizontalIcon className="h-4 w-4" />
              </span>
            </DialogTrigger>
            <DialogContent className="w-[70%] text-black">
              <DialogHeader className="flex flex-row items-baseline justify-around">
                <DialogTitle>Loan Details</DialogTitle>

              </DialogHeader>
              <div>
                <h2>Loan Type: {loan.loanType}</h2>
                <h2>Application ID: {loan.applicationID}</h2>
                <h2>Submitted Date: {loan.submittedDate}</h2>
                <h2>Loan Amount: {loan.loanAmount}</h2>
                <h2>Status: {loan.status}</h2>
 
              </div>
            </DialogContent>
          </Dialog>
        </DropdownMenuTrigger>
      </DropdownMenu>
    );
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
        const loan = row.original
  
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
  
              <DropdownMenuItem onClick={() => handleViewLoan(loan)}>View Details</DropdownMenuItem>
              <DropdownMenuItem>Edit Application</DropdownMenuItem>
              <DropdownMenuItem>Generate PDF</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

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
      <h1 className='text-3xl font-semibold'>My Loan Applications</h1>
      <div className="flex justify-between items-baseline mb-8">
        <h2>Applications List</h2>
        <button className='flex items-center gap-x-2 bg-blue-500 text-white py-2 px-8 rounded-lg' onClick={() => router.push('/frontend/apply')}><Plus/> Start New Application</button>
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
      {isDialogOpen && selectedLoan && (
        <LoanModal
          loan={selectedLoan}
          closeDialog={() => setDialogOpen(false)}
        />
      )}
    </div>
  )
}
