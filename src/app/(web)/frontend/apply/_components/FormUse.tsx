"use client";

import React, { useState } from "react";
import FormSections from "./FormSections";
import axios, { AxiosError } from "axios";

type FormData = {
  [key: string]: any;
};

type TitleProp = {
  selectedOption: string;
};

export default function FormUse({ selectedOption }: TitleProp) {
  const [formData, setFormData] = useState<FormData>({});
  const [currentSection, setCurrentSection] = useState<number>(0);

  const sections = [
    {
      title: "Social Housing Finance",
      fields: [
        {
          name: "applicantType",
          label: "Applicant Type",
          type: "select",
          options: ["Organization/Business", "Individual"],
        },
        { name: "projectName", label: "Project Name", type: "text" },
        { name: "nameOfCompany", label: "Name of Company", type: "text" },
        { name: "fullName", label: "Contact Person", type: "text" },
        {
          name: "province",
          label: "Province",
          type: "select",
          options: [
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
          options: ["Quasi Equity", "Equity", "Loan"],
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
          options: ["South Africa", "Nigeria", "Ghana", "Botswana"],
        },
        { name: "docs", label: "Attach Documents", type: "file" },
      ],
    },
    {
      title: "Private Rental Housing Finance",
      fields: [
        {
          name: "applicantType",
          label: "Applicant Type",
          type: "select",
          options: ["Organization/Business", "Individual"],
        },
        { name: "projectName", label: "Project Name", type: "text" },
        { name: "nameOfCompany", label: "Name of Company", type: "text" },
        { name: "fullName", label: "Contact Person", type: "text" },
        {
          name: "province",
          label: "Province",
          type: "select",
          options: [
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
          options: ["Quasi Equity", "Equity", "Loan"],
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
          options: ["South Africa", "Nigeria", "Ghana", "Botswana"],
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
          options: ["Organization/Business", "Individual"],
        },
        { name: "projectName", label: "Project Name", type: "text" },
        { name: "nameOfCompany", label: "Name of Company", type: "text" },
        { name: "fullName", label: "Contact Person", type: "text" },
        {
          name: "province",
          label: "Province",
          type: "select",
          options: [
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
          options: ["Quasi Equity", "Equity", "Loan"],
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
          options: ["South Africa", "Nigeria", "Ghana", "Botswana"],
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
          options: ["Organization/Business", "Individual"],
        },
        { name: "projectName", label: "Project Name", type: "text" },
        { name: "nameOfCompany", label: "Name of Company", type: "text" },
        { name: "fullName", label: "Contact Person", type: "text" },
        {
          name: "province",
          label: "Province",
          type: "select",
          options: [
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
          options: ["Quasi Equity", "Equity", "Loan"],
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
          options: ["South Africa", "Nigeria", "Ghana", "Botswana"],
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
          options: ["Organization/Business", "Individual"],
        },
        { name: "projectName", label: "Project Name", type: "text" },
        { name: "nameOfCompany", label: "Name of Company", type: "text" },
        { name: "fullName", label: "Contact Person", type: "text" },
        {
          name: "province",
          label: "Province",
          type: "select",
          options: [
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
          options: ["Quasi Equity", "Equity", "Loan"],
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
          options: ["South Africa", "Nigeria", "Ghana", "Botswana"],
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
          options: ["Organization/Business", "Individual"],
        },
        { name: "projectName", label: "Project Name", type: "text" },
        { name: "nameOfCompany", label: "Name of Company", type: "text" },
        { name: "fullName", label: "Contact Person", type: "text" },
        {
          name: "province",
          label: "Province",
          type: "select",
          options: [
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
          options: ["Quasi Equity", "Equity", "Loan"],
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
          options: ["South Africa", "Nigeria", "Ghana", "Botswana"],
        },
        { name: "docs", label: "Attach Documents", type: "file" },
      ],
    },
  ];

  const handleChange = (e: any) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData((prevData) => ({ ...prevData, [name]: files?.[0] }));
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

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white py-2 px-8 rounded-lg"
      >
        Submit
      </button>
    </form>
  );
}
