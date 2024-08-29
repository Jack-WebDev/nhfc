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

type RegisterRiskSChema = {
  id: string;
  priority: string;
  riskType: string;
  description: string;
  riskOwner: string;
};

export function TabComponent(data: any) {
  const [inputValue, setInputValue] = useState<string>("3");
  const [inputValue2, setInputValue2] = useState<string>("5");

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setInputValue2(value);
  };
  return (
    <Tabs defaultValue="deliverables" className="w-[80%] mx-auto">
      <TabsList className="flex items-center justify-between py-4 border-b border-blue-300">
        <TabsTrigger value="deliverables">
          Risk Analysis & Evaluation
        </TabsTrigger>
        <TabsTrigger value="implement">Existing Controls</TabsTrigger>
        <TabsTrigger value="risk">Treatment Activities</TabsTrigger>

        <TabsTrigger value="finance">Internal Audit</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="deliverables">
        <Card>
          <CardHeader>
            <CardTitle>Risk Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-center gap-x-4">
              <div className="grid grid-cols-2 w-[80%] border border-gray-200 p-4 rounded-lg">
                <div>
                  <span>Priority:</span>
                  <span className="bg-green-500 text-white py-1 px-2 rounded-xl">
                    Low
                  </span>
                </div>
                <div>
                  <span>Risk ID:</span>
                  <span>RK-HJ53</span>
                </div>
                <div>
                  <span>Risk Type:</span>
                  <span>First Home Finance</span>
                </div>
                <div>
                  <span>Risk Description:</span>
                  <span>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Odio alias dolor, sapiente earum rerum qui dolorem, voluptas
                    doloribus, animi architecto illum repellat excepturi?
                    Molestiae velit placeat, laudantium omnis rem voluptate.
                  </span>
                </div>
                <div>
                  <span>Risk Owner:</span>
                  <span>John Barnett</span>
                </div>
                <div>
                  <span>Date Identified:</span>
                  <span>2023-06-12</span>
                </div>
                <div>
                  <span>Strategic Objective:</span>
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Quibusdam, ex!
                  </span>
                </div>
                <div>
                  <span>Threat / Opportunity:</span>
                  <span>Threat</span>
                </div>
                <div>
                  <span>Inherent Risk Type:</span>
                  <span>12</span>
                </div>
              </div>
              <div className="grid gap-y-4">
                <div className="flex justify-between items-stretch">
                  <CardComponent
                    title="Risk Rating"
                    label="Likelihood"
                    label2="Impact"
                    inputValue={inputValue}
                    inputValue2={inputValue2}
                    onInputChange={handleInputChange}
                  />
                  <CardComponent
                    title="Risk Exposure"
                    label="Risk Impact"
                    label2="Risk Exposure"
                    inputValue={inputValue}
                    inputValue2={inputValue2}
                    onInputChange={handleInputChange}
                  />
                </div>
                <DataTable title="Consequences" />
                <DataTable title="Risk Causes" />
              </div>

            </div>
              <div>
                <h2 className="text-5xl text-center my-8">ADD A COMMENTS SECTION</h2>
              </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="implement">
        <Card>
          <CardHeader>
            <CardTitle>Implement Partners</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <ul className="list-disc ">
              <li>
                National Housing Finance Corporation (NHFC) - Project Owner
              </li>
              <li>Calgro M3 - Developer</li>
              <li>City of Johannesburg - Municipal Partner</li>
              <li>
                Gauteng Department of Human Settlements - Provincial Partner
              </li>
              <li>
                Department of Water and Sanitation - Infrastructure Support
              </li>
              <li>Eskom - Electricity Provider</li>
              <li>Johannesburg Water - Water and Sanitation</li>
              <li>Johannesburg Roads Agency - Road Infrastructure</li>
              <li>Local Community Organizations - Community Engagement</li>
            </ul>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="risk">
        <Card>
          <CardHeader>
            <CardTitle>Risk and Assumption</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <ul className="list-disc list-inside">
              <h2>Risks</h2>
              <li>Delays in construction due to unforeseen circumstances</li>
              <li>Budget overruns</li>
              <li>Community resistance or conflicts</li>
              <li>Changes in government policies or regulations</li>
              <li>Environmental challenges</li>
              <h2>Assumptions</h2>
              <li>Continued government support and funding</li>
              <li>Stable economic conditions</li>
              <li>Availability of skilled labor</li>
              <li>Timely delivery of materials and resources</li>
              <li>Positive community engagement and acceptance</li>
            </ul>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="finance">
        <Card>
          <CardHeader>
            <CardTitle>Internal Audit</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <InternalAudit heading="Control Evalutions" title1="Name" title2="Control Type" title3="Design" />
              <InternalAudit heading="Treatment Evaluations" title1="Name" title2="Design and Implementation" title3="Level of Risk" />
              <InternalAudit heading="Findings on Controls" title1="Name" title2="Findings" title3="Recommendations" />
              <InternalAudit heading="Findings on Treatments" title1="Name" title2="Findings" title3="Recommendations" />
              <InternalAudit heading="Action Plan and Monitoring for Controls" title1="Status" title2="Name" title3="Progress (%)" />
              <InternalAudit heading="Action Plan and Monitoring for Treatments" title1="Status" title2="Name" title3="Progress (%)" />
            </div>
            <div>
              <h2 className="text-5xl text-center my-8">ADD A COMMENTS SECTION</h2>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="reports">
        <Card>
          <CardHeader>
            <CardTitle>Reports</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-8">
              <input type="file" />
              <input type="file" />
              <input type="file" />
              <input type="file" />
              <input type="file" />
              <input type="file" />

            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
