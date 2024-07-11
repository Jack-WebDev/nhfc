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
import ViewApplication from "../_components/ViewApplication";
import "../_components/EligibilityCheck.css";

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
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [steps, setSteps] = React.useState<{ message: string; result: string }[]>([]);
  const [result, setResult] = React.useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      const res = await axios.get("/api/applications");
      // console.log(res.data)
      setData(res.data);
    };

    fetchApplications();
  }, []);

  const EligibilityChecker = async () => {
    setIsModalOpen(true);
    setIsLoading(true);
    setSteps([]);
    setResult(null);

    const processSteps = [
      'Checking credit score...',
      'Verifying income...',
      'Checking employment status...',
      'Validating identity...',
      'Reviewing application history...'
    ];

    let finalEligibility = true;

    for (let i = 0; i < processSteps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const stepResult = Math.random() > 0.2 ? 'Passed' : 'Failed';
      setSteps((prevSteps) => [...prevSteps, { message: processSteps[i], result: stepResult }]);

      if (stepResult === 'Failed') {
        finalEligibility = false;
      }
    }

    setResult(finalEligibility ? 'Eligible' : 'Not Eligible');
    setIsLoading(false);

    

  }



  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleViewApplication = (loan: LoanApplication) => {
    router.push(`/dashboard/applications/${loan.id}`);
  }

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
              <DropdownMenuItem onClick={() => handleViewApplication(loan)}>
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => EligibilityChecker()}>Eligibility Check</DropdownMenuItem>
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
    <>
    <div className="w-full">
      <h1 className="text-3xl font-semibold">Loan Applications</h1>
      <div className="flex justify-between items-baseline mb-8">
        <h2>Applications List</h2>

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
    {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <button className="close-button" onClick={closeModal}>
                &times;
              </button>
              {isLoading ? (
                <div className="loading p-8">
                  <div className="spinner"></div>
                  <span>Checking eligibility...</span>
                </div>
              ) : (
                <div className="result">
                    <h3 className='underline text-center text-lg font-semibold my-4'>Eligibility Results</h3>
                  <ul className='grid gap-y-4 '>
                    {steps.map((step, index) => (
                      <li key={index} className={`text-black ${step.result === 'Passed' ? 'passed text-green-700' : 'failed text-red-700'}`}>
                        {step.message} <span className='font-bold'>{step.result}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="summary">
                    <p><strong>Overall Result: {result}</strong></p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
    </>
  );
}
