"use client";

import React, { useState } from 'react'
import FormSections from './FormSections';

type FormData = {
    [key: string]: any;
  };

export default function FormUse() {
    const [formData, setFormData] = useState<FormData>({});
    const [currentSection, setCurrentSection] = useState<number>(0);
  
    const sections = [
      {
        title: 'Social Housing Finance',
        fields: [
          { name: 'nameOfCompany', label: 'Name of Company', type: 'text' },
          { name: 'fullName', label: 'Contact Person', type: 'text' },
          { name: 'email', label: 'Email', type: 'email' },
          { name: 'phone', label: 'Phone', type: 'tel' },
          { name: 'addressOfDevelopment', label: 'Address of Development', type: 'textarea' },
          { name: 'city', label: 'City', type: 'text' },
          { name: 'province', label: 'Province', type: 'text' },
          { name: 'postalCode', label: 'Postal Code', type: 'text' },

        ],
      },
      {
        title: 'Private Rental Housing Finance',
        fields: [
            { name: 'nameOfCompany', label: 'Name of Company', type: 'text' },
            { name: 'fullName', label: 'Contact Person', type: 'text' },
            { name: 'email', label: 'Email', type: 'email' },
            { name: 'phone', label: 'Phone', type: 'tel' },
            { name: 'addressOfDevelopment', label: 'Address of Development', type: 'textarea' },
            { name: 'city', label: 'City', type: 'text' },
            { name: 'province', label: 'Province', type: 'text' },
            { name: 'postalCode', label: 'Postal Code', type: 'text' },
        ],
      },
      {
        title: 'Incremental Housing Finance',
        fields: [
            { name: 'nameOfCompany', label: 'Name of Company', type: 'text' },
            { name: 'fullName', label: 'Contact Person', type: 'text' },
            { name: 'email', label: 'Email', type: 'email' },
            { name: 'phone', label: 'Phone', type: 'tel' },
        ],
      },
      {
        title: 'Affordable Housing Bridging Finance',
        fields: [
            { name: 'nameOfCompany', label: 'Name of Company', type: 'text' },
            { name: 'fullName', label: 'Contact Person', type: 'text' },
            { name: 'email', label: 'Email', type: 'email' },
            { name: 'phone', label: 'Phone', type: 'tel' },
            { name: 'addressOfDevelopment', label: 'Address of Development', type: 'textarea' },
            { name: 'city', label: 'City', type: 'text' },
            { name: 'province', label: 'Province', type: 'text' },
            { name: 'postalCode', label: 'Postal Code', type: 'text' },
        ],
      },
      {
        title: 'Contract Bridging Finance',
        fields: [
            { name: 'nameOfCompany', label: 'Name of Company', type: 'text' },
            { name: 'fullName', label: 'Contact Person', type: 'text' },
            { name: 'email', label: 'Email', type: 'email' },
            { name: 'phone', label: 'Phone', type: 'tel' },
            { name: 'addressOfDevelopment', label: 'Address of Development', type: 'textarea' },
            { name: 'city', label: 'City', type: 'text' },
            { name: 'province', label: 'Province', type: 'text' },
            { name: 'postalCode', label: 'Postal Code', type: 'text' },
        ],
      },
      // Add more sections as needed
    ];
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevData:any) => ({ ...prevData, [name]: value }));
    };
  
    const handleNext = () => {
      if (currentSection < sections.length - 1) {
        setCurrentSection(currentSection + 1);
      }
    };
  
    const handlePrevious = () => {
      if (currentSection > 0) {
        setCurrentSection(currentSection - 1);
      }
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form Data:', formData);
      // Handle form submission logic here
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <FormSections
          sectionTitle={sections[currentSection].title}
          fields={sections[currentSection].fields}
          values={formData}
          handleChange={handleChange}
        />
        <div>
          {currentSection > 0 && <button type="button" onClick={handlePrevious}>Previous</button>}
          {currentSection < sections.length - 1 && <button type="button" onClick={handleNext}>Next</button>}
          {currentSection === sections.length - 1 && <button type="submit">Submit</button>}
        </div>
      </form>
    );
}
