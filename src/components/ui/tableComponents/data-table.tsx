"use client";

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,

} from "@/components";

import {  DataTableViewOptions} from "./dataTableViewOptions"

import { Button } from "@/components/ui";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { Input } from "@/components/ui";
import { DataTablePagination } from "./pagination";

interface DataTableProps<TData, TValue, searchColumn, search, pagination> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchColumn: searchColumn
  search: search
  pagination?:boolean
}

export function DataTable<TData, TValue, searchColumn, search, pagination>({
  columns,
  data,
  searchColumn,
  search,
  pagination
}: DataTableProps<TData, TValue, searchColumn, search, pagination>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
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
    <div className="flex flex-col flex-1 max-w-full  bg-white rounded-lg shadow-lg border p-4">
      { search === true && <div className="flex flex-col gap-4 items-start md:items-center md:flex-row justify-between py-4 ">
        <Input
          className="max-w-xs shadow-lg  h-12"
          placeholder={`Search by ${searchColumn}`}
          value={
            (table.getColumn(`${searchColumn}`)?.getFilterValue() as string) ?? ""
          }
          onChange={(e) =>
            table.getColumn(`${searchColumn}`)?.setFilterValue(e.target.value)
          }
        />

        <DataTableViewOptions table={table}/>
      </div>}
      <div className=" rounded-md border  min-h-0   min-w-0 overflow-x-auto h-fit">
        <Table className="shadow-lg rounded-lg ">
          <TableHeader className="bg-gray-300 text-black border hover:bg-gray-300">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-gray-300">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-gray-700 ">
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

          <TableBody className="font-normal text-xs text-gray-500">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-2">
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
                  No results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
        <DataTablePagination table={table}/>

   
      
    </div>
  );
}

// Re-use this components by calling it and pass the data props like so
// <DataTable columns={columns} data={data}/>
