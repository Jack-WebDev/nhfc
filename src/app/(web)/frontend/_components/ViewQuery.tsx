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

const ViewQuery: React.FC<ViewQueryProps> = ({ isOpen, onClose, query, saveQuery }) => {
  const [replyTo, setReplyTo] = useState(query.replyTo || "");
  const [attachments, setAttachments] = useState<File[]>([]);

  useEffect(() => {
    if (query.attachments) {
      setAttachments(query.attachments.map((fileName) => new File([], fileName)));
    }
  }, [query.attachments]);

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files));
    }
  };

  const handleReplyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Query Details</h2>
        <p><strong>Reference No:</strong> {query.referenceNo}</p>
        <p><strong>Full Name:</strong> {query.fullName}</p>
        <p><strong>Query Type:</strong> {query.queryType}</p>
        <p><strong>Query Date:</strong> {query.queryDate}</p>
        <p><strong>Query Status:</strong> {query.queryStatus}</p>
        <p><strong>Description:</strong> {query.description}</p>
        <p className="mb-4"><strong>Applied Loan:</strong> {query.appliedLoan}</p>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="replyTo">
            Reply To
          </label>
          <input
            type="text"
            id="replyTo"
            value={replyTo}
            onChange={handleReplyChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="attachments">
            Attachments
          </label>
          <input
            type="file"
            id="attachments"
            multiple
            onChange={handleAttachmentChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <ul>
            {attachments.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ViewQuery;
