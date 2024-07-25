"use client"; // Ensure this is at the very top of the file

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
import { MapPin, DollarSign, Home } from "lucide-react";
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
  projectValue: number;
  projectType: string;
};

export default function Projects() {
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");
  const [selectedProjectType, setSelectedProjectType] = useState<string>("");
  const router = useRouter();

  const projectsPerPage = 4;
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await axios.get("/api/projects");
      setProjects(res.data);
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(
    (project) =>
      project.projectName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedProvince === "" || project.province === selectedProvince) &&
      (selectedMunicipality === "" ||
        project.municipality === selectedMunicipality) &&
      (selectedWard === "" || project.ward === selectedWard) &&
      (selectedProjectType === "" ||
        project.projectType === selectedProjectType)
  );

  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (typeof window === "undefined") {
    return null; // Return null if the window object is not available (i.e., during SSR)
  }

  return (
    <>
      <PageHeader Icon={Home} title="Projects" />
      <div className="grid px-4 py-6 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="mb-4 md:mb-0 md:mr-4">
            <label
              htmlFor="search"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Search:
            </label>
            <input
              type="text"
              placeholder="Search projects"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border p-2 rounded-md w-full md:w-64"
            />
          </div>

          <div className="mb-4 md:mb-0">
            <label
              htmlFor="province"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Province:
            </label>
            <select
              name="province"
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="border p-2 rounded-md w-full md:w-64"
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

          <div className="mb-4 md:mb-0">
            <label
              htmlFor="municipality"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Municipality:
            </label>
            <select
              name="municipality"
              value={selectedMunicipality}
              onChange={(e) => setSelectedMunicipality(e.target.value)}
              className="border p-2 rounded-md w-full md:w-64"
            >
              <option value="">All Municipalities</option>
              <option value="City of Johannesburg">City of Johannesburg</option>
              <option value="City of Cape Town">City of Cape Town</option>
              <option value="eThekwini">eThekwini</option>
              <option value="City of Tshwane">City of Tshwane</option>
              <option value="Nelson Mandela Bay">Nelson Mandela Bay</option>
            </select>
          </div>

          <div className="mb-4 md:mb-0">
            <label
              htmlFor="ward"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Ward:
            </label>
            <select
              name="ward"
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              className="border p-2 rounded-md w-full md:w-64"
            >
              <option value="">All Wards</option>
              <option value="Ward 1">Ward 1</option>
              <option value="Ward 2">Ward 2</option>
              <option value="Ward 3">Ward 3</option>
              <option value="Ward 4">Ward 4</option>
              <option value="Ward 5">Ward 5</option>
            </select>
          </div>

          <div className="mb-4 md:mb-0">
            <label
              htmlFor="projectType"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Project Type:
            </label>
            <select
              name="projectType"
              value={selectedProjectType}
              onChange={(e) => setSelectedProjectType(e.target.value)}
              className="border p-2 rounded-md w-full md:w-64"
            >
              <option value="">All Project Types</option>
              <option value="Social Housing">Social Housing</option>
              <option value="Affordable Housing">Affordable Housing</option>
              <option value="Rental Housing">Rental Housing</option>
              <option value="Gap Housing">Gap Housing</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {currentProjects.map((project) => (
            <Card
              className="w-[350px] p-6 bg-white shadow-lg rounded-lg flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 hover:transform hover:scale-105 border border-gray-200"
              key={project.id}
            >
              <div>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    {project.projectName}
                  </CardTitle>
                  <CardDescription className="text-gray-500">
                    {project.deliverablesSummary}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-4">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                      <span className="text-sm text-gray-600">
                        Location: {project.address}, {project.province}
                      </span>
                    </li>
                    <li className="flex items-center">
                      <Home className="w-5 h-5 mr-2 text-green-500" />
                      <span className="text-sm text-gray-600">
                        Units: 10,000+
                      </span>
                    </li>
                    <li className="flex items-center">
                      <DollarSign className="w-5 h-5 mr-2 text-yellow-500" />
                      <span className="text-sm text-gray-600">
                        Project Value: R
                        {project.projectValue?.toLocaleString() ?? "N/A"}
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </div>
              <CardFooter className="mt-4">
                <Button
                  variant="default"
                  className="w-full bg-blue-500 text-white hover:bg-blue-700"
                  onClick={() =>
                    router.push(`/frontend/projects/${project.id}`)
                  } // Use router.push for navigation
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Pagination
          projectsPerPage={projectsPerPage}
          totalProjects={filteredProjects.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </>
  );
}

const Pagination = ({
  projectsPerPage,
  totalProjects,
  paginate,
  currentPage,
}: {
  projectsPerPage: number;
  totalProjects: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProjects / projectsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-4">
      <ul className="flex justify-center space-x-2">
        {currentPage > 1 && (
          <li>
            <button
              onClick={() => paginate(currentPage - 1)}
              className="px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-700"
            >
              Previous
            </button>
          </li>
        )}
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-3 py-1 rounded-md ${
                currentPage === number
                  ? "bg-blue-700 text-white"
                  : "bg-blue-500 text-white hover:bg-blue-700"
              }`}
            >
              {number}
            </button>
          </li>
        ))}
        {currentPage < pageNumbers.length && (
          <li>
            <button
              onClick={() => paginate(currentPage + 1)}
              className="px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-700"
            >
              Next
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};
