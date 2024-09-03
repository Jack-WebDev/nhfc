"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "./TableData";
import { useState } from "react";
import { InternalAudit } from "./InternalAudit";
import { CardComponent } from "./Cards";
import CommentsSection from "./CommentsSection";
import ExistingControls from "./controls";
import TreatmentTable from "./treatments";
import ObjectiveRisksTable from "./objectivesTables";

type RegisterRiskSChema = {
  id: string;
  priority: string;
  riskType: string;
  description: string;
  riskOwner: string;
};

interface KPI {
  name: string;
  description: string;
  actual: number;
  target: number;
  status: "High" | "Moderate" | "Low";
}

const initialKPIs: KPI[] = [
  {
    name: "Revenue Growth",
    description: "Measure the percentage increase in revenue.",
    actual: 15,
    target: 20,
    status: "Moderate",
  },
  {
    name: "Customer Satisfaction",
    description: "Percentage of customers satisfied with the service.",
    actual: 85,
    target: 90,
    status: "Low",
  },
  // Add more KPIs as needed
];

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
    name: "Risk Assessment",
    description: "Assessing risks associated with financial transactions.",
    owner: "John Doe",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    progress: 50,
    status: "High",
  },
  {
    name: "Compliance Review",
    description: "Ensuring compliance with regulatory requirements.",
    owner: "Jane Smith",
    startDate: "2024-03-01",
    endDate: "2024-09-30",
    progress: 75,
    status: "Low",
  },
  // Add more treatments as needed
];

export function TabObjectives() {
  const [inputValue, setInputValue] = useState<string>("Test");
  const [inputValue2, setInputValue2] = useState<string>("Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, id.");
  const [treatments, setTreatments] = useState<Treatment[]>(initialTreatments);
  const [kpis] = useState<KPI[]>(initialKPIs);

  const handleInputsChange = <K extends keyof Treatment>(
    index: number,
    field: K,
    value: Treatment[K]
  ) => {
    const newTreatments = [...treatments];
    newTreatments[index][field] = value;
    setTreatments(newTreatments);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "High":
        return "bg-red-500";
      case "Moderate":
        return "bg-orange-500";
      case "Low":
        return "bg-green-500";
      default:
        return "";
    }
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setInputValue2(value);
  };
  return (
    <Tabs defaultValue="deliverables" className="w-[90%] mx-auto">
      <TabsList className="flex items-center justify-start py-4 border-b border-blue-300">
        <TabsTrigger value="deliverables">Risk Assessment</TabsTrigger>
        <TabsTrigger value="implement">Performance</TabsTrigger>
      </TabsList>
      <TabsContent value="deliverables">
        <Card>
          <CardHeader>
            <CardTitle>Risk Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <ObjectiveRisksTable />
            </div>
            <div>
              <CommentsSection />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="implement">
        <Card>
          <CardHeader>
            <CardTitle>Existing Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex">
              <div className="grid">
                <CardComponent
                  title="Objective Card"
                  label="Name"
                  label2="Description"
                  inputValue={inputValue}
                  inputValue2={inputValue2}
                  onInputChange={handleInputChange}
                />

                <CommentsSection />
              </div>
              <div>
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-gray-800">Strategic Initiatives</h2>
                  <div>
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
                              Owner
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-200 text-left">
                              Start Date
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-200 text-left">
                              End Date
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-200 text-left">
                              Progress
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-200 text-left">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-700 text-sm">
                          {treatments.map((treatment, index) => (
                            <tr
                              key={index}
                              className="border-b hover:bg-gray-100 transition duration-200"
                            >
                              <td className="px-6 py-4 border-r">
                                <input
                                  type="text"
                                  className="w-full bg-transparent outline-none"
                                  value={treatment.name}
                                  onChange={(e) =>
                                    handleInputsChange(
                                      index,
                                      "name",
                                      e.target.value
                                    )
                                  }
                                />
                              </td>
                              <td className="px-6 py-4 border-r">
                                <input
                                  type="text"
                                  className="w-full bg-transparent outline-none"
                                  value={treatment.description}
                                  onChange={(e) =>
                                    handleInputsChange(
                                      index,
                                      "description",
                                      e.target.value
                                    )
                                  }
                                />
                              </td>
                              <td className="px-6 py-4 border-r">
                                <input
                                  type="text"
                                  className="w-full bg-transparent outline-none"
                                  value={treatment.owner}
                                  onChange={(e) =>
                                    handleInputsChange(
                                      index,
                                      "owner",
                                      e.target.value
                                    )
                                  }
                                />
                              </td>
                              <td className="px-6 py-4 border-r">
                                <input
                                  type="date"
                                  className="w-full bg-transparent outline-none"
                                  value={treatment.startDate}
                                  onChange={(e) =>
                                    handleInputsChange(
                                      index,
                                      "startDate",
                                      e.target.value
                                    )
                                  }
                                />
                              </td>
                              <td className="px-6 py-4 border-r">
                                <input
                                  type="date"
                                  className="w-full bg-transparent outline-none"
                                  value={treatment.endDate}
                                  onChange={(e) =>
                                    handleInputsChange(
                                      index,
                                      "endDate",
                                      e.target.value
                                    )
                                  }
                                />
                              </td>
                              <td className="px-6 py-4 border-r">
                                <input
                                  type="number"
                                  className="w-full bg-transparent outline-none"
                                  value={treatment.progress}
                                  onChange={(e) =>
                                    handleInputsChange(
                                      index,
                                      "progress",
                                      parseInt(e.target.value)
                                    )
                                  }
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
                              <td className="px-6 py-4 border-r">
                                <div
                                  className={`w-4 h-4 rounded-full ${getStatusColor(
                                    treatment.status
                                  )}`}
                                  title={treatment.status}
                                ></div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">
                      KPIs
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
                              Actual
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-200 text-left">
                              Target
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-200 text-left">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-700 text-sm">
                          {kpis.map((kpi, index) => (
                            <tr
                              key={index}
                              className="border-b hover:bg-gray-100 transition duration-200"
                            >
                              <td className="px-6 py-4 border-r">{kpi.name}</td>
                              <td className="px-6 py-4 border-r">
                                {kpi.description}
                              </td>
                              <td className="px-6 py-4 border-r">
                                {kpi.actual}%
                              </td>
                              <td className="px-6 py-4 border-r">
                                {kpi.target}%
                              </td>
                              <td className="px-6 py-4 border-r">
                                <div
                                  className={`w-4 h-4 rounded-full ${getStatusColor(
                                    kpi.status
                                  )}`}
                                  title={kpi.status}
                                ></div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
