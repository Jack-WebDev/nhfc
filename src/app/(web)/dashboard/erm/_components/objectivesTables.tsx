"use client"

import React, { useState } from 'react';

interface ObjectiveRisk {
  riskId: string;
  risk: string;
  riskDescription: string;
  riskValue: number;
  priority: 'High' | 'Moderate' | 'Low';
  riskOwner: string;
}

const initialObjectiveRisks: ObjectiveRisk[] = [
  {
    riskId: 'R1',
    risk: 'Financial Loss',
    riskDescription: 'Potential financial loss due to market fluctuations.',
    riskValue: 80,
    priority: 'High',
    riskOwner: 'John Doe',
  },
  {
    riskId: 'R2',
    risk: 'Regulatory Compliance',
    riskDescription: 'Failure to comply with regulatory requirements.',
    riskValue: 60,
    priority: 'Moderate',
    riskOwner: 'Jane Smith',
  },
  // Add more risks as needed
];

interface ObjectiveRiskTreatment {
  name: string;
  description: string;
  owner: string;
  status: 'High' | 'Moderate' | 'Low';
  startDate: string;
  endDate: string;
}

const initialObjectiveRiskTreatments: ObjectiveRiskTreatment[] = [
  {
    name: 'Market Analysis',
    description: 'Conduct market analysis to identify potential risks.',
    owner: 'John Doe',
    status: 'High',
    startDate: '2024-01-01',
    endDate: '2024-06-30',
  },
  {
    name: 'Compliance Training',
    description: 'Provide training to staff on regulatory compliance.',
    owner: 'Jane Smith',
    status: 'Moderate',
    startDate: '2024-02-01',
    endDate: '2024-08-31',
  },
  // Add more treatments as needed
];


const ObjectiveRisksTable: React.FC = () => {
  const [objectiveRisks] = useState<ObjectiveRisk[]>(initialObjectiveRisks);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500';
      case 'Moderate':
        return 'bg-orange-500';
      case 'Low':
        return 'bg-green-500';
      default:
        return '';
    }
  };

  const [objectiveRiskTreatments] = useState<ObjectiveRiskTreatment[]>(initialObjectiveRiskTreatments);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'High':
        return 'bg-red-500';
      case 'Moderate':
        return 'bg-orange-500';
      case 'Low':
        return 'bg-green-500';
      default:
        return '';
    }
  };

  return (
    <>
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Objective Risks</h2>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left">Risk ID</th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left">Risk</th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left">Risk Description</th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left">Risk Value</th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left">Priority</th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left">Risk Owner</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {objectiveRisks.map((risk, index) => (
              <tr key={index} className="border-b hover:bg-gray-100 transition duration-200">
                <td className="px-6 py-4 border-r">{risk.riskId}</td>
                <td className="px-6 py-4 border-r">{risk.risk}</td>
                <td className="px-6 py-4 border-r">{risk.riskDescription}</td>
                <td className="px-6 py-4 border-r">{risk.riskValue}</td>
                <td className="px-6 py-4 border-r">
                  <div
                    className={`w-4 h-4 rounded-full ${getPriorityColor(risk.priority)}`}
                    title={risk.priority}
                  ></div>
                </td>
                <td className="px-6 py-4">{risk.riskOwner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Objective Risks Treatments</h2>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left">Name</th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left">Description</th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left">Owner</th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left">Status</th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left">Start Date</th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left">End Date</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {objectiveRiskTreatments.map((treatment, index) => (
              <tr key={index} className="border-b hover:bg-gray-100 transition duration-200">
                <td className="px-6 py-4 border-r">{treatment.name}</td>
                <td className="px-6 py-4 border-r">{treatment.description}</td>
                <td className="px-6 py-4 border-r">{treatment.owner}</td>
                <td className="px-6 py-4 border-r">
                  <div
                    className={`w-4 h-4 rounded-full ${getStatusColor(treatment.status)}`}
                    title={treatment.status}
                  ></div>
                </td>
                <td className="px-6 py-4 border-r">{treatment.startDate}</td>
                <td className="px-6 py-4">{treatment.endDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default ObjectiveRisksTable;
