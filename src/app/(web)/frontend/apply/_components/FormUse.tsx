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
          name: "applicationType",
          label: "Application Type",
          type: "select",
          options: ["Type of Application", "Loan", "Investment"],
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
        { name: "nameOfCompany", label: "Name of Company", type: "text" },

        { name: "loanAmount", label: "Investment Amount", type: "text" },
        {
          name: "investmentType",
          label: "Investment Type",
          type: "select",
          options: ["Select Investment Type", "Quasi Equity", "Equity", "Loan"],
        },

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

        // { name: "docs", label: "Attach Documents", type: "file" },
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
      <FormSections
        sectionTitle={selectedOption}
        fields={sections[currentSection].fields}
        values={formData}
        handleChange={handleChange}
      />

      {formData.investmentType === "Quasi Equity" && (
        <label className="grid my-8">
          <span className="text-gray-700">Equity Amount:</span>
          <input
            type="text"
            name="equityAmount"
            className="border border-gray-200 rounded-lg p-2 w-1/2"
            value={formData.equityAmount || ""}
            onChange={handleChange}
            placeholder="Enter Equity Amount"
          />
        </label>
      )}

      <label htmlFor="docs" className="grid mt-8">
        <span className="text-red-600 text-lg font-semibold">Attach All Required Documents (see above):</span>
        <input
          type="file"
          name="docs"
          className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out"
          onChange={handleChange}
          placeholder="Enter Equity Amount"
          multiple
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
