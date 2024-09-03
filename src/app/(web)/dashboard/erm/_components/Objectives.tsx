"use client";
import { Eye, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Objective {
  name: string;
  description: string;
  status: string;
}

const initialObjectives: Objective[] = [
  {
    name: "Increase Revenue",
    description:
      "Develop strategies to increase revenue by 20% this fiscal year.",
    status: "In Progress",
  },
  {
    name: "Customer Satisfaction",
    description:
      "Improve customer satisfaction by reducing response time to queries.",
    status: "Not Started",
  },
  // Add more objectives as needed
];

const statuses = ["Not Started", "In Progress", "Completed"];

export const ObjectivesCard = ({ header }: { header: string }) => {
  const [objectives, setObjectives] = useState<Objective[]>(initialObjectives);
  const router = useRouter();

  const handleInputChange = <K extends keyof Objective>(
    index: number,
    field: K,
    value: Objective[K]
  ) => {
    const newObjectives = [...objectives];
    newObjectives[index][field] = value;
    setObjectives(newObjectives);
  };

  const handleDelete = (index: number) => {
    const newObjectives = objectives.filter((_, i) => i !== index);
    setObjectives(newObjectives);
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        {header} Objectives
      </h2>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left">
                Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left">
                Description
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left">
                Status
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {objectives.map((objective, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-100 transition duration-200"
              >
                <td className="px-6 py-4 border-r">
                  <input
                    type="text"
                    className="w-full bg-transparent outline-none"
                    value={objective.name}
                    onChange={(e) =>
                      handleInputChange(index, "name", e.target.value)
                    }
                  />
                </td>
                <td className="px-6 py-4 border-r">
                  <input
                    type="text"
                    className="w-full bg-transparent outline-none"
                    value={objective.description}
                    onChange={(e) =>
                      handleInputChange(index, "description", e.target.value)
                    }
                  />
                </td>
                <td className="px-6 py-4 border-r">
                  <select
                    className="w-full bg-transparent outline-none"
                    value={objective.status}
                    onChange={(e) =>
                      handleInputChange(index, "status", e.target.value)
                    }
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="flex items-center gap-x-4 px-6 py-4">
                  <Eye className="cursor-pointer text-blue-500" onClick={() => router.push(`/dashboard/erm/objectives/${index}`)} />
                  <Trash2 onClick={() => handleDelete(index)} className="text-red-600 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
