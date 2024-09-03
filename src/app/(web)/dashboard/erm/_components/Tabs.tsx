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
            <div className="grid">

            <div className="grid gap-y-8">
            <ExistingControls />
            <div className="flex justify-start items-stretch gap-x-8">
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
            </div>
            <CommentsSection />
            </div>

          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="risk">
        <Card>
          <CardHeader>
            <CardTitle>Treatment Activities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <TreatmentTable />
            <div>
              <CommentsSection />
            </div>
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
              <InternalAudit
                heading="Control Evalutions"
                title1="Name"
                title2="Control Type"
                title3="Design"
              />
              <InternalAudit
                heading="Treatment Evaluations"
                title1="Name"
                title2="Design and Implementation"
                title3="Level of Risk"
              />
              <InternalAudit
                heading="Findings on Controls"
                title1="Name"
                title2="Findings"
                title3="Recommendations"
              />
              <InternalAudit
                heading="Findings on Treatments"
                title1="Name"
                title2="Findings"
                title3="Recommendations"
              />
              <InternalAudit
                heading="Action Plan and Monitoring for Controls"
                title1="Status"
                title2="Name"
                title3="Progress (%)"
              />
              <InternalAudit
                heading="Action Plan and Monitoring for Treatments"
                title1="Status"
                title2="Name"
                title3="Progress (%)"
              />
            </div>
            <div>
              <CommentsSection />
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-4">
              <label className="block">
                <span className="sr-only">Choose file</span>
                <input
                  type="file"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </label>
              <label className="block">
                <span className="sr-only">Choose file</span>
                <input
                  type="file"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </label>
              <label className="block">
                <span className="sr-only">Choose file</span>
                <input
                  type="file"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </label>
              <label className="block">
                <span className="sr-only">Choose file</span>
                <input
                  type="file"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </label>
              <label className="block">
                <span className="sr-only">Choose file</span>
                <input
                  type="file"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </label>
              <label className="block">
                <span className="sr-only">Choose file</span>
                <input
                  type="file"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </label>
            </div>
            <div>
              <CommentsSection />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
