"use client";

import React, { useState } from "react";
import { useTable, Column } from "react-table";
import { useForm, SubmitHandler } from "react-hook-form";

interface DataRow {
  id: string;
  name: string;
  description: string;
}

interface FormValues {
  name: string;
  description: string;
}

type DataTableProps = {
  title: string;
};

export const DataTable = ({ title }: DataTableProps) => {
  const [data, setData] = useState<DataRow[]>([
    {
      id: "1",
      name: "Increased Costs",
      description:
        "      Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam libero excepturi temporibus.",
    },
    {
      id: "2",
      name: "Reduced Profits",
      description:
        "      Lorem ipsum dolor sit amet Totam libero excepturi temporibus.",
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);

  const columns: Column<DataRow>[] = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },

      {
        Header: `${title} Description`,
        accessor: "description",
      },
      {
        Header: "Actions",
        Cell: ({ row }: any) => (
          <div className="flex space-x-2">
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              onClick={() => handleEdit(row.original.id)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
    reset();
  };

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="p-6  border border-gray-200 rounded-xl shadow-xl">
      <div className="flex justify-between items-center mb-4">

      <h1 className="text-xl font-semibold">{title}</h1>

      {isOpen ? (
        <>
          <form
            onSubmit={handleSubmit(handleAddOrEdit)}
            className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6"
          >
            <input
              {...register("name", { required: true })}
              placeholder="Name"
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              {...register("description", { required: true })}
              placeholder="Description"
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={() => setIsOpen(true)}
            >
              {editingId ? "Update" : "Add"}
            </button>
          </form>
        </>
      ) : (
        <>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={handleOpenForm}
          >
            {editingId ? "Update" : "Add"}
          </button>
        </>
      )}
      </div>

      <table
        {...getTableProps()}
        className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg"
      >
        <thead className="bg-gray-200">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  key={column.id}
                  className="text-left p-4 font-semibold text-gray-600"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                key={row.id}
                className="border-t border-gray-200 hover:bg-gray-100"
              >
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    key={cell.column.id}
                    className="p-4 text-gray-700"
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
