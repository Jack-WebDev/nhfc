"use client";

import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function ApplicationProcess() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const [formData, setFormData] = useState({
    personalData: {
      firstName: "",
      lastName: "",
      email: "",
    },
    professionalData: {
      jobTitle: "",
      company: "",
      experience: "",
    },
    loanApplicationType: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [currentStep === 1
        ? "personalData"
        : currentStep === 2
        ? "professionalData"
        : "loanApplicationType"]:
        currentStep === 3
          ? value
          : {
              ...prevData[
                currentStep === 1 ? "personalData" : "professionalData"
              ],
              [name]: value,
            },
    }));
  };

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };
  return (
    <div>
      <h1>Application Process</h1>

      <div className="grid [grid-template-columns:.2fr_1fr] gap-4">
        <div>
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>What you’ll need (minimum):</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside">
                <li>A Cellphone</li>
                <li>A South African ID Number</li>
                <li>Bank Account Details</li>
                <li>Most recent proof of income</li>
              </ul>

              <hr className="my-8" />

              <div className="mt-12">
                <h2 className="text-xl font-semibold">
                  How to apply for a loan
                </h2>

                <ol className="list-decimal list-inside">
                  <li>Select the loan to apply for</li>
                  <li>Choose the amount you need</li>
                  <li>Complete the relevant sections</li>
                  <li>Upload the required documents</li>
                  <li>Submit the application</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="grid bg-white p-8 rounded-xl min-h-full">
            <div className="flex items-center justify-evenly ">
              <Image src={"/s-logo.png"} alt="" width={150} height={150} />{" "}
              <div className="grid">
                <h2 className="text-3xl font-semibold text-blue-500">
                  Loan Application
                </h2>
                <p className="text-sm text-gray-500">
                  Easy steps to go through the application form. Please ensure
                  that you have all the required documents ready.
                </p>
              </div>
            </div>
            <>
              {currentStep === 1 && (
                <>
                <fieldset className="grid grid-cols-4 items-center gap-4">
                  <legend>Is your loan application for? *</legend>

                  <div>
                    <label>
                      <input
                        type="radio"
                        value="Social Housing Finance"
                        checked={selectedOption === "Social Housing Finance"}
                        onChange={handleOptionChange}
                      />
                      Social Housing Finance
                    </label>
                  </div>

                  <div>
                    <label>
                      <input
                        type="radio"
                        value="Incremental Housing Finance"
                        checked={
                          selectedOption === "Incremental Housing Finance"
                        }
                        onChange={handleOptionChange}
                      />
                      Incremental Housing Finance
                    </label>
                  </div>

                  <div>
                    <label>
                      <input
                        type="radio"
                        value="Contract Bridging Finance"
                        checked={selectedOption === "Contract Bridging Finance"}
                        onChange={handleOptionChange}
                      />
                      Contract Bridging Finance
                    </label>
                  </div>

                  <div>
                    <label>
                      <input
                        type="radio"
                        value="Affordable Housing Bridging Finance"
                        checked={
                          selectedOption ===
                          "Affordable Housing Bridging Finance"
                        }
                        onChange={handleOptionChange}
                      />
                      Affordable Housing Bridging Finance
                    </label>
                  </div>

                  <div>
                    <label>
                      <input
                        type="radio"
                        value="Private Rental Housing Finance"
                        checked={
                          selectedOption === "Private Rental Housing Finance"
                        }
                        onChange={handleOptionChange}
                      />
                      Private Rental Housing Finance
                    </label>
                  </div>

                  <div>
                    <label>
                      <input
                        type="radio"
                        value="Programme And Fund Management"
                        checked={
                          selectedOption === "Programme And Fund Management"
                        }
                        onChange={handleOptionChange}
                      />
                      Programme And Fund Management
                    </label>
                  </div>

                  <div>
                    <label>
                      <input
                        type="radio"
                        value="Equity Finance"
                        checked={selectedOption === "Equity Finance"}
                        onChange={handleOptionChange}
                      />
                      Equity Finance
                    </label>
                  </div>

                  <div>
                    <label>
                      <input
                        type="radio"
                        value="First Home Finance"
                        checked={selectedOption === "First Home Finance"}
                        onChange={handleOptionChange}
                      />
                      First Home Finance
                    </label>
                  </div>
                </fieldset>
                {selectedOption && (
            <div className="mt-4">
              {selectedOption === "Social Housing Finance" && (
                <div>Display data for Social Housing Finance</div>
              )}
              {selectedOption === "Incremental Housing Finance" && (
                <div>Display data for Incremental Housing Finance</div>
              )}
              {selectedOption === "Contract Bridging Finance" && (
                <div>Display data for Contract Bridging Finance</div>
              )}
              {selectedOption === "Affordable Housing Bridging Finance" && (
                <div>Display data for Affordable Housing Bridging Finance</div>
              )}
              {selectedOption === "Private Rental Housing Finance" && (
                <div>Display data for Private Rental Housing Finance</div>
              )}
              {selectedOption === "Programme And Fund Management" && (
                <div>Display data for Programme And Fund Management</div>
              )}
              {selectedOption === "Equity Finance" && (
                <div>Display data for Equity Finance</div>
              )}
              {selectedOption === "First Home Finance" && (
                <div>Display data for First Home Finance</div>
              )}
            </div>
          )}

                </>
              )}

              {currentStep === 2 && (
                <div>
                  <h2 className="text-2xl font-semibold">Personal Data</h2>
                  <label>
                    Title:
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.professionalData.jobTitle}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    First Name:
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.professionalData.jobTitle}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Last Name:
                    <input
                      type="text"
                      name="company"
                      value={formData.professionalData.company}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    RSA ID Number:
                    <input
                      type="text"
                      name="company"
                      value={formData.professionalData.company}
                      onChange={handleChange}
                    />
                  </label>

                  <label>
                    Email:
                    <input
                      type="email"
                      name="experience"
                      value={formData.professionalData.experience}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Phone Number:
                    <input
                      type="text"
                      name="experience"
                      value={formData.professionalData.experience}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Address:
                    <textarea
                      name="experience"
                      value={formData.professionalData.experience}
                    />
                  </label>

                  <label>
                    City :
                    <input
                      type="text"
                      name="company"
                      value={formData.professionalData.company}
                      onChange={handleChange}
                    />
                  </label>

                  <label>
                    Province:
                    <input
                      type="text"
                      name="company"
                      value={formData.professionalData.company}
                      onChange={handleChange}
                    />
                  </label>

                  <label>
                    Postal Code:
                    <input
                      type="text"
                      name="company"
                      value={formData.professionalData.company}
                      onChange={handleChange}
                    />
                  </label>


                </div>
              )}

              {currentStep === 3 && (
                <div>
                  <h2 className="text-2xl font-semibold">Professional Data</h2>
                  <label>
                    Company Name:
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.professionalData.jobTitle}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Company Registration Number:
                    <input
                      type="text"
                      name="company"
                      value={formData.professionalData.company}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Area of Operation:
                    <input
                      type="text"
                      name="experience"
                      value={formData.professionalData.experience}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              )}

              {currentStep === 4 && (
                <div>
                  <h2>Upload Documents</h2>
                  <label>
                    Upload Documents:
                    <input
                      type="text"
                      name="experience"
                      value={formData.professionalData.experience}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              )}

            </>
              <div >
                {currentStep > 1 && (
                  <button
                    className="py-2 px-4 border rounded-xl bg-gray-500 text-white"
                    type="button"
                    onClick={handlePrevious}
                  >
                    Previous
                  </button>
                )}
                {currentStep < 4 ? (
                  <button
                    className="py-2 px-4 border rounded-xl bg-green-500 text-white"
                    type="button"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    className="py-2 px-4 border rounded-xl bg-blue-500 text-white"
                    type="submit"
                  >
                    Submit
                  </button>
                )}
              </div>
          </form>
        </div>
      </div>
    </div>
  );
}
