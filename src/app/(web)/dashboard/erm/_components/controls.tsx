"use client"
import React, { useState } from 'react';

interface Control {
  name: string;
  description: string;
  owner: string;
  effectiveness: string;
  type: string;
}

const initialControls: Control[] = [
  {
    name: 'Access Control',
    description: 'Restricts access to financial data based on roles.',
    owner: 'John Doe',
    effectiveness: 'High',
    type: 'Preventive',
  },
  {
    name: 'Transaction Monitoring',
    description: 'Monitors transactions for suspicious activities.',
    owner: 'Jane Smith',
    effectiveness: 'Medium',
    type: 'Detective',
  },
  // Add more controls as needed
];

const controlTypes = ['Preventive', 'Detective', 'Corrective'];

const ExistingControls: React.FC = () => {
  const [controls, setControls] = useState<Control[]>(initialControls);

  const handleInputChange = (
    index: number,
    field: keyof Control,
    value: string
  ) => {
    const newControls = [...controls];
    newControls[index][field] = value;
    setControls(newControls);
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Existing Controls</h2>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left">Name</th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left">Control Description</th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left">Control Owner</th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left">Effectiveness</th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left">Control Type</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {controls.map((control, index) => (
              <tr key={index} className="border-b hover:bg-gray-100 transition duration-200">
                <td className="px-6 py-4 border-r">
                  <input
                    type="text"
                    className="w-full bg-transparent outline-none"
                    value={control.name}
                    onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                  />
                </td>
                <td className="px-6 py-4 border-r">
                  <input
                    type="text"
                    className="w-full bg-transparent outline-none"
                    value={control.description}
                    onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                  />
                </td>
                <td className="px-6 py-4 border-r">
                  <input
                    type="text"
                    className="w-full bg-transparent outline-none"
                    value={control.owner}
                    onChange={(e) => handleInputChange(index, 'owner', e.target.value)}
                  />
                </td>
                <td className="px-6 py-4 border-r">
                  <input
                    type="text"
                    className="w-full bg-transparent outline-none"
                    value={control.effectiveness}
                    onChange={(e) => handleInputChange(index, 'effectiveness', e.target.value)}
                  />
                </td>
                <td className="px-6 py-4">
                  <select
                    className="w-full bg-transparent outline-none"
                    value={control.type}
                    onChange={(e) => handleInputChange(index, 'type', e.target.value)}
                  >
                    {controlTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
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

export default ExistingControls;
