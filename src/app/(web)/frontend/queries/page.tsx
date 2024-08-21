"use client";

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
import { ArrowUpDown, ChevronDown, MoreHorizontal, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { format } from "date-fns";

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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { Queries } from "@prisma/client";
import { use, useEffect, useState } from "react";
import axios from "axios";
import { Textarea } from "@/components";
import { Applications } from "@prisma/client";
import { createQuery } from "@/actions/createQuery";
import { useUserContext } from "@/context";
import { ClientRespondToQuery } from "@/components/ClientQuery";

export default function Queries() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState<Queries[]>([]);
  const [applications, setApplications] = useState<Applications[]>([]);
  const [queryType, setQueryType] = useState<string>("");
  const [appliedLoan, setAppliedLoan] = useState<string>("");
  const [describeQuery, setDescribeQuery] = useState<string>("");
  const  user  = useUserContext();
  console.log(user)

  useEffect(() => {
    const fetchQueries = async () => {
      const res = await axios.get("/api/queries");
      setData(res.data);
    };

    fetchQueries();
  }, []);

  useEffect(() => {
    const fetchApplications = async () => {
      const res = await axios.get("/api/applications");
      setApplications(res.data);
    };
    fetchApplications();
  }, []);

  const columns: ColumnDef<Queries>[] = [
    {
      accessorKey: "referenceNo",
      header: "Reference No",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("referenceNo")}</div>
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
      accessorKey: "createdAt",
      header: "Query Date",
      cell: ({ row }) => {
        const createdAtDate = row.original.createdAt;
        const formattedDate = format(new Date(createdAtDate), "MM/dd/yyyy");
        return <div>{formattedDate}</div>;
      },
    },

    {
      accessorKey: "queryStatus",
      header: "Query Status",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("queryStatus")}</div>
      ),
    },

    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const query = row.original;
        return (
          <ClientRespondToQuery  query={query}/>
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      fullName: user?.data?.fullName,
      queryType: queryType,
      appliedLoan: appliedLoan,
      describeQuery: describeQuery,
    };
    try {
       const res = await createQuery(formData);
       if(res === true){
         location.reload();
       }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Plus /> Create New Query
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Query</DialogTitle>
            <DialogDescription>
              Add a new query regarding your application.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Query Type
              </Label>
              <Select value={queryType} onValueChange={setQueryType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a query type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="complaint">Complaint</SelectItem>
                    <SelectItem value="enquiry">Enquiry</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                    <SelectItem value="case">Case</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Applied Loans
              </Label>
              <Select value={appliedLoan} onValueChange={setAppliedLoan}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select applied loan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {applications.map((application) => (
                      <SelectItem key={application.id} value={application.LoanType}>
                        {application.LoanType}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="describeQuery" className="text-right">
                Describe Query
              </Label>
              <Textarea
                id="describeQuery"
                placeholder="Describe your query here...."
                value={describeQuery}
                className="col-span-3"
                onChange={(e) => setDescribeQuery(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="clientAttachment" className="text-right">
                Attachments
              </Label>
              <input type="file" id="clientAttachment" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="rounded-xl bg-white border">
        <Table>
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
                  No queries for now.
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
  );
}
