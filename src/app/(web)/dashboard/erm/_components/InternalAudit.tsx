"use client";

import React, { useState } from "react";
import { useTable, Column } from "react-table";
import { useForm, SubmitHandler } from "react-hook-form";

interface DataRow {
  id: string;
  header1: string;
  header2: string;
  header3: string;
}

interface FormValues {
  header1: string;
  header2: string;
  header3: string;
}

type DataTableProps = {
  heading: string;
  title1: string;
  title2: string;
  title3: string;
};

export const InternalAudit = ({ heading, title1, title2, title3 }: DataTableProps) => {
  const [data, setData] = useState<DataRow[]>([
    {
      id: "1",
      header1: "Background Checks",
      header2: "Application Reviews",
      header3: "Acceptance Procedures",
    },
    {
      id: "2",
      header1: "Background Checks",
      header2: "Application Reviews",
      header3: "Acceptance Procedures",
    },
    {
      id: "3",
      header1: "Background Checks",
      header2: "Application Reviews",
      header3: "Acceptance Procedures",
    },
    {
      id: "4",
      header1: "Background Checks",
      header2: "Application Reviews",
      header3: "Acceptance Procedures",
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);

  const columns: Column<DataRow>[] = React.useMemo(
    () => [
      {
        Header: `${title1}`,
        accessor: "header1",
      },

      {
        Header: `${title2}`,
        accessor: "header2",
      },
      {
        Header: `${title3}`,
        accessor: "header3",
      },
      {
        Header: "Actions",
        Cell: ({ row }: any) => (
          <div className="flex space-x-2">
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
              onClick={() => handleEdit(row.original.id)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
              onClick={() => handleDelete(row.original.id)}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const { register, handleSubmit, reset } = useForm<FormValues>();

  const handleEdit = (id: string) => {
    setIsOpen(true);
    const rowData = data.find((row) => row.id === id);
    if (rowData) {
      reset(rowData);
      setEditingId(id);
    }
  };

  const handleDelete = (id: string) => {
    setData(data.filter((row) => row.id !== id));
  };

  const handleOpenForm = () => {
    setIsOpen(true);
    reset(); // Reset form fields when opening the form
  };

  const handleAddOrEdit: SubmitHandler<FormValues> = (formData) => {
    if (editingId) {
      setData((prevData) =>
        prevData.map((row) =>
          row.id === editingId ? { ...row, ...formData } : row
        )
      );
      setEditingId(null);
    } else {
      const newData = {
        id: (data.length + 1).toString(),
        ...formData,
      };
      setData([...data, newData]);
    }
    setIsOpen(false);
    reset();
  };

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-xl max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">{heading}</h1>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          onClick={handleOpenForm}
        >
          {editingId ? "Update" : "Add New"}
        </button>
      </div>

      {isOpen && (
        <form
          onSubmit={handleSubmit(handleAddOrEdit)}
          className="bg-gray-50 p-6 rounded-lg shadow-md mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              {...register("header1", { required: true })}
              placeholder="Enter Header 1"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              {...register("header2", { required: true })}
              placeholder="Enter Header 2"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              {...register("header3", { required: true })}
              placeholder="Enter Header 3"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              {editingId ? "Update" : "Add"}
            </button>
          </div>
        </form>
      )}

      <table
        {...getTableProps()}
        className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg"
      >
        <thead className="bg-gray-200 text-gray-600">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  key={column.id}
                  className="p-4 font-medium text-left"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="text-gray-700">
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                key={row.id}
                className="border-t border-gray-200 hover:bg-gray-100 transition-colors"
              >
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    key={cell.column.id}
                    className="p-4"
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
