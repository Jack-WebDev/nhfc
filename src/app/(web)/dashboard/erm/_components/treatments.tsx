"use client"
import React, { useState } from 'react';

interface Treatment {
  name: string;
  description: string;
  owner: string;
  startDate: string;
  endDate: string;
  progress: number;
  status: string;
}

const initialTreatments: Treatment[] = [
  {
    name: 'Risk Assessment',
    description: 'Assessing risks associated with financial transactions.',
    owner: 'John Doe',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    progress: 50,
    status: 'In Progress',
  },
  {
    name: 'Compliance Review',
    description: 'Ensuring compliance with regulatory requirements.',
    owner: 'Jane Smith',
    startDate: '2024-03-01',
    endDate: '2024-09-30',
    progress: 75,
    status: 'In Progress',
  },
  // Add more treatments as needed
];

const statuses = ['Not Started', 'In Progress', 'Completed', 'On Hold'];

const TreatmentTable: React.FC = () => {
  const [treatments, setTreatments] = useState<Treatment[]>(initialTreatments);

  const handleInputChange = <K extends keyof Treatment>(
    index: number,
    field: K,
    value: Treatment[K]
  ) => {
    const newTreatments = [...treatments];
    newTreatments[index][field] = value;
    setTreatments(newTreatments);
  };
  

  return (
    <div className="container mx-auto py-8">
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left">Name</th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left">Description</th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left">Owner</th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left">Start Date</th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left">End Date</th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left">Progress</th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {treatments.map((treatment, index) => (
              <tr key={index} className="border-b hover:bg-gray-100 transition duration-200">
                <td className="px-6 py-4 border-r">
                  <input
                    type="text"
                    className="w-full bg-transparent outline-none"
                    value={treatment.name}
                    onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                  />
                </td>
                <td className="px-6 py-4 border-r">
                  <input
                    type="text"
                    className="w-full bg-transparent outline-none"
                    value={treatment.description}
                    onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                  />
                </td>
                <td className="px-6 py-4 border-r">
                  <input
                    type="text"
                    className="w-full bg-transparent outline-none"
                    value={treatment.owner}
                    onChange={(e) => handleInputChange(index, 'owner', e.target.value)}
                  />
                </td>
                <td className="px-6 py-4 border-r">
                  <input
                    type="date"
                    className="w-full bg-transparent outline-none"
                    value={treatment.startDate}
                    onChange={(e) => handleInputChange(index, 'startDate', e.target.value)}
                  />
                </td>
                <td className="px-6 py-4 border-r">
                  <input
                    type="date"
                    className="w-full bg-transparent outline-none"
                    value={treatment.endDate}
                    onChange={(e) => handleInputChange(index, 'endDate', e.target.value)}
                  />
                </td>
                <td className="px-6 py-4 border-r">
                  <input
                    type="number"
                    className="w-full bg-transparent outline-none"
                    value={treatment.progress}
                    onChange={(e) => handleInputChange(index, 'progress', parseInt(e.target.value))}
                    min={0}
                    max={100}
                  />
                  <div className="relative w-full h-4 bg-gray-200 rounded mt-1">
                    <div
                      className="absolute top-0 left-0 h-4 bg-blue-500 rounded"
                      style={{ width: `${treatment.progress}%` }}
                    ></div>
                    <span className="absolute top-0 left-0 right-0 text-xs text-center font-bold">
                      {treatment.progress}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <select
                    className="w-full bg-transparent outline-none"
                    value={treatment.status}
                    onChange={(e) => handleInputChange(index, 'status', e.target.value)}
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default TreatmentTable;
