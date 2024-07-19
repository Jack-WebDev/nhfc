"use client";

import React, { useState, useEffect, Fragment } from "react";
import Modal from "./Modal";
import NewQueryForm from "./NewQueryForm";
import ViewQuery from "./ViewQuery";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "lucide-react";
import axios from "axios";

type Query = {
  id: string; // Assuming you have an id field for the query
  referenceNo: string;
  fullName: string;
  queryType: string;
  queryDate: string;
  queryStatus: "Open" | "Closed" | "Pending Review" | "Approved" | "Rejected";
  description: string;
  appliedLoan: string;
  replyTo?: string;
  attachments?: string[];
};

const statusStyles: { [key in Query["queryStatus"]]: string } = {
  Open: "bg-green-200 text-green-800",
  Closed: "bg-blue-200 text-blue-800",
  "Pending Review": "bg-yellow-200 text-yellow-800",
  Approved: "bg-green-500 text-white",
  Rejected: "bg-red-500 text-white",
};

const QueriesList: React.FC = () => {
  const [queries, setQueries] = useState<Query[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState<Query | null>(null);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axios.get("/api/userqueries");
        setQueries(response.data);
      } catch (error) {
        console.error("Error fetching queries:", error);
      }
    };

    fetchQueries();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenViewModal = (query: Query) => {
    setSelectedQuery(query);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedQuery(null);
  };

  const addQuery = async (newQuery: Query) => {
    try {
      const response = await axios.post("/api/userqueries", newQuery);
      setQueries((prevQueries) => [...prevQueries, response.data]);
    } catch (error) {
      console.error("Error adding query:", error);
    }
  };

  const saveQuery = async (updatedQuery: Query) => {
    try {
      const response = await axios.patch(
        `/api/userqueries/${updatedQuery.id}`,
        updatedQuery
      );
      setQueries((prevQueries) =>
        prevQueries.map((query) =>
          query.id === updatedQuery.id ? response.data : query
        )
      );
    } catch (error) {
      console.error("Error saving query:", error);
    }
  };

  const closeQuery = async (query: Query) => {
    try {
      const response = await axios.patch(`/api/userqueries`, {
        id: query.id,
        queryStatus: "Closed",
      });
      setQueries((prevQueries) =>
        prevQueries.map((q) =>
          q.id === query.id ? { ...q, queryStatus: "Closed" } : q
        )
      );
    } catch (error) {
      console.error("Error closing query:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Queries</h1>
        <button
          onClick={handleOpenModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          + New Query
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <NewQueryForm onClose={handleCloseModal} addQuery={addQuery} />
      </Modal>
      {selectedQuery && (
        <ViewQuery
          isOpen={isViewModalOpen}
          onClose={handleCloseViewModal}
          query={selectedQuery}
          saveQuery={saveQuery}
        />
      )}
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 mb-20">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Reference No
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Full Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Query Type
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Query Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Query Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {queries.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-4 whitespace-nowrap text-center text-gray-500"
                >
                  No queries found.
                </td>
              </tr>
            ) : (
              queries.map((query, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {query.referenceNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {query.fullName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {query.queryType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {query.queryDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        statusStyles[query.queryStatus]
                      }`}
                    >
                      {query.queryStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="flex items-center text-gray-500 hover:text-gray-700">
                          <EllipsisVerticalIcon
                            className="w-5 h-5"
                            aria-hidden="true"
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 mt-2 w-36 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700"
                                  } group flex items-center px-4 py-2 text-sm w-full`}
                                  onClick={() => handleOpenViewModal(query)}
                                >
                                  View Query
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  type="button"
                                  className={`${
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700"
                                  } group flex items-center px-4 py-2 text-sm w-full`}
                                  onClick={() => closeQuery(query)}
                                >
                                  Close Query
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QueriesList;
