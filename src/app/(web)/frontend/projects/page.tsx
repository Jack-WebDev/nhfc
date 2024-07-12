"use client";

import { Button, Input, Label } from "@/components";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
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

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await axios.get("/api/projects");
      setProjects(res.data);
    };

    fetchProjects();
  }, []);

  return (
    <>
      {projects.map((project) => (
        <Card className="w-[350px]" key={project.id}>
          <CardHeader>
            <CardTitle>{project.projectName}</CardTitle>
            <CardDescription>
              A mixed-use development providing over 10,000 housing units in
              Johannesburg.
            </CardDescription>
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
            <Button variant="default" className="bg-blue-500 text-white " onClick={() => router.push(`/frontend/projects/${project.id}`)}>
              View Details
            </Button>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
