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

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await axios.get("/api/projects");
      setProjects(res.data);
    };

    fetchProjects();
  }, []);

  return (
    <>
    <PageHeader Icon={ShoppingBag} title="Projects" />
    <div className="grid grid-cols-3">

      {projects.map((project) => (
        <Card className="w-[350px] mt-12" key={project.id}>
          <CardHeader>
            <CardTitle>{project.projectName}</CardTitle>
            <CardDescription>
              {project.deliverablesSummary}
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
            <Button variant="default" className="bg-blue-500 text-white hover:bg-blue-700" onClick={() => router.push(`/frontend/projects/${project.id}`)}>
              View Details
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
    </>
  );
}
