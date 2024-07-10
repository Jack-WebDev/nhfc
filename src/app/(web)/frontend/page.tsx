"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
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
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components";
import axios from "axios";

type LoanApplication = {
  id: string;
  NameOfCompany: string;
  ContactPerson: string;
  Email: string;
  PhoneNumber: string;
  Address: string;
  City: string;
  Province: string;
  PostalCode: string;
  Country: string;
  LoanType: string;
  LoanAmount: string;
  LoanStatus: string;
  createdAt: any;
};

export default function Applications() {
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const [selectedLoan, setSelectedLoan] = React.useState<any | null>(null);
  const [data, setData] = React.useState<LoanApplication[]>([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const res = await axios.get("/api/applications");
      // console.log(res.data)
      setData(res.data);
    };

    fetchApplications();
  }, []);

  const handleViewLoan = (loan: any) => {
    setSelectedLoan(loan);
    setDialogOpen(true);
  };

  const LoanModal = ({ loan, closeDialog }: any) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Dialog open={true} onOpenChange={closeDialog}>
            <DialogTrigger asChild>
              <span className="cursor-pointer">
                <DotsHorizontalIcon className="h-4 w-4" />
              </span>
            </DialogTrigger>
            <DialogContent className="w-[100%] text-black">
              <DialogHeader className="flex flex-row items-baseline justify-around">
                <DialogTitle>Financing Details</DialogTitle>
              </DialogHeader>
              <div>
                <div className="flex justify-between items-center">
                  <p>Loan Type: {loan.LoanType}</p>
                  <p>Application ID: {loan.id}</p>
                </div>

                <div className="flex justify-between items-center">
                  <p>Submitted Date: {loan.submittedDate}</p>
                  <p>Loan Amount: {loan.LoanAmount}</p>
                </div>

                <div className="flex justify-between items-center">
                  <p>Status: {loan.LoanStatus}</p>
                  <p>Contact Person: {loan.ContactPerson}</p>
                </div>

                <div className="flex justify-between items-center">
                  <p>Email: {loan.Email}</p>
                  <p>Phone Number: {loan.PhoneNumber}</p>
                </div>

                <div className="flex justify-between items-center">
                  <p>Address: {loan.Address}</p>
                  <p>City: {loan.City}</p>
                </div>

                <div className="flex justify-between items-center">
                  <p>Province: {loan.Province}</p>
                  <p>Postal Code: {loan.PostalCode}</p>
                </div>

                <div className="flex justify-between items-center">
                  <p>Country: {loan.Country}</p>
                  <p>Name of Company: {loan.NameOfCompany}</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </DropdownMenuTrigger>
      </DropdownMenu>
    );
  };

  const columns: ColumnDef<LoanApplication>[] = [
    {
      accessorKey: "LoanType",
      header: "Loan Type",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("LoanType")}</div>
      ),
    },
    {
      accessorKey: "id",
      header: "Application ID",
      cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "createdAt",
      header: "Submitted Date",
      cell: ({ row }) => {
        const submissionDate = row.original.createdAt;
        const formattedDate = new Date(submissionDate)
          .toISOString()
          .split("T")[0];

        return <div>{formattedDate}</div>;
      },
    },

    {
      accessorKey: "LoanAmount",
      header: () => <div>Loan Amount</div>,
      cell: ({ row }) => {
        const loanAmount = row.getValue("LoanAmount");

        return <div className="font-medium">{`R ${loanAmount}`}</div>;
      },
    },
    {
      accessorKey: "LoanStatus",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("LoanStatus")}</div>
      ),
    },

    {
      id: "actions",
      header: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const loan = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleViewLoan(loan)}>
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>Edit Application</DropdownMenuItem>
              <DropdownMenuItem>Generate PDF</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

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
  });

  return (
    <div className="w-full">
      <h1 className="text-3xl font-semibold">My Loan Applications</h1>
      <div className="flex justify-between items-baseline mb-8">
        <h2>Applications List</h2>
        <button
          className="flex items-center gap-x-2 bg-blue-500 text-white py-2 px-8 rounded-lg"
          onClick={() => router.push("/frontend/apply")}
        >
          <Plus /> Start New Application
        </button>
      </div>
      <div className="rounded-xl border">
        <Table className="bg-white rounded-xl">
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
                  );
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
  );
}
