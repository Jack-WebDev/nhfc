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
  {
    typology: "RDP Houses",
    description: "Basic Housing",
    qty: 500,
    sellingPrice: 150000,
    income: 750000000,
  },
  {
    typology: "RDP Units",
    description: "Apartment Blocks",
    qty: 200,
    sellingPrice: 350000,
    income: 70000000,
  },
  // {
  //   typology: "Type C",
  //   description: "Description C",
  //   qty: 15,
  //   sellingPrice: 40,
  //   income: 600,
  // },
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

  const addRow = (e: any) => {
    e.preventDefault();

    const newRow: Row = {
      typology: "",
      description: "",
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
    // console.log("Form Data:", formData);
    try {
      const res = await axios.post("/api/projects", formData);
      router.push("/frontend/projects");
      // console.log(res);
    } catch (error) {
      console.log(error as AxiosError);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <ArrowLeft
          onClick={() => router.back()}
          className="cursor-pointer text-blue-500 hover:text-blue-700"
        />
        <h1 className="text-3xl text-blue-500 font-medium text-center my-8">
          Add New Project
        </h1>
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block font-semibold">Project Name</label>
              <input
                type="text"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <label className="block font-semibold">Project Code</label>
              <input
                type="text"
                name="projectCode"
                value={formData.projectCode}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block font-semibold">Project Program</label>
              <select
                name="programme"
                value={formData.programme}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
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
            <div className="space-y-2">
              <label className="block font-semibold">Project Status</label>
              <select
                name="projectStatus"
                value={formData.projectStatus}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              >
                <option value="">Select Project Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          <h2 className="text-2xl font-semibold">Project Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block font-semibold">Province</label>
              <select
                name="province"
                value={formData.province}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
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
            <div className="space-y-2">
              <label className="block font-semibold">Municipality</label>
              <select
                name="municipality"
                value={formData.municipality}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
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
                <option value="City of Johannesburg">
                  City of Johannesburg
                </option>
                <option value="City of Tshwane">City of Tshwane</option>
                <option value="Ekurhuleni">Ekurhuleni</option>
                <option value="Sedibeng">Sedibeng</option>
                <option value="West Rand">West Rand</option>
                <option value="Ethekwini">Ethekwini</option>
                <option value="Umgungundlovu">Umgungundlovu</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block font-semibold">Ward</label>
              <select
                name="ward"
                value={formData.ward}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              >
                <option value="">Select Ward</option>
                <option value="Ward-1">Ward 1</option>
                <option value="Ward-2">Ward 2</option>
                <option value="Ward-3">Ward 3</option>
                <option value="Ward-4">Ward 4</option>
                <option value="Ward-5">Ward 5</option>
                <option value="Ward-6">Ward 6</option>
                <option value="Ward-7">Ward 7</option>
                <option value="Ward-8">Ward 8</option>
                <option value="Ward-9">Ward 9</option>
                <option value="Ward-10">Ward 10</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block font-semibold">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block font-semibold">GPS Coordinates</label>
            <input
              type="text"
              name="gpscoordinates"
              value={formData.gpscoordinates}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block font-semibold">Project Owner</label>
              <select
                name="projectOwner"
                value={formData.projectOwner}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              >
                <option value="">Select Project Owner</option>
                <option value="Buffalo City">Buffalo City</option>
                <option value="Nelson Mandela Bay">Nelson Mandela Bay</option>
                <option value="Or Tambo">Or Tambo</option>
                <option value="Chris Hani">Chris Hani</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block font-semibold">Developer</label>
              <select
                name="developer"
                value={formData.developer}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              >
                <option value="">Select Developer</option>
                <option value="James">James Patterson</option>
                <option value="John">John Doe</option>
                <option value="Mary">Mary Smith</option>
                <option value="Michael">Michael Johnson</option>
                <option value="Robert">Robert Williams</option>
                <option value="Sarah">Sarah Jones</option>
                <option value="Tom">Tom Brown</option>
                <option value="William">William Lee</option>
                <option value="Zachary">Zachary Smith</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block font-semibold">Project Liason</label>
            <select
              name="projectLiason"
              value={formData.projectLiason}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            >
              <option value="">Select Project Liason</option>
              <option value="Buffalo City">Buffalo City</option>
              <option value="Nelson Mandela Bay">Nelson Mandela Bay</option>
              <option value="Or Tambo">Or Tambo</option>
              <option value="Chris Hani">Chris Hani</option>
            </select>
          </div>

          <h2 className="text-2xl font-semibold">Local Businesses Impacted</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block font-semibold">Material Supplier</label>
              <select
                name="materialSupplier"
                value={formData.materialSupplier}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              >
                <option value="">Select Material Supplier</option>
                <option value="Buffalo City">Buffalo City</option>
                <option value="Nelson Mandela Bay">Nelson Mandela Bay</option>
                <option value="Or Tambo">Or Tambo</option>
                <option value="Chris Hani">Chris Hani</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block font-semibold">Contractor</label>
              <select
                name="contractor"
                value={formData.contractor}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              >
                <option value="">Select Contractor</option>
                <option value="Vertex-Global">Vertex Global</option>
                <option value="Synergy-Pulse">Synergy Pulse</option>
                <option value="Luminary-Systems">Luminary Systems</option>
                <option value="ZenithCore-Enterprises">
                  ZenithCore Enterprises
                </option>
                <option value="Arcadia-Dynamics">Arcadia Dynamics</option>
                <option value="VectorRise-Technologies">
                  VectorRise Technologies
                </option>
              </select>
            </div>
          </div>

          <h2 className="text-2xl font-semibold">
            Deliverables / Outputs / Outcomes
          </h2>
          <div className="space-y-2">
            <label className="block font-semibold">Deliverables Summary</label>
            <textarea
              name="deliverablesSummary"
              value={formData.deliverablesSummary}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <h2 className="text-2xl font-semibold">Outcomes / Outputs</h2>
          <table className="min-w-full border border-gray-300 rounded-xl">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">Typology</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Qty</th>
                <th className="p-3 text-left">Selling Price</th>
                <th className="p-3 text-left">Income</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">
                    <input
                      type="text"
                      value={row.typology}
                      onChange={(e) => {
                        const newRows = [...rows];
                        newRows[index].typology = e.target.value;
                        setRows(newRows);
                      }}
                      className="w-full p-2 border rounded-lg"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={row.description}
                      onChange={(e) => {
                        const newRows = [...rows];
                        newRows[index].description = e.target.value;
                        setRows(newRows);
                      }}
                      className="w-full p-2 border rounded-lg"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="number"
                      value={row.qty}
                      onChange={(e) => {
                        const newRows = [...rows];
                        newRows[index].qty = Number(e.target.value);
                        setRows(newRows);
                      }}
                      className="w-full p-2 border rounded-lg"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="number"
                      value={row.sellingPrice}
                      onChange={(e) => {
                        const newRows = [...rows];
                        newRows[index].sellingPrice = Number(e.target.value);
                        setRows(newRows);
                      }}
                      className="w-full p-2 border rounded-lg"
                    />
                  </td>
                  <td className="p-3">{row.qty * row.sellingPrice}</td>
                  <td className="p-3">
                    <button
                      type="button"
                      onClick={() => {
                        const newRows = rows.filter((_, i) => i !== index);
                        setRows(newRows);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={addRow}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            Add Outcome
          </button>

          <h2 className="text-2xl font-semibold">Job Creations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block font-semibold">Skilled Workers</label>
              <input
                type="number"
                name="skilledWorkers"
                value={formData.skilledWorkers}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <label className="block font-semibold">Unskilled Workers</label>
              <input
                type="number"
                name="unskilledWorkers"
                value={formData.unskilledWorkers}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>
          </div>

          <h2 className="text-2xl font-semibold">Community Infrastructure</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block font-semibold">Schools</label>
              <input
                type="number"
                name="schools"
                value={formData.schools}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <label className="block font-semibold">Clinics</label>
              <input
                type="number"
                name="clinics"
                value={formData.clinics}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <label className="block font-semibold">Community Halls</label>
              <input
                type="number"
                name="communityHalls"
                value={formData.communityHalls}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <label className="block font-semibold">Sports Field</label>
              <input
                type="number"
                name="sportsField"
                value={formData.sportsField}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block font-semibold">
              Implementation Partners
            </label>
            <select
              name="implementationPartners"
              value={formData.implementationPartners}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            >
              <option value="">Select Implementation Partners</option>
              <option value="Buffalo City">Buffalo City</option>
              <option value="Nelson Mandela Bay">Nelson Mandela Bay</option>
              <option value="Or Tambo">Or Tambo</option>
              <option value="Chris Hani">Chris Hani</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full md:w-auto bg-blue-500 text-white py-3 px-8 rounded-lg transition duration-200 hover:bg-blue-700"
          >
            Add Project
          </button>
        </form>
      </div>
    </div>
  );
}
