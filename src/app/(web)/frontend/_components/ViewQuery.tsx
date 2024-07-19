import React, { useState, useEffect } from "react";
import Modal from "./Modal";

type ViewQueryProps = {
  isOpen: boolean;
  onClose: () => void;
  query: {
    referenceNo: string;
    fullName: string;
    queryType: string;
    queryDate: string;
    queryStatus: string;
    description: string;
    appliedLoan: string;
    replyTo?: string;
    attachments?: string[];
  };
  saveQuery: (updatedQuery: any) => void;
};

const ViewQuery: React.FC<ViewQueryProps> = ({
  isOpen,
  onClose,
  query,
  saveQuery,
}) => {
  const [replyTo, setReplyTo] = useState(query.replyTo || "");
  const [attachments, setAttachments] = useState<File[]>([]);

  useEffect(() => {
    if (query.attachments && Array.isArray(query.attachments)) {
      setAttachments(
        query.attachments.map((fileName) => new File([], fileName))
      );
    } else if (query.attachments && typeof query.attachments === "string") {
      setAttachments([new File([], query.attachments)]);
    }
  }, [query.attachments]);

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files));
    }
  };

  const handleReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyTo(e.target.value);
  };

  const handleSave = () => {
    const updatedQuery = {
      ...query,
      replyTo,
      attachments: attachments.map((file) => file.name),
    };
    saveQuery(updatedQuery);
    onClose();
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-red-100 text-red-800";
      case "in progress":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Query Details
        </h2>
        <div className="mb-6 space-y-2">
          <p className="text-lg">
            <strong>Reference No:</strong> {query.referenceNo}
          </p>
          <p className="text-lg">
            <strong>Full Name:</strong> {query.fullName}
          </p>
          <p className="text-lg">
            <strong>Query Type:</strong> {query.queryType}
          </p>
          <p className="text-lg">
            <strong>Query Date:</strong> {query.queryDate}
          </p>
          <p className="text-lg">
            <strong>Query Status:</strong>
            <span
              className={`inline-block ml-2 px-2 py-1 text-sm font-semibold rounded-full ${getStatusBadgeColor(
                query.queryStatus
              )}`}
            >
              {query.queryStatus}
            </span>
          </p>
          <p className="text-lg">
            <strong>Description:</strong> {query.description}
          </p>
          <p className="text-lg">
            <strong>Applied Loan:</strong> {query.appliedLoan}
          </p>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="replyTo"
          >
            Reply To
          </label>
          <textarea
            id="replyTo"
            value={replyTo}
            onChange={handleReplyChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="attachments"
          >
            Attachments
          </label>
          <input
            type="file"
            id="attachments"
            multiple
            onChange={handleAttachmentChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <ul className="mt-2 list-disc list-inside bg-gray-100 p-3 rounded-md">
            {attachments.map((file, index) => (
              <li key={index} className="text-gray-600 truncate">
                <a
                  href={file.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {file.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-end space-x-4">
          <button
            type="button"
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ViewQuery;
