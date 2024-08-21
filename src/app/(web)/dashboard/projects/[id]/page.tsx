"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ProgressBar } from "./_components/ProgressBar";
import { TabsComponent } from "./_components/Tabs";
import { ArrowLeft } from "lucide-react";
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
  return (
    <>
      <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
      {projectData.map((project) => (
        <div
          key={project.id}
          className="bg-white rounded-xl p-4 border w-1/2 mx-auto"
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
                  Construction of 5,000 RDP houses, 3,000 social housing units,
                  and 2,000 bonded houses
                </li>
                <li>
                  Development of community facilities including 4 schools, 2
                  clinics, and 3 community halls
                </li>
                <li>
                  Creation of 5 sports fields and 20 hectares of parks and green
                  spaces
                </li>
                <li>
                  Construction of a shopping center to stimulate local economic
                  activity
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
      ))}
    </>
  );
}
