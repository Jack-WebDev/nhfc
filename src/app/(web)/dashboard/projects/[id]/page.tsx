"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ProgressBar } from "./_components/ProgressBar";
import { TabsComponent } from "./_components/Tabs";
import { ArrowLeft, TrendingUp } from "lucide-react";
import Image from "next/image";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge, Button, Label } from "@/components";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ProjectProps = {
  id: string;
  projectName: string;
  projectCode: string;
  programme: string;
  projectStatus: string;
  province: string;
  municipality: string;
  ward: string;
  address: string;
  gpscoordinates: string;
  projectOwner: string;
  hasOwner: boolean;
  developer: string;
  projectLiason: string;
  materialSupplier: string;
  contractor: string;
  deliverablesSummary: string;
  skilledWorkers: string;
  unskilledWorkers: string;
  schools: string;
  clinics: string;
  communityHalls: string;
  sportsField: string;
  implementationPartners: string;
};

const chartData = [
  { month: "Q1 2023", expenditure: 186, revenue: 80 },
  { month: "Q2 2023", expenditure: 305, revenue: 200 },
  { month: "Q3 2023", expenditure: 237, revenue: 120 },
  { month: "Q4 2023", expenditure: 73, revenue: 190 },
];

const chartConfig = {
  expenditure: {
    label: "expenditure",
    color: "#2563eb",
  },
  revenue: {
    label: "revenue",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export default function ViewProject() {
  const params = useParams();
  const projectID = params.id;
  const [projectData, setProjectData] = useState<ProjectProps[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProjectData = async () => {
      const res = await axios.get(`/api/projects/${projectID}`);
      const usersData = await res.data;
      setProjectData(usersData);
    };

    fetchProjectData();
  }, [projectID]);

  const milestones = [
    {
      milestone: "Project Initiation",
      plannedDate: "2020-03-15	",
      actualDate: "2020-03-15	",
      status: "Completed",
    },
    {
      milestone: "Land Acquisition",
      plannedDate: "	2020-06-30",
      actualDate: "2020-07-15",
      status: "Completed",
    },
    {
      milestone: "Environmental Impact Assessment",
      plannedDate: "	2020-09-30",
      actualDate: "2020-10-20",
      status: "Completed",
    },
    {
      milestone: "Infrastructure Development",
      plannedDate: "	2021-06-30",
      actualDate: "2021-08-15",
      status: "Completed",
    },
    {
      milestone: "Phase 1 Housing Construction",
      plannedDate: "2022-12-31",
      actualDate: "	2023-02-28",
      status: "Completed",
    },
    {
      milestone: "Phase 2 Housing Construction",
      plannedDate: "	2024-06-30",
      actualDate: "-",
      status: "In Progress",
    },
    {
      milestone: "Community Facilities Construction",
      plannedDate: "2025-06-30",
      actualDate: "-	",
      status: "Planned",
    },

    {
      milestone: "Project Completion",
      plannedDate: "2025-12-31",
      actualDate: "-	",
      status: "Planned",
    },
  ];
  const timelines = [
    {
      milestone: "Project Initiation",
      plannedDate: "2020-03-15	",
      actualDate: "2020-03-15	",
      status: "Completed",
    },
    {
      milestone: "Land Acquisition",
      plannedDate: "	2020-06-30",
      actualDate: "2020-07-15",
      status: "Completed",
    },
    {
      milestone: "Environmental Impact Assessment",
      plannedDate: "	2020-09-30",
      actualDate: "2020-10-20",
      status: "Completed",
    },
    {
      milestone: "Interior Work",
      plannedDate: "	2021-06-30",
      actualDate: "2021-08-15",
      status: "In Progress",
    },
    {
      milestone: "Infrastructure Development",
      plannedDate: "2022-12-31",
      actualDate: "	2023-02-28",
      status: "Upcoming",
    },
    {
      milestone: "Project Completion",
      plannedDate: "	2024-06-30",
      actualDate: "-",
      status: "Upcoming",
    },
  ];
  const stakeholders = [
    {
      milestone: "Project Manager",
      plannedDate: "Sarah Nkosi",
      actualDate: "	NHFC",
      status: "sarah.nkosi@nhfc.co.za",
    },
    {
      milestone: "Lead Contractor",
      plannedDate: "Jama Phfo",
      actualDate: "Sustainable Homes Pty Ltd",
      status: "jama.phafo@sustainablehomes.co.za",
    },
    {
      milestone: "Local Government Liaison",
      plannedDate: "Lerato Mbatha",
      actualDate: "Soweto Municipal Office",
      status: "lerato.mbatha@soweto.co.za",
    },
    {
      role: "Community Representative",
      name: "Errol Ngwenya",
      organization: "Soweto Community Association",
      contact: "errolN@gmail.com",
    },
  ];
  const investors = [
    {
      milestone: "African Development Bank",
      plannedDate: "Loaner",
      actualDate: "Long-term Loan",
      status: "R20,000,000",
      rate: "5.5%",
    },
    {
      milestone: "Community Housing Bond",
      plannedDate: "Loaner",
      actualDate: "Interest-Free Loan",
      status: "R20,000,000",
      rate: "5.5%",
    },
    {
      milestone: "Green Energy Investors",
      plannedDate: "Investor",
      actualDate: "	Equity Investment",
      status: "R10,000,000",
      rate: "5.5%",
    },
    {
      milestone: "Soweto Development Trust",
      plannedDate: "Investor",
      actualDate: "Grant",
      status: "R10,000,000",
      rate: "5.5%",
    },
  ];
  const payments = [
    {
      milestone: "PC001",
      plannedDate: "R5,000,000",
      actualDate: "	2023-02-15",
      status: "	Project Initiation",
      rate: "Emily Brown",
      paymentStatus: "Processed",
    },
    {
      milestone: "PC002",
      plannedDate: "R5,000,000",
      actualDate: "	2023-02-15",
      status: "	Project Initiation",
      rate: "Emily Brown",
      paymentStatus: "Processed",
    },
    {
      milestone: "PC003",
      plannedDate: "R5,000,000",
      actualDate: "	2023-02-15",
      status: "	Project Initiation",
      rate: "Emily Brown",
      paymentStatus: "Processed",
    },
    {
      milestone: "PC004",
      plannedDate: "R5,000,000",
      actualDate: "	2023-02-15",
      status: "	Project Initiation",
      rate: "Emily Brown",
      paymentStatus: "Processed",
    },
  ];
  const revenue = [
    {
      milestone: "Government Subsidy",
      plannedDate: "R500,000",
      actualDate: "Foundation Work",
      status: "2023-04-20",
    },
    {
      milestone: "Government Subsidy",
      plannedDate: "R500,000",
      actualDate: "Foundation Work",
      status: "2023-04-20",
    },
    {
      milestone: "Government Subsidy",
      plannedDate: "R500,000",
      actualDate: "Foundation Work",
      status: "2023-04-20",
    },
  ];
  return (
    <>
      <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
      {projectData.map((project) => {
        return project.hasOwner === true ? (
          <div
            key={project.id}
            className="bg-white rounded-xl p-4 border w-[80%] mx-auto"
          >
            <h2>Comprehensive Project Details</h2>
            <h3>Project Information</h3>
            <div className="grid">
              <div className="flex justify-evenly items-center">
                <div className="grid">
                  <Label>Project ID</Label>
                  <span>{project.id}</span>
                </div>
                <div className="grid">
                  <Label>Project Name</Label>
                  <span>{project.projectName}</span>
                </div>
              </div>
              <div className="flex justify-evenly items-center">
                <div className="grid">
                  <Label>Project Type</Label>
                  <span>Tender Project</span>
                </div>
                <div className="grid">
                  <Label>Project Status</Label>
                  <Badge className="bg-green-700 text-white">In Progress</Badge>
                </div>
              </div>
              <div>
                <Label>Project Description</Label>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Itaque, magni earum repellendus modi vero adipisci, optio
                  voluptate suscipit vel, nobis unde nemo ratione iste nisi aut
                  quod numquam accusamus delectus cupiditate a eaque tempora
                  quae. Incidunt, sit voluptates sapiente, repudiandae iusto
                  laborum provident ab nemo ad maiores nisi? Repudiandae, minus.
                </p>
              </div>
              <div>
                <Label>Estimated Budget</Label>
                <span>R500,000.00</span>
              </div>
              <div className="flex justify-evenly items-center">
                <div className="grid">
                  <Label>Revenue Generated</Label>
                  <span>R500,000.00</span>
                </div>
                <div className="grid">
                  <Label>Project Start Date</Label>
                  <span>2023-07-27</span>
                </div>
              </div>
              <div className="flex justify-evenly items-center">
                <div className="grid">
                  <Label>Project End Date</Label>
                  <span>2023-07-27</span>
                </div>
                <div className="grid">
                  <Label>Application Date</Label>
                  <span>2023-07-27</span>
                </div>
              </div>
            </div>

            <h3>Objectives</h3>

            <ul className="list-disc list-inside">
              <li>Develop a mixed-income community</li>
              <li>Create a sustainable, affordable housing solution</li>
              <li>Provide employment opportunities during construction</li>
              <li>
                Ensure the project is completed within budget and timeline
              </li>
            </ul>

            <div className="shadow-xl my-8 p-4 rounded-xl">
              <h2 className="text-3xl font-semibold text-blue-500">
                Timelines
              </h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Milestone</TableHead>
                    <TableHead>Planned Date</TableHead>
                    <TableHead>Actual Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {timelines.map((timeline) => (
                    <TableRow key={timeline.milestone}>
                      <TableCell className="font-medium">
                        {timeline.milestone}
                      </TableCell>
                      <TableCell>{timeline.plannedDate}</TableCell>
                      <TableCell>{timeline.actualDate}</TableCell>
                      <TableCell>{timeline.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Button>Update Timeline</Button>
            </div>

            <div className="shadow-xl my-8 p-4 rounded-xl">
              <h2 className="text-3xl font-semibold text-blue-500">
                Key Stakeholders
              </h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead>Contact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stakeholders.map((timeline) => (
                    <TableRow key={timeline.milestone}>
                      <TableCell className="font-medium">
                        {timeline.milestone}
                      </TableCell>
                      <TableCell>{timeline.plannedDate}</TableCell>
                      <TableCell>{timeline.actualDate}</TableCell>
                      <TableCell>{timeline.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="shadow-xl my-8 p-4 rounded-xl">
              <h2 className="text-3xl font-semibold text-blue-500">
                Investors/Loaners Overview
              </h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Finance Applicant</TableHead>
                    <TableHead>Applicant Type</TableHead>
                    <TableHead>Financial Solution</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Interest Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {investors.map((timeline) => (
                    <TableRow key={timeline.milestone}>
                      <TableCell className="font-medium">
                        {timeline.milestone}
                      </TableCell>
                      <TableCell>{timeline.plannedDate}</TableCell>
                      <TableCell>{timeline.actualDate}</TableCell>
                      <TableCell>{timeline.status}</TableCell>
                      <TableCell>{timeline.rate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Button>View More</Button>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Financial Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                      />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="dashed" />}
                      />
                      <Bar
                        dataKey="expenditure"
                        fill="var(--color-expenditure)"
                        radius={4}
                      />
                      <Bar
                        dataKey="revenue"
                        fill="var(--color-revenue)"
                        radius={4}
                      />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
            <div className="shadow-xl my-8 p-4 rounded-xl">
              <h2 className="text-3xl font-semibold text-blue-500">
                Payment Certificates
              </h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Certificate ID</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Milestone</TableHead>
                    <TableHead>Responsible Consultant</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((timeline) => (
                    <TableRow key={timeline.milestone}>
                      <TableCell className="font-medium">
                        {timeline.milestone}
                      </TableCell>
                      <TableCell>{timeline.plannedDate}</TableCell>
                      <TableCell>{timeline.actualDate}</TableCell>
                      <TableCell>{timeline.status}</TableCell>
                      <TableCell>{timeline.rate}</TableCell>
                      <TableCell>{timeline.paymentStatus}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="shadow-xl my-8 p-4 rounded-xl">
              <h2 className="text-3xl font-semibold text-blue-500">
                Revenue by Financial Solution
              </h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Financial Solution</TableHead>
                    <TableHead>Total Revenue</TableHead>
                    <TableHead>Last Milestone</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {revenue.map((timeline) => (
                    <TableRow key={timeline.milestone}>
                      <TableCell className="font-medium">
                        {timeline.milestone}
                      </TableCell>
                      <TableCell>{timeline.plannedDate}</TableCell>
                      <TableCell>{timeline.actualDate}</TableCell>
                      <TableCell>{timeline.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div>
              <Button>Edit</Button>
              <Button onClick={() => router.back()}>Back To Projects</Button>
            </div>
          </div>
        ) : (
          <div
            key={project.id}
            className="bg-white rounded-xl p-4 border w-[80%] mx-auto"
          >
            <h1 className="text-3xl font-semibold text-blue-500 mb-8">
              {project.projectName}
            </h1>
            <div>
              <Image
                src={"/toek_1.jpeg"}
                alt="project"
                width={500}
                height={500}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <div className="shadow-xl my-8 p-4 rounded-xl">
              <ProgressBar />
            </div>

            <div className="shadow-xl my-8 p-4 rounded-xl">
              <h2 className="text-3xl font-semibold my-4 text-blue-500">
                Project Details
              </h2>
              <div className="cards grid grid-cols-2 gap-8 mb-12">
                <p className="bg-gray-100 text-gray-600 py-2 px-4 rounded-xl">
                  Project Code:{" "}
                  <span className="text-black">{project.projectCode}</span>
                </p>
                <p className="bg-gray-100 text-gray-600 py-2 px-4 rounded-xl">
                  Municipality:{" "}
                  <span className="text-black">{project.municipality}</span>
                </p>
                <p className="bg-gray-100 text-gray-600 py-2 px-4 rounded-xl">
                  Ward: <span className="text-black">{project.ward}</span>
                </p>
                <p className="bg-gray-100 text-gray-600 py-2 px-4 rounded-xl">
                  ERF Number: <span className="text-black">ERF get5234</span>
                </p>
                <p className="bg-gray-100 text-gray-600 py-2 px-4 rounded-xl">
                  Start Date: <span className="text-black">2023-07-27</span>
                </p>
                <p className="bg-gray-100 text-gray-600 py-2 px-4 rounded-xl">
                  End Date: <span className="text-black">2023-07-27</span>
                </p>
                <p className="bg-gray-100 text-gray-600 py-2 px-4 rounded-xl">
                  Project Owner:{" "}
                  <span className="text-black">{project.projectOwner}</span>
                </p>
                <p className="bg-gray-100 text-gray-600 py-2 px-4 rounded-xl">
                  Developer:{" "}
                  <span className="text-black">{project.developer}</span>
                </p>
                <p className="bg-gray-100 text-gray-600 py-2 px-4 rounded-xl">
                  Project Liason:{" "}
                  <span className="text-black">{project.projectLiason}</span>
                </p>
                <p className="bg-gray-100 text-gray-600 py-2 px-4 rounded-xl">
                  Jobs Created: <span className="text-black">37000</span>
                </p>
                <p className="bg-gray-100 text-gray-600 py-2 px-4 rounded-xl">
                  People Trained: <span className="text-black">200</span>
                </p>
              </div>
            </div>

            <div className="shadow-xl my-8 p-4 rounded-xl">
              <h2 className="text-3xl font-semibold my-8 text-blue-500">
                Project Scope
              </h2>
              <p>
                <span className="text-lg font-medium">
                  {project.projectName}{" "}
                </span>{" "}
                project aims to create a sustainable, mixed-income community by
                developing over 10,000 housing units along with essential
                community infrastructure. The project scope includes:
                <ul className="list-disc list-inside">
                  <li>
                    Construction of 5,000 RDP houses, 3,000 social housing
                    units, and 2,000 bonded houses
                  </li>
                  <li>
                    Development of community facilities including 4 schools, 2
                    clinics, and 3 community halls
                  </li>
                  <li>
                    Creation of 5 sports fields and 20 hectares of parks and
                    green spaces
                  </li>
                  <li>
                    Construction of a shopping center to stimulate local
                    economic activity
                  </li>
                  <li>
                    Implementation of necessary infrastructure including roads,
                    water, electricity, and sanitation
                  </li>
                </ul>
              </p>
            </div>
            <div className="grid gap-y-8 shadow-xl my-8 p-4 rounded-xl">
              <h2 className="text-3xl font-semibold text-blue-500">
                Project Background
              </h2>
              <TabsComponent />
            </div>

            <div className="shadow-xl my-8 p-4 rounded-xl">
              <h2 className="text-3xl font-semibold text-blue-500">
                Job Creations
              </h2>

              <div className="flex justify-between items-center">
                <p>
                  Skilled Workers: <span>3000</span>
                </p>
                <p>
                  Unskilled Workers: <span>2000</span>
                </p>
              </div>
            </div>

            <div className="shadow-xl my-8 p-4 rounded-xl">
              <h2 className="text-3xl font-semibold text-blue-500">
                Project Milestones
              </h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Milestone</TableHead>
                    <TableHead>Planned Date</TableHead>
                    <TableHead>Actual Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {milestones.map((milestone) => (
                    <TableRow key={milestone.milestone}>
                      <TableCell className="font-medium">
                        {milestone.milestone}
                      </TableCell>
                      <TableCell>{milestone.plannedDate}</TableCell>
                      <TableCell>{milestone.actualDate}</TableCell>
                      <TableCell>{milestone.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex gap-x-4">
              <button className="bg-blue-500 text-white py-2 px-8 rounded-lg">
                Edit Project
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-8 rounded-lg"
                onClick={() => router.back()}
              >
                Back to Projects
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
