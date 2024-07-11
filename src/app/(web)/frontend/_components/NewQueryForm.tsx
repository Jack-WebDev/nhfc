"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";

type NewQueryFormProps = {
  onClose: () => void;
};

const NewQueryForm: React.FC<NewQueryFormProps> = ({ onClose }) => {
  const [queryType, setQueryType] = useState("General");
  const [appliedLoan, setAppliedLoan] = useState(
    "#9458 Private Housing Finance"
  );
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newQuery = {
      referenceNo: (Math.floor(Math.random() * 900000) + 100000).toString(),
      fullName: "Linda Mangena",
      queryType,
      queryDate: new Date().toLocaleString(),
      queryStatus: "Open",
      appliedLoan,
      description,
      file,
    };
    console.log(newQuery)
    try {
      const res = await axios.post("/api/userqueries", newQuery);
      console.log(res);
      onClose();
    } catch (error) {
      console.log(error as AxiosError);
    }
    onClose();
  };

  const handleFileChange = (e: any) => {
    if (e.target.files) {
      setFile(e.target.files[0].name);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">New Query</h2>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="queryType"
        >
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
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="appliedLoan"
        >
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
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="description"
        >
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
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="file"
        >
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
