"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ProgressBar} from "./_components/ProgressBar";
import { TabsComponent } from "./_components/Tabs";

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

  useEffect(() => {
    const fetchProjectData = async () => {
      const res = await axios.get(`/api/projects/${projectID}`);
      const usersData = await res.data;
      setProjectData(usersData);
    };

    fetchProjectData();
  }, [projectID]);
  return <>
    {projectData.map((project) => (
      <div key={project.id} className="bg-white rounded-xl p-4 border w-1/2 mx-auto">
        <div>
            <p>Image</p>
        </div>
        <div>
            <h1 className="text-3xl font-semibold text-blue-500">{project.projectName}</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident accusantium deserunt, nisi ipsum id, harum voluptatibus numquam ad quo facere quos at autem voluptate dolorem ut hic repellat. Possimus debitis deleniti nemo explicabo nam suscipit atque praesentium officia dolores voluptatibus! Doloremque, quia.</p>

            <div className="cards mb-12">
                <p className="text-gray-500">Project Code <span>{project.projectCode}</span></p>
                <p className="text-gray-500"> Municipality <span>{project.municipality}</span></p>
                <p className="text-gray-500">Ward <span>{project.ward}</span></p>
                <p className="text-gray-500">ERF Number <span>ERF get5234</span></p>
                <p className="text-gray-500">Start Date <span>2023-07-27</span></p>
                <p className="text-gray-500">End Date <span>2023-07-27</span></p>
                <p className="text-gray-500">Project Owner <span>{project.projectOwner}</span></p>
                <p className="text-gray-500">Developer <span>{project.developer}</span></p>
                <p className="text-gray-500">Project Liason <span>{project.projectLiason}</span></p>
                <p className="text-gray-500">Jobs Created <span>37000</span></p>
                <p className="text-gray-500">People Trained <span>200</span></p>
                <ProgressBar/>

            </div>
            <TabsComponent/>
        </div>
      </div>
    ))}
  </>;
}
