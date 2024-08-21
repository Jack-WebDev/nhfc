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
import { RespondToQuery } from "@/components/QueryResponse";

export default function Queries() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState<Queries[]>([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState<Queries | null>(null);
  const [reply, setReply] = useState<string>("");
  const user = useUserContext();

  useEffect(() => {
    const fetchQueries = async () => {
      const res = await axios.get("/api/queries");
      setData(res.data);
    };

    fetchQueries();
  }, []);

  const handleViewQuery = (query: Queries) => {
    setSelectedQuery(query);
    setDialogOpen(true);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      replyTo: reply,
    };
    try {
      console.log(formData);
      // await createQuery(formData);
    } catch (error) {
      console.log(error);
    }
  };

  const QueryDialog = ({ query, closeDialog }: any) => {
    console.log(query);
    const formattedDate = query?.createdAt;
    return (
      <Dialog open={true} onOpenChange={closeDialog}>
        <DialogContent>
          <DialogHeader className="flex items-center justify-between px-4">
            <DialogTitle>Query Details</DialogTitle>
            <h2>{query?.referenceNo}</h2>
          </DialogHeader>
          <div>

          <div className="flex justify-evenly items-center">
            <div className="grid ">
              <Label htmlFor="name" className="text-right">
                Full Name
              </Label>
              <p>{query?.fullName}</p>
            </div>
            <div className="grid">
              <Label htmlFor="username" className="text-right">
                Query Type
              </Label>
              <p>{query?.queryType}</p>
            </div>

          </div>
          <div className="flex justify-evenly items-center">
            <div className="grid ">
              <Label htmlFor="name" className="text-right">
                Loan Applied For
              </Label>
              <p>{query?.loanAppliedFor}</p>
            </div>
            <div className="grid">
              <Label htmlFor="username" className="text-right">
                Query Status
              </Label>
              <p>{query?.queryStatus}</p>
            </div>

          </div>
          </div>

          <div>
            <Label>Description</Label>
            <p>{query?.describeQuery}</p>
          </div>

          <div>
            <Label>Reply To</Label>
            <Input placeholder="Respond to the query" value={reply} onChange={(e) => setReply(e.target.value)} />
          </div>


          <DialogFooter>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  const columns: ColumnDef<Queries>[] = [
    {
      accessorKey: "referenceNo",
      header: "Reference No",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("referenceNo")}</div>
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
        console.log(query);
        return (
          <RespondToQuery query={query} />
          // <DropdownMenu>
          //   <DropdownMenuTrigger asChild>
          //     <Button variant="ghost" className="h-8 w-8 p-0">
          //       <span className="sr-only">Open menu</span>
          //       <MoreHorizontal className="h-4 w-4" />
          //     </Button>
          //   </DropdownMenuTrigger>
          //   <DropdownMenuContent>
          //     <DropdownMenuItem onClick={() => handleViewQuery(query)}>
          //       View Query
          //     </DropdownMenuItem>
          //     <DropdownMenuSeparator />
          //     <DropdownMenuItem>Close Query</DropdownMenuItem>
          //   </DropdownMenuContent>
          // </DropdownMenu>
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
      {isDialogOpen && selectedQuery && (
        <QueryDialog
          query={selectedQuery}
          closeDialog={() => setDialogOpen(false)}
        />
      )}
    </div>
  );
}
