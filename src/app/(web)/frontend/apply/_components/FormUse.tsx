"use client";

import React, { useState } from "react";
import FormSections from "./FormSections";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type FormData = {
  [key: string]: any;
};

type TitleProp = {
  selectedOption: string;
};

export default function FormUse({ selectedOption }: TitleProp) {
  const [formData, setFormData] = useState<FormData>({});
  const [currentSection, setCurrentSection] = useState<number>(0);
  const router = useRouter();

  const sections = [
    {
      title: "Social Housing Finance",
      fields: [
        { name: "fullName", label: "Contact Person", type: "text" },

        { name: "idNumber", label: "Id Number", type: "text" },
        { name: "email", label: "Email", type: "email" },
        { name: "phone", label: "Phone", type: "tel" },
        { name: "address", label: "Address of Development", type: "textarea" },
        { name: "city", label: "City", type: "text" },
        { name: "postalCode", label: "Postal Code", type: "text" },
        {
          name: "country",
          label: "Country",
          type: "select",
          options: [
            "Select Country",
            "South Africa",
            "Nigeria",
            "Ghana",
            "Botswana",
          ],
        },
        {
          name: "province",
          label: "Province",
          type: "select",
          options: [
            "Select Province",
            "Gauteng",
            "Western Cape",
            "KwaZulu-Natal",
            "Eastern Cape",
            "Mpumalanga",
            "Limpopo",
            "North West",
            "Northern Cape",
            "Free State",
            "Eastern Province",
            "Western Province",
          ],
        },
        {
          name: "applicantType",
          label: "Applicant Type",
          type: "select",
          options: ["Type of Applicant", "Organization/Business", "Individual"],
        },

        {
          name: "projectName",
          label: "Project Name",
          type: "select",
          options: [
            "Select Project",
            "Fleurhof Integrated Housing Development",
            "Belhar Social Housing Project",
            "Westgate Social Housing Project",
            "Devland Gardens",
            "Southernwood Square",
            "Thembelihle Village",
          ],
        },
      ],
    },
    {
      title: "Private Rental Housing Finance",
      fields: [
        {
          name: "applicantType",
          label: "Applicant Type",
          type: "select",
          options: ["Type of Applicant", "Organization/Business", "Individual"],
        },
        {
          name: "applicationType",
          label: "Application Type",
          type: "select",
          options: ["Type of Application", "Loan", "Investment"],
        },
        { name: "idNumber", label: "Id Number", type: "text" },
        {
          name: "projectName",
          label: "Project Name",
          type: "select",
          options: [
            "Select Project",
            "Fleurhof Integrated Housing Development",
            "Belhar Social Housing Project",
            "Westgate Social Housing Project",
            "Devland Gardens",
            "Southernwood Square",
            "Thembelihle Village",
          ],
        },
        { name: "nameOfCompany", label: "Name of Company", type: "text" },
        { name: "fullName", label: "Contact Person", type: "text" },
        {
          name: "province",
          label: "Province",
          type: "select",
          options: [
            "Select Province",
            "Gauteng",
            "Western Cape",
            "KwaZulu-Natal",
            "Eastern Cape",
            "Mpumalanga",
            "Limpopo",
            "North West",
            "Northern Cape",
            "Free State",
            "Eastern Province",
            "Western Province",
          ],
        },
        {
          name: "investmentType",
          label: "Investment Type",
          type: "select",
          options: ["Select Investment Type", "Quasi Equity", "Equity", "Loan"],
        },

        { name: "loanAmount", label: "Investment Amount", type: "text" },
        {
          name: "rate",
          label: "Rate",
          type: "select",
          options: [
            "8.5%",
            "7.2%",
            "6.8%",
            "9.0%",
            "7.5%",
            "8.1%",
            "7.9%",
            "8.7%",
            "9.3%",
            "8.9%",
          ],
        },
        { name: "email", label: "Email", type: "email" },
        { name: "phone", label: "Phone", type: "tel" },
        { name: "address", label: "Address of Development", type: "textarea" },
        { name: "city", label: "City", type: "text" },
        { name: "postalCode", label: "Postal Code", type: "text" },
        {
          name: "country",
          label: "Country",
          type: "select",
          options: [
            "Select Country",
            "South Africa",
            "Nigeria",
            "Ghana",
            "Botswana",
          ],
        },
        { name: "docs", label: "Attach Documents", type: "file" },
      ],
    },
    {
      title: "Incremental Housing Finance",
      fields: [
        {
          name: "applicantType",
          label: "Applicant Type",
          type: "select",
          options: ["Type of Applicant", "Organization/Business", "Individual"],
        },
        {
          name: "applicationType",
          label: "Application Type",
          type: "select",
          options: ["Type of Application", "Loan", "Investment"],
        },
        { name: "idNumber", label: "Id Number", type: "text" },
        {
          name: "projectName",
          label: "Project Name",
          type: "select",
          options: [
            "Select Project",
            "Fleurhof Integrated Housing Development",
            "Belhar Social Housing Project",
            "Westgate Social Housing Project",
            "Devland Gardens",
            "Southernwood Square",
            "Thembelihle Village",
          ],
        },
        { name: "nameOfCompany", label: "Name of Company", type: "text" },
        { name: "fullName", label: "Contact Person", type: "text" },
        {
          name: "province",
          label: "Province",
          type: "select",
          options: [
            "Select Province",
            "Gauteng",
            "Western Cape",
            "KwaZulu-Natal",
            "Eastern Cape",
            "Mpumalanga",
            "Limpopo",
            "North West",
            "Northern Cape",
            "Free State",
            "Eastern Province",
            "Western Province",
          ],
        },
        {
          name: "investmentType",
          label: "Investment Type",
          type: "select",
          options: ["Select Investment Type", "Quasi Equity", "Equity", "Loan"],
        },

        { name: "loanAmount", label: "Investment Amount", type: "text" },
        {
          name: "rate",
          label: "Rate",
          type: "select",
          options: [
            "8.5%",
            "7.2%",
            "6.8%",
            "9.0%",
            "7.5%",
            "8.1%",
            "7.9%",
            "8.7%",
            "9.3%",
            "8.9%",
          ],
        },
        { name: "email", label: "Email", type: "email" },
        { name: "phone", label: "Phone", type: "tel" },
        { name: "address", label: "Address of Development", type: "textarea" },
        { name: "city", label: "City", type: "text" },
        { name: "postalCode", label: "Postal Code", type: "text" },
        {
          name: "country",
          label: "Country",
          type: "select",
          options: [
            "Select Country",
            "South Africa",
            "Nigeria",
            "Ghana",
            "Botswana",
          ],
        },
        { name: "docs", label: "Attach Documents", type: "file" },
      ],
    },
    {
      title: "Affordable Housing Bridging Finance",
      fields: [
        {
          name: "applicantType",
          label: "Applicant Type",
          type: "select",
          options: ["Type of Applicant", "Organization/Business", "Individual"],
        },
        {
          name: "applicationType",
          label: "Application Type",
          type: "select",
          options: ["Type of Application", "Loan", "Investment"],
        },
        { name: "idNumber", label: "Id Number", type: "text" },
        {
          name: "projectName",
          label: "Project Name",
          type: "select",
          options: [
            "Select Project",
            "Fleurhof Integrated Housing Development",
            "Belhar Social Housing Project",
            "Westgate Social Housing Project",
            "Devland Gardens",
            "Southernwood Square",
            "Thembelihle Village",
          ],
        },
        { name: "nameOfCompany", label: "Name of Company", type: "text" },
        { name: "fullName", label: "Contact Person", type: "text" },
        {
          name: "province",
          label: "Province",
          type: "select",
          options: [
            "Select Province",
            "Gauteng",
            "Western Cape",
            "KwaZulu-Natal",
            "Eastern Cape",
            "Mpumalanga",
            "Limpopo",
            "North West",
            "Northern Cape",
            "Free State",
            "Eastern Province",
            "Western Province",
          ],
        },
        {
          name: "investmentType",
          label: "Investment Type",
          type: "select",
          options: ["Select Investment Type", "Quasi Equity", "Equity", "Loan"],
        },

        { name: "loanAmount", label: "Investment Amount", type: "text" },
        {
          name: "rate",
          label: "Rate",
          type: "select",
          options: [
            "8.5%",
            "7.2%",
            "6.8%",
            "9.0%",
            "7.5%",
            "8.1%",
            "7.9%",
            "8.7%",
            "9.3%",
            "8.9%",
          ],
        },
        { name: "email", label: "Email", type: "email" },
        { name: "phone", label: "Phone", type: "tel" },
        { name: "address", label: "Address of Development", type: "textarea" },
        { name: "city", label: "City", type: "text" },
        { name: "postalCode", label: "Postal Code", type: "text" },
        {
          name: "country",
          label: "Country",
          type: "select",
          options: [
            "Select Country",
            "South Africa",
            "Nigeria",
            "Ghana",
            "Botswana",
          ],
        },
        { name: "docs", label: "Attach Documents", type: "file" },
      ],
    },
    {
      title: "Contract Bridging Finance",
      fields: [
        {
          name: "applicantType",
          label: "Applicant Type",
          type: "select",
          options: ["Type of Applicant", "Organization/Business", "Individual"],
        },
        {
          name: "applicationType",
          label: "Application Type",
          type: "select",
          options: ["Type of Application", "Loan", "Investment"],
        },
        { name: "idNumber", label: "Id Number", type: "text" },
        {
          name: "projectName",
          label: "Project Name",
          type: "select",
          options: [
            "Select Project",
            "Fleurhof Integrated Housing Development",
            "Belhar Social Housing Project",
            "Westgate Social Housing Project",
            "Devland Gardens",
            "Southernwood Square",
            "Thembelihle Village",
          ],
        },
        { name: "nameOfCompany", label: "Name of Company", type: "text" },
        { name: "fullName", label: "Contact Person", type: "text" },
        {
          name: "province",
          label: "Province",
          type: "select",
          options: [
            "Select Province",
            "Gauteng",
            "Western Cape",
            "KwaZulu-Natal",
            "Eastern Cape",
            "Mpumalanga",
            "Limpopo",
            "North West",
            "Northern Cape",
            "Free State",
            "Eastern Province",
            "Western Province",
          ],
        },
        {
          name: "investmentType",
          label: "Investment Type",
          type: "select",
          options: ["Select Investment Type", "Quasi Equity", "Equity", "Loan"],
        },

        { name: "loanAmount", label: "Investment Amount", type: "text" },
        {
          name: "rate",
          label: "Rate",
          type: "select",
          options: [
            "8.5%",
            "7.2%",
            "6.8%",
            "9.0%",
            "7.5%",
            "8.1%",
            "7.9%",
            "8.7%",
            "9.3%",
            "8.9%",
          ],
        },
        { name: "email", label: "Email", type: "email" },
        { name: "phone", label: "Phone", type: "tel" },
        { name: "address", label: "Address of Development", type: "textarea" },
        { name: "city", label: "City", type: "text" },
        { name: "postalCode", label: "Postal Code", type: "text" },
        {
          name: "country",
          label: "Country",
          type: "select",
          options: [
            "Select Country",
            "South Africa",
            "Nigeria",
            "Ghana",
            "Botswana",
          ],
        },
        { name: "docs", label: "Attach Documents", type: "file" },
      ],
    },
    {
      title: "Incremental Housing Finance",
      fields: [
        {
          name: "applicantType",
          label: "Applicant Type",
          type: "select",
          options: ["Type of Applicant", "Organization/Business", "Individual"],
        },
        {
          name: "applicationType",
          label: "Application Type",
          type: "select",
          options: ["Type of Application", "Loan", "Investment"],
        },
        { name: "idNumber", label: "Id Number", type: "text" },
        {
          name: "projectName",
          label: "Project Name",
          type: "select",
          options: [
            "Select Project",
            "Fleurhof Integrated Housing Development",
            "Belhar Social Housing Project",
            "Westgate Social Housing Project",
            "Devland Gardens",
            "Southernwood Square",
            "Thembelihle Village",
          ],
        },
        { name: "nameOfCompany", label: "Name of Company", type: "text" },
        { name: "fullName", label: "Contact Person", type: "text" },
        {
          name: "province",
          label: "Province",
          type: "select",
          options: [
            "Select Province",
            "Gauteng",
            "Western Cape",
            "KwaZulu-Natal",
            "Eastern Cape",
            "Mpumalanga",
            "Limpopo",
            "North West",
            "Northern Cape",
            "Free State",
            "Eastern Province",
            "Western Province",
          ],
        },
        {
          name: "investmentType",
          label: "Investment Type",
          type: "select",
          options: ["Select Investment Type", "Quasi Equity", "Equity", "Loan"],
        },

        { name: "loanAmount", label: "Investment Amount", type: "text" },
        {
          name: "rate",
          label: "Rate",
          type: "select",
          options: [
            "8.5%",
            "7.2%",
            "6.8%",
            "9.0%",
            "7.5%",
            "8.1%",
            "7.9%",
            "8.7%",
            "9.3%",
            "8.9%",
          ],
        },
        { name: "email", label: "Email", type: "email" },
        { name: "phone", label: "Phone", type: "tel" },
        { name: "address", label: "Address of Development", type: "textarea" },
        { name: "city", label: "City", type: "text" },
        { name: "postalCode", label: "Postal Code", type: "text" },
        {
          name: "country",
          label: "Country",
          type: "select",
          options: [
            "Select Country",
            "South Africa",
            "Nigeria",
            "Ghana",
            "Botswana",
          ],
        },
        { name: "docs", label: "Attach Documents", type: "file" },
      ],
    },
  ];

  const handleChange = (e: any) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData((prevData) => ({ ...prevData, [name]: files?.[0].name }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Form Data:", { ...formData, loanType: selectedOption });
    try {
      const res = await axios.post("/api/applications", {
        ...formData,
        loanType: selectedOption,
      });
      console.log(res);
      router.push("/frontend");
      toast.success("Application Submitted Successfully");
    } catch (error) {
      console.log(error as AxiosError);
    }
  };

  return (
    <form>
      {/* <FormSections
        sectionTitle={selectedOption}
        fields={sections[currentSection].fields}
        values={formData}
        handleChange={handleChange}
      /> */}
      <div className="flex justify-between items-center">
        <div className="grid gap-y-4">
          <label htmlFor="contactPerson">Contact Person:</label>
          <input
            type="text"
            name="contactPerson"
            value={formData.contactPerson || ""}
            onChange={handleChange}
            placeholder="Enter Contact Person"
          />
        </div>
        <div className="grid gap-y-4">
          <label htmlFor="idNumber">ID Number:</label>
          <input
            type="text"
            name="idNumber"
            value={formData.idNumber || ""}
            onChange={handleChange}
            placeholder="Enter Id Number"
          />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="grid gap-y-4">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            placeholder="Enter Email"
          />
        </div>
        <div className="grid gap-y-4">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone || ""}
            onChange={handleChange}
            placeholder="Enter Phone Number"
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="grid gap-y-4">
          <label htmlFor="address">Address:</label>
          <textarea
            name="address"
            value={formData.address || ""}
            onChange={handleChange}
            placeholder="Enter Address"
          />
        </div>
        <div className="grid gap-y-4">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            name="city"
            value={formData.city || ""}
            onChange={handleChange}
            placeholder="Enter City"
          />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="grid gap-y-4">
          <label htmlFor="country">Country:</label>
          <select
            name="country"
            value={formData.country || ""}
            onChange={handleChange}
            className="border border-gray-200 rounded-lg p-2 bg-white"
          >
            <option value="" disabled>
              Select Country
            </option>
            <option value="South Africa">South Africa</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Ghana">Ghana</option>
            <option value="Botswana">Botswana</option>
          </select>
        </div>
        <div className="grid gap-y-4">
          <label htmlFor="province">Province:</label>
          <select
            name="province"
            value={formData.province || ""}
            onChange={handleChange}
            className="border border-gray-200 rounded-lg p-2 bg-white"
          >
            <option value="" disabled>
              Select Province
            </option>
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
        <div className="grid gap-y-4">
          <label htmlFor="postalCode">Postal Code:</label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode || ""}
            onChange={handleChange}
            placeholder="Enter Postal Code"
          />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="grid gap-y-4">
          <label htmlFor="projectName">Project Name:</label>
          <select
            name="projectName"
            value={formData.projectName || ""}
            onChange={handleChange}
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
        <div className="grid gap-y-4">
          <label htmlFor="applicantType">Applicant Type:</label>
          <select
            name="applicantType"
            value={formData.applicantType || ""}
            onChange={handleChange}
            className="border border-gray-200 rounded-lg p-2 bg-white"
          >
            <option value="" disabled>
              Select Applicant Type
            </option>
            <option value="Individual">Individual</option>
            <option value="Organization/Business">Organization/Business</option>
          </select>
        </div>
        {formData.applicantType === "Organization/Business" ? (
          <>
            <div className="grid gap-y-4">
              <label htmlFor="nameOfCompany">Name of Company:</label>
              <input
                type="text"
                name="nameOfCompany"
                value={formData.nameOfCompany || ""}
                onChange={handleChange}
                placeholder="Enter Name of Company"
              />
            </div>
          </>
        ) : null}
      </div>

      <div>
        <div>
          <label htmlFor="applicationType">Application Type:</label>
          <select
            name="applicationType"
            value={formData.applicationType || ""}
            onChange={handleChange}
            className="border border-gray-200 rounded-lg p-2 bg-white"
          >
            <option value="" disabled>
              Select Application Type
            </option>
            <option value="Loan">Loan</option>
            <option value="Investment">Investment</option>
          </select>
        </div>
        <div>
          {formData.applicationType === "Investment" ? (
            <>
              <div>
                <label htmlFor="investmentType">Investment Type:</label>
                <select
                  name="investmentType"
                  value={formData.investmentType || ""}
                  onChange={handleChange}
                  className="border border-gray-200 rounded-lg p-2 bg-white"
                >
                  <option value="" disabled>
                    Select Investment Type
                  </option>
                  <option value="Quasi Equity">Quasi Equity</option>
                  <option value="Equity">Equity</option>
                  <option value="Loan">Loan</option>
                </select>
              </div>
              {formData.investmentType === "Quasi Equity" ? (
                <div className="grid gap-y-4">
                  <label htmlFor="equityAmount">Equity Amount:</label>
                  <input
                    type="text"
                    name="equityAmount"
                    value={formData.equityAmount || ""}
                    onChange={handleChange}
                    placeholder="Enter Equity Amount"
                  />
                </div>
              ) : (
                <>
                  <div>
                    <label htmlFor="investmentAmount">Investment Amount:</label>
                    <input
                      type="text"
                      name="investmentAmount"
                      value={formData.investmentAmount || ""}
                      onChange={handleChange}
                      placeholder="Enter Investment Amount"
                    />
                  </div>
                </>
              )}
            </>
          ) : (
            <div>
              <label htmlFor="amount">
                {formData.applicationType === "Loan" ? "Application" : null}{" "}
                Amount:
              </label>
              <input
                type="text"
                name="amount"
                value={formData.amount || ""}
                onChange={handleChange}
                placeholder="Enter Amount"
              />
            </div>
          )}
        </div>
      </div>

      <label htmlFor="docs" className="block">
        <span className="text-gray-700">Attach Documents:</span>
        <input
          type="file"
          name="docs"
          className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out"
          value={formData.docs || ""}
          onChange={handleChange}
          placeholder="Enter Equity Amount"
        />
      </label>

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white py-2 px-8 rounded-lg mt-8"
      >
        Submit
      </button>
    </form>
  );
}
