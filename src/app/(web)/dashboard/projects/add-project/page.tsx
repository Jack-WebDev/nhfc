"use client";

import axios, { AxiosError } from "axios";
import { useState } from "react";

type ProjectProps = {
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

export default function AddProject() {
  const [formData, setFormData] = useState<ProjectProps>({
    projectName: "",
    projectCode: "",
    programme: "",
    projectStatus: "",
    province: "",
    municipality: "",
    ward: "",
    address: "",
    gpscoordinates: "",
    projectOwner: "",
    developer: "",
    projectLiason: "",
    materialSupplier: "",
    contractor: "",
    deliverablesSummary: "",
    skilledWorkers: "",
    unskilledWorkers: "",
    schools: "",
    clinics: "",
    communityHalls: "",
    sportsField: "",
    implementationPartners: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Form Data:",  formData );
    try {
      const res = await axios.post("/api/projects", 
        formData,
      );
      console.log(res);
    } catch (error) {
      console.log(error as AxiosError);
    }
  };
  return (
    <div>
      <h1 className="text-3xl text-blue-500 font-medium">Add New Project</h1>
      <form className="bg-white rounded-xl p-4 grid justify-items-center w-[70%] mx-auto">
        <div className="flex items-center justify-between w-full gap-x-12">
          <div className="grid gap-y-2 w-full">
            <label>Project Name</label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              className="border border-gray-500 rounded-lg"
            />
          </div>
          <div className="grid gap-y-2 w-full">
            <label>Project Code</label>
            <input
              type="text"
              name="projectCode"
              value={formData.projectCode}
              onChange={handleChange}
              className="border border-gray-500 rounded-lg"
            />
          </div>
        </div>
        <div className="flex items-center justify-between w-full gap-x-12">
          <div className="grid gap-y-2 w-full">
            <label>Project Program</label>
            <select
              name="programme"
              value={formData.programme}
              onChange={handleChange}
              className="border border-gray-500 rounded-lg p-1 bg-white"
            >
              <option value="">Select Project Program</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Education">Education</option>
              <option value="Health">Health</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Social Development">Social Development</option>
              <option value="Water">Water</option>
            </select>
          </div>
          <div className="grid gap-y-2 w-full">
            <label>Project Status</label>
            <select
              name="projectStatus"
              value={formData.projectStatus}
              onChange={handleChange}
              className="border border-gray-500 rounded-lg p-1 bg-white"
            >
              <option value="">Select Project Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>
        <div className="flex items-center justify-between w-full gap-x-12">
          <div className="grid gap-y-2 w-full">
            <label>Province</label>
            <select
              name="province"
              value={formData.province}
              onChange={handleChange}
              className="border border-gray-500 rounded-lg p-1 bg-white"
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
              <option value="Western Cape">Western Cape</option>
            </select>
          </div>
          <div className="grid gap-y-2 w-full">
            <label>Municipality</label>
            <select
              name="municipality"
              value={formData.municipality}
              onChange={handleChange}
              className="border border-gray-500 rounded-lg p-1 bg-white"
            >
              <option value="">Select Municipality</option>
              <option value="Buffalo City">Buffalo City</option>
              <option value="Nelson Mandela Bay">Nelson Mandela Bay</option>
              <option value="Or Tambo">Or Tambo</option>
              <option value="Alfred Nzo">Alfred Nzo</option>
              <option value="Sarah Baartman">Sarah Baartman</option>
              <option value="Mangaung">Mangaung</option>
              <option value="Fezile Dabi">Fezile Dabi</option>
              <option value="Lejweleputswa">Lejweleputswa</option>
              <option value="Thabo Mofutsanyana">Thabo Mofutsanyana</option>
              <option value="Xhariep">Xhariep</option>
              <option value="City of Johannesburg">City of Johannesburg</option>
              <option value="City of Tshwane">City of Tshwane</option>
              <option value="Ekurhuleni">Ekurhuleni</option>
              <option value="Sedibeng">Sedibeng</option>
              <option value="West Rand">West Rand</option>
              <option value="Ethekwini">Ethekwini</option>
              <option value="Umgungundlovu">Umgungundlovu</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between w-full gap-x-12">
          <div className="grid gap-y-2 w-full">
            <label htmlFor="ward">Ward</label>
            <select
              name="ward"
              value={formData.ward}
              onChange={handleChange}
              className="border border-gray-500 rounded-lg p-1 bg-white"
            >
              <option value="">Select Ward</option>
              <option value="Buffalo City">Buffalo City</option>
              <option value="Nelson Mandela Bay">Nelson Mandela Bay</option>
              <option value="Or Tambo">Or Tambo</option>
              <option value="Chris Hani">Chris Hani</option>
            </select>
          </div>

          <div className="grid gap-y-2 w-full">
            <label htmlFor="address">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border border-gray-500 rounded-lg"
            />
          </div>
        </div>

        <div className="grid justify-self-start">
          <label htmlFor="gpsCoordinates">GPS Coordinates</label>
          <input
            type="text"
            name="gpscoordinates"
            value={formData.gpscoordinates}
            onChange={handleChange}
            className="border border-gray-500 rounded-lg"
          />
        </div>

        <div className="flex items-center justify-between w-full gap-x-12">
          <div className="grid gap-y-2 w-full">
            <label htmlFor="projectOwner">Project Owner</label>
            <select
              name="projectOwner"
              value={formData.projectOwner}
              onChange={handleChange}
              className="border border-gray-500 rounded-lg p-1 bg-white"
            >
              <option value="">Select Project Owner</option>
              <option value="Buffalo City">Buffalo City</option>
              <option value="Nelson Mandela Bay">Nelson Mandela Bay</option>
              <option value="Or Tambo">Or Tambo</option>
              <option value="Chris Hani">Chris Hani</option>
            </select>
          </div>
          <div className="grid gap-y-2 w-full">
            <label htmlFor="developer">Developer</label>
            <select
              name="developer"
              value={formData.developer}
              onChange={handleChange}
              className="border border-gray-500 rounded-lg p-1 bg-white"
            >
              <option value="">Select Developer</option>
              <option value="Buffalo City">Buffalo City</option>
              <option value="Nelson Mandela Bay">Nelson Mandela Bay</option>
              <option value="Or Tambo">Or Tambo</option>
              <option value="Chris Hani">Chris Hani</option>
            </select>
          </div>
        </div>

        <div className="grid gap-y-2 justify-self-start">
          <label htmlFor="projectLiason">Project Liason</label>
          <select
            name="projectLiason"
            value={formData.projectLiason}
            onChange={handleChange}
            className="border border-gray-500 rounded-lg p-1 bg-white"
          >
            <option value="">Select Project Liason</option>
            <option value="Buffalo City">Buffalo City</option>
            <option value="Nelson Mandela Bay">Nelson Mandela Bay</option>
            <option value="Or Tambo">Or Tambo</option>
            <option value="Chris Hani">Chris Hani</option>
          </select>
        </div>

        <div className="flex items-center justify-between w-full gap-x-12">
          <div className="grid w-full">
            <label htmlFor="materialSupplier">Material Supplier</label>
            <select
              name="materialSupplier"
              value={formData.materialSupplier}
              onChange={handleChange}
              className="border border-gray-500 rounded-lg p-1 bg-white"
            >
              <option value="">Select Material Supplier</option>
              <option value="Buffalo City">Buffalo City</option>
              <option value="Nelson Mandela Bay">Nelson Mandela Bay</option>
              <option value="Or Tambo">Or Tambo</option>
              <option value="Chris Hani">Chris Hani</option>
            </select>
          </div>
          <div className="grid w-full">
            <label htmlFor="contractor">Contractor</label>
            <select
              name="contractor"
              value={formData.contractor}
              onChange={handleChange}
              className="border border-gray-500 rounded-lg p-1 bg-white"
            >
              <option value="">Select Contractor</option>
              <option value="Buffalo City">Buffalo City</option>
              <option value="Nelson Mandela Bay">Nelson Mandela Bay</option>
              <option value="Or Tambo">Or Tambo</option>
              <option value="Chris Hani">Chris Hani</option>
            </select>
          </div>
        </div>
        <div className="grid justify-self-start w-full">
          <label htmlFor="deliverablesSummary">Deliverables Summary</label>
          <textarea
            name="deliverablesSummary"
            value={formData.deliverablesSummary}
            onChange={handleChange}
            className="border border-gray-500 rounded-lg"
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-y-2">
            <label htmlFor="skilledWorkers">Skilled Workers</label>
            <input
              type="number"
              name="skilledWorkers"
              value={formData.skilledWorkers}
              onChange={handleChange}
              className="border border-gray-500 rounded-lg"
            />
          </div>
          <div className="grid gap-y-2">
            <label htmlFor="unskilledWorkers">Unskilled Workers</label>
            <input
              type="number"
              name="unskilledWorkers"
              value={formData.unskilledWorkers}
              onChange={handleChange}
              className="border border-gray-500 rounded-lg"
            />
          </div>

          <div className="grid gap-y-2">
            <label htmlFor="schools">Schools</label>
            <input
              type="number"
              name="schools"
              value={formData.schools}
              onChange={handleChange}
              className="border border-gray-500 rounded-lg"
            />
          </div>
          <div className="grid gap-y-2">
            <label htmlFor="clinics">Clinics</label>
            <input
              type="number"
              name="clinics"
              value={formData.clinics}
              onChange={handleChange}
              className="border border-gray-500 rounded-lg"
            />
          </div>

          <div className="grid gap-y-2">
            <label htmlFor="communityHalls">Community Halls</label>
            <input
              type="number"
              name="communityHalls"
              value={formData.communityHalls}
              onChange={handleChange}
              className="border border-gray-500 rounded-lg"
            />
          </div>
          <div className="grid gap-y-2">
            <label htmlFor="sportsField">Sports Field</label>
            <input
              type="number"
              name="sportsField"
              value={formData.sportsField}
              onChange={handleChange}
              className="border border-gray-500 rounded-lg"
            />
          </div>
        </div>

        <div className="grid justify-self-start">
          <label htmlFor="implementationPartners">
            Implementation Partners
          </label>
          <select
            name="implementationPartners"
            value={formData.implementationPartners}
            onChange={handleChange}
            className="border border-gray-500 rounded-lg p-1 bg-white"
          >
            <option value="">Select Implementation Partners</option>
            <option value="Buffalo City">Buffalo City</option>
            <option value="Nelson Mandela Bay">Nelson Mandela Bay</option>
            <option value="Or Tambo">Or Tambo</option>
            <option value="Chris Hani">Chris Hani</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-8 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
