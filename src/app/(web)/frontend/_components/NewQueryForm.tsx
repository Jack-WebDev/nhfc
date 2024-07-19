// src/app/(web)/frontend/_components/NewQueryForm.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";
import { useNotificationContext } from "./NotificationContext";

type NewQueryFormProps = {
  onClose: () => void;
  addQuery: (newQuery: any) => void;
};

const NewQueryForm: React.FC<NewQueryFormProps> = ({ onClose, addQuery }) => {
  const [queryType, setQueryType] = useState("General");
  const [appliedLoan, setAppliedLoan] = useState("#9458 Private Housing Finance");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { addNotification } = useNotificationContext();

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    const referenceNo = (Math.floor(Math.random() * 900000) + 100000).toString();
    formData.append("referenceNo", referenceNo);
    formData.append("fullName", "Linda Mangena");
    formData.append("queryType", queryType);
    formData.append("queryDate", new Date().toLocaleString());
    formData.append("queryStatus", "Open");
    formData.append("appliedLoan", appliedLoan);
    formData.append("description", description);
    if (file) {
      formData.append("file", file);
    }

    const res = await fetch('/api/userqueries', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      const newQuery = await res.json();
      addQuery(newQuery);
      toast.success("Query created successfully!");
      addNotification({
        message: "New query created successfully!",
        referenceNo,
        fullName: "Linda Mangena",
        queryType,
        queryDate: new Date().toLocaleString(),
        queryStatus: "Open",
        description,
        attachments: file ? URL.createObjectURL(file) : undefined,
      });
      onClose();
      router.push("/frontend/queries");
    } else {
      console.error("Failed to submit query");
      toast.error("Failed to submit query");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">New Query</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="queryType">
          Query Type
        </label>
        <select
          id="queryType"
          value={queryType}
          onChange={(e) => setQueryType(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
          <option value="General">General</option>
          <option value="Complaint">Complaint</option>
          <option value="Enquiry">Enquiry</option>
          <option value="Review">Review</option>
          <option value="Case">Case</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="appliedLoan">
          Applied Loans
        </label>
        <select
          id="appliedLoan"
          value={appliedLoan}
          onChange={(e) => setAppliedLoan(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
          <option value="#9458 Private Housing Finance">
            #9458 Private Housing Finance
          </option>
          <option value="#845000 Social Housing Finance">
            #845000 Social Housing Finance
          </option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Describe
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
          Attachments
        </label>
        <input
          type="file"
          id="file"
          onChange={handleFileChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Send
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NewQueryForm;
