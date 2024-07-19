"use client";

import { Button, Input, Label, PageHeader } from "@/components";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

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

export default function Projects() {
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProvince, setSelectedProvince] = useState<string>("");


  const filteredProjects = projects.filter((project) =>
    project.projectName.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedProvince === "" || project.province === selectedProvince)
  );

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await axios.get("/api/projects");
      setProjects(res.data);
      console.log(res.data)
    };

    fetchProjects();
  }, []);

  return (
    <>
      <PageHeader Icon={ShoppingBag} title="Projects" />
      <div className="grid">

        <div className="flex justify-evenly items-center">
          <div>
            <label htmlFor="search">Search:</label>
            <input
              type="text"
              placeholder="Search projects"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border p-2 mb-4"
            />
          </div>

          <div>
        <label htmlFor="province">Province:</label>
        <select
          name="province"
          value={selectedProvince}
          onChange={(e) => setSelectedProvince(e.target.value)}
          className="border border-gray-200 rounded-lg p-2 bg-white"
        >
          <option value="">Select Province</option>
          <option value="Gauteng">Gauteng</option>
          <option value="Western Cape">Western Cape</option>
          <option value="KwaZulu-Natal">KwaZulu-Natal</option>
          <option value="Eastern Cape">Eastern Cape</option>
          <option value="Free State">Free State</option>
          <option value="Limpopo">Limpopo</option>
          <option value="Mpumalanga">Mpumalanga</option>
          <option value="North West">North West</option>
          <option value="Northern Cape">Northern Cape</option>
        </select>
      </div>
          <div>
            <label htmlFor="projectName">Project Name:</label>
            <select
              name="projectName"
              // value={formData.projectName || ""}
              // onChange={handleChange}
              className="border border-gray-200 rounded-lg p-2 bg-white"
            >
              <option value="" disabled>
                Select Project
              </option>
              <option value="Fleurhof Integrated Housing Development">
                Fleurhof Integrated Housing Development
              </option>
              <option value="Belhar Social Housing Project">
                Belhar Social Housing Project
              </option>
              <option value="Westgate Social Housing Project">
                Westgate Social Housing Project
              </option>
              <option value="Devland Gardens">Devland Gardens</option>
              <option value="Southernwood Square">Southernwood Square</option>
              <option value="Thembelihle Village">Thembelihle Village</option>
            </select>
          </div>
        </div>
      <div className="flex flex-wrap justify-center gap-8">

        {filteredProjects.map((project) => (
          <Card className="w-[350px] mt-12" key={project.id}>
            <CardHeader>
              <CardTitle>{project.projectName}</CardTitle>
              <CardDescription>{project.deliverablesSummary}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul>
                <li>Location: Johannesburg, {project.province}</li>
                <li>Units: 10,000+</li>

                <div>
                  <h2>Project Values: R3.5 Billion</h2>
                </div>
              </ul>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="default"
                className="bg-blue-500 text-white hover:bg-blue-700"
                onClick={() => router.push(`/frontend/projects/${project.id}`)}
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      </div>
    </>
  );
}
