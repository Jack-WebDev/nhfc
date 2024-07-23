"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

const ViewProject = () => {
  const params = useParams();
  const projectID = params.id;
  const [projectData, setProjectData] = useState<ProjectProps[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const res = await axios.get(`/api/projects/${projectID}`);
        setProjectData(res.data);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchProjectData();
  }, [projectID]);

  return (
    <>
      <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
      {projectData.map((project) => (
        <div
          key={project.id}
          className="bg-white rounded-xl p-4 border w-3/4 mx-auto my-4"
        >
          <div className="flex flex-col lg:flex-row">
            <div className="flex-1 flex items-stretch">
              <div className="relative w-full h-full">
                <Image
                  src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914"
                  alt="Project Image"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl"
                />
              </div>
            </div>
            <div className="flex-1 lg:pl-8">
              <h1 className="text-3xl font-semibold text-blue-500">
                {project.projectName}
              </h1>
              <p className="mt-4 mb-8">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Provident accusantium deserunt, nisi ipsum id, harum
                voluptatibus numquam ad quo facere quos at autem voluptate
                dolorem ut hic repellat. Possimus debitis deleniti nemo
                explicabo nam suscipit atque praesentium officia dolores
                voluptatibus! Doloremque, quia.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-100 p-4 rounded-xl">
                  Project Code:{" "}
                  <span className="text-black">{project.projectCode}</span>
                </div>
                <div className="bg-gray-100 p-4 rounded-xl">
                  Municipality:{" "}
                  <span className="text-black">{project.municipality}</span>
                </div>
                <div className="bg-gray-100 p-4 rounded-xl">
                  Ward: <span className="text-black">{project.ward}</span>
                </div>
                <div className="bg-gray-100 p-4 rounded-xl">
                  ERF Number:{" "}
                  <span className="text-black">{project.address}</span>
                </div>
                <div className="bg-gray-100 p-4 rounded-xl">
                  Start Date:{" "}
                  <span className="text-black">{project.communityHalls}</span>
                </div>
                <div className="bg-gray-100 p-4 rounded-xl">
                  End Date:{" "}
                  <span className="text-black">
                    {project.deliverablesSummary}
                  </span>
                </div>
                <div className="bg-gray-100 p-4 rounded-xl">
                  Project Owner:{" "}
                  <span className="text-black">{project.projectOwner}</span>
                </div>
                <div className="bg-gray-100 p-4 rounded-xl">
                  Developer:{" "}
                  <span className="text-black">{project.developer}</span>
                </div>
                <div className="bg-gray-100 p-4 rounded-xl">
                  Project Liason:{" "}
                  <span className="text-black">{project.projectLiason}</span>
                </div>
                <div className="bg-gray-100 p-4 rounded-xl">
                  Jobs Created:{" "}
                  <span className="text-black">{project.developer}</span>
                </div>
                <div className="bg-gray-100 p-4 rounded-xl">
                  People Trained:{" "}
                  <span className="text-black">{project.materialSupplier}</span>
                </div>
              </div>
              <ProgressBar progress={75} />
              <div className="flex gap-4 mt-4">
                <a href="#" className="btn btn-primary">
                  Download Project Brief
                </a>
                <a href="#" className="btn btn-secondary">
                  Apply
                </a>
              </div>
            </div>
          </div>
          <div className="my-8">
            <h2 className="text-2xl font-semibold mb-4">Project Location</h2>
            <p>Address: {project.address}</p>
            <p>GPS Coordinates: {project.gpscoordinates}</p>
            <div className="w-full h-64 my-4">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src="https://www.openstreetmap.org/export/embed.html?bbox=27.899780273437504%2C-26.235569762925818%2C28.140106201171875%2C-26.09592537128791&amp;layer=mapnik&amp;marker=-26.165812228635842%2C28.01994323730469"
                style={{ border: "1px solid black" }}
              ></iframe>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Impact</h2>
            <p>
              <strong>Local Businesses Impacted:</strong> Lorem ipsum dolor sit
              amet consectetur, adipisicing elit. Officiis enim quod aspernatur
              ullam omnis, quae explicabo dignissimos ex nostrum deleniti
              consectetur ab voluptatibus. Minima obcaecati optio animi, enim
              porro quo!
            </p>
            <p>
              <strong>Other Sectors Impacted:</strong> Lorem ipsum dolor sit
              amet consectetur, adipisicing elit. Officiis enim quod aspernatur
              ullam omnis, quae explicabo dignissimos ex nostrum deleniti
              consectetur ab voluptatibus. Minima obcaecati optio animi, enim
              porro quo! Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Repellendus at fugiat iusto vero quis debitis perferendis
              commodi quae eveniet doloremque!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur odit omnis ipsum. Quidem consequatur nostrum fugiat ex
              obcaecati quae repellendus accusamus, vero porro non ipsum dolorem
              autem earum quia? Itaque omnis maiores, et hic nam quam expedita
              blanditiis molestias sapiente minima nihil libero sequi, mollitia,
              dolor voluptatem voluptas? Eos, iure?
            </p>
          </div>
          <TabsComponent />
          <div>
            <h2 className="text-2xl font-semibold mb-4">Project Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative w-full h-[200px]">
                <Image
                  src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914"
                  alt="Gallery Image 1"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <div className="relative w-full h-[200px]">
                <Image
                  src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914"
                  alt="Gallery Image 2"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <div className="relative w-full h-[200px]">
                <Image
                  src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914"
                  alt="Gallery Image 3"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <div className="relative w-full h-[200px]">
                <Image
                  src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914"
                  alt="Gallery Image 4"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

const TabsComponent = () => {
  const [activeTab, setActiveTab] = useState("deliverables");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="tabs flex border-b-2 mb-4">
        <div
          className={`tab p-2 cursor-pointer ${
            activeTab === "deliverables"
              ? "border-b-2 border-blue-500 text-blue-500"
              : ""
          }`}
          onClick={() => handleTabClick("deliverables")}
        >
          Deliverables / Outputs / Outcomes
        </div>
        <div
          className={`tab p-2 cursor-pointer ${
            activeTab === "partners"
              ? "border-b-2 border-blue-500 text-blue-500"
              : ""
          }`}
          onClick={() => handleTabClick("partners")}
        >
          Implementation Partners
        </div>
        <div
          className={`tab p-2 cursor-pointer ${
            activeTab === "risks"
              ? "border-b-2 border-blue-500 text-blue-500"
              : ""
          }`}
          onClick={() => handleTabClick("risks")}
        >
          Risks and Assumptions
        </div>
        <div
          className={`tab p-2 cursor-pointer ${
            activeTab === "financing"
              ? "border-b-2 border-blue-500 text-blue-500"
              : ""
          }`}
          onClick={() => handleTabClick("financing")}
        >
          Financing
        </div>
      </div>
      <div className="tab-content">
        {activeTab === "deliverables" && (
          <div>
            <h4>Deliverables / Outputs / Outcomes</h4>
            <ul>
              <li>
                10,000+ housing units (mix of social housing, RDP houses, and
                bonded units)
              </li>
              <li>4 schools (2 primary, 2 secondary)</li>
              <li>2 clinics</li>
              <li>5 recreational facilities</li>
              <li>1 shopping center</li>
              <li>20 hectares of green spaces and parks</li>
              <li>Improved public transport infrastructure</li>
              <li>8,000+ temporary jobs during construction</li>
              <li>1,500+ permanent jobs post-completion</li>
            </ul>
          </div>
        )}
        {activeTab === "partners" && (
          <div>
            <h4>Implementation Partners</h4>
            <ul>
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
          </div>
        )}
        {activeTab === "risks" && (
          <div>
            <h4>Risks and Assumptions</h4>
            <h5>Risks:</h5>
            <ul>
              <li>Delays in construction due to unforeseen circumstances</li>
              <li>Budget overruns</li>
              <li>Community resistance or conflicts</li>
              <li>Changes in government policies or regulations</li>
              <li>Environmental challenges</li>
            </ul>
            <h5>Assumptions:</h5>
            <ul>
              <li>Continued government support and funding</li>
              <li>Stable economic conditions</li>
              <li>Availability of skilled labor</li>
              <li>Timely delivery of materials and resources</li>
              <li>Positive community engagement and acceptance</li>
            </ul>
          </div>
        )}
        {activeTab === "financing" && (
          <div>
            <h4>Financing</h4>
            <p>Total Project Value: R3.5 Billion</p>
            <h5>Funding Sources:</h5>
            <ul>
              <li>NHFC Loan: R1.5 Billion</li>
              <li>Government Subsidy: R1 Billion</li>
              <li>Private Sector Investment: R800 Million</li>
              <li>Municipal Contribution: R200 Million</li>
            </ul>
            <p>
              The project utilizes a mixed-funding model to ensure
              sustainability and affordability for various income groups. This
              includes subsidized units, rental stock, and bonded houses.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
      <div
        className="bg-blue-500 h-4 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

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

export default ViewProject;
