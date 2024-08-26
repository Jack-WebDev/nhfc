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
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  FileText,
} from "lucide-react";

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
import { Download, Eye, Plus } from "lucide-react";
import {
  Badge,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  PageHeader,
} from "@/components";
import axios from "axios";
import Link from "next/link";

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
  ApplicationType: string;
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
  const [data, setData] = React.useState<any[]>([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const [res1, res2] = await Promise.all([
          axios.get("/api/applications"),
          axios.get("/api/applications/first-home"),
        ]);

        // console.log(res1.data,res2.data)

        // Combine the results
        const combinedData = [...res1.data, ...res2.data];
        setData(combinedData);
        // console.log(combinedData);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchApplications();
  }, []);

  const handleViewApplication = (loan: LoanApplication) => {
    router.push(`/frontend/${loan.id}`);
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

  const formatAmount = (amount: string) => {
    // Convert the amount to a number and ensure it has two decimal places
    let number = parseFloat(amount.replace(/[R,]/g, "")).toFixed(2);

    // Split the number into the integer part and the decimal part
    let [integerPart, decimalPart] = number.split(".");

    // Add commas as thousand separators
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Combine the integer part and decimal part
    return "R" + integerPart + "." + decimalPart;
  };

  const columns: ColumnDef<LoanApplication>[] = [
    {
      accessorKey: "LoanType",
      header: "Finance Solution",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("LoanType")}</div>
      ),
    },
    {
      accessorKey: "ApplicationType",
      header: "Application Type",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("ApplicationType")}</div>
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
      header: () => <div>Application Amount</div>,
      cell: ({ row }) => {
        const loanAmount: string = row.getValue("LoanAmount");
        return <div className="font-medium">{loanAmount}</div>;
      },
    },
    {
      accessorKey: "LoanStatus",
      header: "Status",
      cell: ({ row }) => {
        const loanStatus: string = row.getValue("LoanStatus");
        let variant;

        switch (loanStatus) {
          case "Pending":
            variant = "yellow";
            break;
          case "Approved":
            variant = "green";
            break;
          case "Rejected":
            variant = "red";
            break;
          default:
            variant = "yelllow"; // Fallback variant
        }

        return (
          <div className="capitalize">
            <Badge className={`bg-${variant}-500 text-white`}>
              {loanStatus}
            </Badge>
          </div>
        );
      },
    },

    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const loan = row.original;
        // console.log(loan)

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => handleViewApplication(loan)}
                className="flex gap-x-2"
              >
                <Eye />
                View Details
              </DropdownMenuItem>
              {/* <DropdownMenuItem>Edit Application</DropdownMenuItem> */}
              <DropdownMenuItem className="flex gap-x-2">
                <Download /> Download File
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const [pagination, setPagination] = React.useState({
    pageIndex: 1,
    pageSize: 6,
  });

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
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  return (
    <>
      <div className="w-full">
        {/* <h1 className="text-3xl font-semibold">My Applications</h1> */}
        <div className="flex justify-between items-baseline mb-8">
          <PageHeader Icon={FileText} title="My Applications" />
          {/* <h2>Applications List</h2> */}

          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="flex items-center gap-x-2 bg-blue-500 text-white py-2 px-8 rounded-lg hover:bg-blue-700"
                onClick={() => router.push("/frontend/apply")}
              >
                <Plus /> Start New Application
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Application Type</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 items-stretch gap-x-4">
                <Link href={"#"} className="border border-black rounded-xl p-8">
                  <h2>Apply for a project</h2>
                </Link>
                <Link href={"/frontend/apply"} className="border border-black rounded-xl p-8">
                  <h2>Apply for a loan or to invest in projects</h2>
                </Link>
              </div>
            </DialogContent>
          </Dialog>
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
        {isDialogOpen && selectedLoan && (
          <LoanModal
            loan={selectedLoan}
            closeDialog={() => setDialogOpen(false)}
          />
        )}
      </div>
      <div className="flex justify-center flex-col items-center gap-2 mt-12">
        <div className="flex items-center gap-4">
          <Button
            className="border rounded p-1 bg-blue-600 text-white hover:bg-blue-400"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft />
          </Button>
          <Button
            className="border rounded p-1 bg-blue-600 text-white hover:bg-blue-400"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>
          <Button
            className="border rounded p-1 bg-blue-600 text-white hover:bg-blue-400"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </Button>
          <Button
            className="border rounded p-1 bg-blue-600 text-white hover:bg-blue-400"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight />
          </Button>
        </div>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount().toLocaleString()}
          </strong>
        </span>
      </div>
    </>
  );
}
