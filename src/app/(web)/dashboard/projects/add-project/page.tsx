"use client";

import axios, { AxiosError } from "axios";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
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
type Row = {
  typology: string;
  description: string;
  qty: number;
  sellingPrice: number;
  income: number;
};

const initialRows: Row[] = [
  { typology: 'Type A', description: 'Description A', qty: 10, sellingPrice: 50, income: 500 },
  { typology: 'Type B', description: 'Description B', qty: 20, sellingPrice: 30, income: 600 },
  { typology: 'Type C', description: 'Description C', qty: 15, sellingPrice: 40, income: 600 },
];

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
  const router = useRouter();
  const [rows, setRows] = useState<Row[]>(initialRows);

  const addRow = (e:any) => {
    e.preventDefault();

    const newRow: Row = {
      typology: '',
      description: '',
      qty: 0,
      sellingPrice: 0,
      income: 0,
    };
    setRows([...rows, newRow]);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    try {
      const res = await axios.post("/api/projects", formData);
      router.push("/frontend/projects");
      console.log(res);
    } catch (error) {
      console.log(error as AxiosError);
    }
  };
  return (
    <div>
      <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
      <h1 className="text-3xl text-blue-500 font-medium text-center my-8">
        Add New Project
      </h1>
      <form className="bg-white rounded-xl p-8 grid justify-items-center w-[70%] mx-auto">
        <div className="flex items-center justify-between w-full gap-x-12">
          <div className="grid gap-y-2 w-full">
            <label>Project Name</label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
            />
          </div>
          <div className="grid gap-y-2 w-full">
            <label>Project Code</label>
            <input
              type="text"
              name="projectCode"
              value={formData.projectCode}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
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
              className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
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
              className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
            >
              <option value="">Select Project Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>
        <h2 className="text-2xl font-semibold my-8">Project Location</h2>
        <div className="flex items-center justify-between w-full gap-x-12">
          <div className="grid gap-y-2 w-full">
            <label>Province</label>
            <select
              name="province"
              value={formData.province}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
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
              className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
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
              className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
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
              className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
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
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
          />
        </div>

        <div className="flex items-center justify-between w-full gap-x-12">
          <div className="grid gap-y-2 w-full">
            <label htmlFor="projectOwner">Project Owner</label>
            <select
              name="projectOwner"
              value={formData.projectOwner}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
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
              className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
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
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
          >
            <option value="">Select Project Liason</option>
            <option value="Buffalo City">Buffalo City</option>
            <option value="Nelson Mandela Bay">Nelson Mandela Bay</option>
            <option value="Or Tambo">Or Tambo</option>
            <option value="Chris Hani">Chris Hani</option>
          </select>
        </div>

        <h2 className="text-2xl font-semibold my-8">
          Local Businesses Impacted
        </h2>

        <div className="flex items-center justify-between w-full gap-x-12">
          <div className="grid w-full">
            <label htmlFor="materialSupplier">Material Supplier</label>
            <select
              name="materialSupplier"
              value={formData.materialSupplier}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
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
              className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
            >
              <option value="">Select Contractor</option>
              <option value="Buffalo City">Buffalo City</option>
              <option value="Nelson Mandela Bay">Nelson Mandela Bay</option>
              <option value="Or Tambo">Or Tambo</option>
              <option value="Chris Hani">Chris Hani</option>
            </select>
          </div>
        </div>
        <h2 className="text-2xl font-semibold my-8">
          Deliverables / Outputs / Outcomes
        </h2>
        <div className="grid justify-self-start w-full">
          <label htmlFor="deliverablesSummary">Deliverables Summary</label>
          <textarea
            name="deliverablesSummary"
            value={formData.deliverablesSummary}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
          ></textarea>
        </div>
        <h2 className="text-2xl font-semibold my-8">Outcomes / Outputs</h2>
        <div>
      <table className="border border-gray-300 rounded-xl">
        <thead className="bg-gray-300">
          <tr>
            <th>Typology</th>
            <th>Description</th>
            <th>Qty</th>
            <th>Selling Price</th>
            <th>Income</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-b-2 border-gray-300">
              <td><input type="text" value={row.typology} onChange={(e) => {
                const newRows = [...rows];
                newRows[index].typology = e.target.value;
                setRows(newRows);
              }} /></td>
              <td><input type="text" value={row.description} onChange={(e) => {
                const newRows = [...rows];
                newRows[index].description = e.target.value;
                setRows(newRows);
              }} /></td>
              <td><input type="number" value={row.qty} onChange={(e) => {
                const newRows = [...rows];
                newRows[index].qty = Number(e.target.value);
                setRows(newRows);
              }} /></td>
              <td><input type="number" value={row.sellingPrice} onChange={(e) => {
                const newRows = [...rows];
                newRows[index].sellingPrice = Number(e.target.value);
                setRows(newRows);
              }} /></td>
              <td>{row.qty * row.sellingPrice}</td>
              <td>
                <button onClick={() => {
                  const newRows = rows.filter((_, i) => i !== index);
                  setRows(newRows);
                }}><Trash2 size={18} className="text-red-500" /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addRow} className="bg-blue-500 text-white rounded-lg py-2 px-4 mt-8">Add Outcome</button>
    </div>
        <h2 className="text-2xl font-semibold my-8">Job Creations</h2>
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="grid gap-y-2">
            <label htmlFor="skilledWorkers">Skilled Workers</label>
            <input
              type="number"
              name="skilledWorkers"
              value={formData.skilledWorkers}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
            />
          </div>
          <div className="grid gap-y-2">
            <label htmlFor="unskilledWorkers">Unskilled Workers</label>
            <input
              type="number"
              name="unskilledWorkers"
              value={formData.unskilledWorkers}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
            />
          </div>
        </div>
          <h2 className="text-2xl font-semibold my-8">
            Community Infrastructure
          </h2>
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="grid gap-y-2">
            <label htmlFor="schools">Schools</label>
            <input
              type="number"
              name="schools"
              value={formData.schools}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
            />
          </div>
          <div className="grid gap-y-2">
            <label htmlFor="clinics">Clinics</label>
            <input
              type="number"
              name="clinics"
              value={formData.clinics}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
            />
          </div>

          <div className="grid gap-y-2">
            <label htmlFor="communityHalls">Community Halls</label>
            <input
              type="number"
              name="communityHalls"
              value={formData.communityHalls}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
            />
          </div>
          <div className="grid gap-y-2">
            <label htmlFor="sportsField">Sports Field</label>
            <input
              type="number"
              name="sportsField"
              value={formData.sportsField}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
            />
          </div>
        </div>

        <div className="grid justify-self-center my-8">
          <label htmlFor="implementationPartners">
            Implementation Partners
          </label>
          <select
            name="implementationPartners"
            value={formData.implementationPartners}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
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
          className="bg-blue-500 text-white py-2 px-8 rounded-lg grid justify-self-end"
        >
          Add Project
        </button>
      </form>
    </div>
  );
}
