"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { TabsComponent } from "./_components/Tabs";
import { ProgressBar } from "./_components/ProgressBar";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

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
  return (
    <>
      <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
      {projectData.map((project) => (
        <div
          key={project.id}
          className="bg-white rounded-xl p-4 border w-1/2 mx-auto"
        >
          <div>
            <div className="grid grid-cols-2 gap-4">
                <Image
                  src={"/toek_1.jpeg"}
                  alt="project"
                  width={200}
                  height={200}
                />
                <div>

              <h1 className="text-3xl font-semibold text-blue-500">
                {project.projectName}
              </h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Provident accusantium deserunt, nisi ipsum id, harum
                voluptatibus numquam ad quo facere quos at autem voluptate
                dolorem ut hic repellat. Possimus debitis deleniti nemo
                explicabo nam suscipit atque praesentium officia dolores
                voluptatibus! Doloremque, quia.
              </p>

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
              <ProgressBar />
                </div>
            </div>

            <div className="flex gap-x-4 my-8">
              <div>
                <h2 className="text-3xl font-semibold my-8">
                  Project Location
                </h2>
                <p>Address: {project.address}</p>
                <p>GPS Coordinates: {project.gpscoordinates}</p>
                <Image
                  src={"/Google-Maps-icon-on-map.webp"}
                  alt="Location"
                  width={150}
                  height={150}
                />
              </div>
              <div>
                <h2>Impact</h2>
                <p>
                  <span>Local Businesses Impacted:</span> Lorem ipsum dolor sit
                  amet consectetur, adipisicing elit. Officiis enim quod
                  aspernatur ullam omnis, quae explicabo dignissimos ex nostrum
                  deleniti consectetur ab voluptatibus. Minima obcaecati optio
                  animi, enim porro quo!
                </p>
                <p>
                  <span>Other sectors impacted:</span> Lorem ipsum dolor sit
                  amet consectetur, adipisicing elit. Officiis enim quod
                  aspernatur ullam omnis, quae explicabo dignissimos ex nostrum
                  deleniti consectetur ab voluptatibus. Minima obcaecati optio
                  animi, enim porro quo! Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Repellendus at fugiat iusto vero quis
                  debitis perferendis commodi quae eveniet doloremque!
                </p>

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aspernatur odit omnis ipsum. Quidem consequatur nostrum fugiat
                  ex obcaecati quae repellendus accusamus, vero porro non ipsum
                  dolorem autem earum quia? Itaque omnis maiores, et hic nam
                  quam expedita blanditiis molestias sapiente minima nihil
                  libero sequi, mollitia, dolor voluptatem voluptas? Eos, iure?
                </p>
              </div>
            </div>
            <TabsComponent />

            <div>
              <h2>Project Gallery</h2>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
