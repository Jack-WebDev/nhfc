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
import Criteria from "./_components/Criteria";
import FormUse from "./_components/FormUse";
import axios, { AxiosError } from "axios";

export default function ApplicationProcess() {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    personalData: {
      idNumber: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      gender: "",
      race: "",
    },
    addressData: {
      address: "",
      suburb: "",
      city: "",
      province: "",
      postalCode: "",
    },
    supportData: {
      supportType: "",
      province: "",
      municipalityMetro: "",
      projectName: "",
      product: "",
    },
    qualificationData: {
      isCitizenOrResident: "",
      isOver18: "",
      isFirstTimeBuyer: "",
      hasDependents: "",
      monthlyIncomeApplicant: "",
      monthlyIncomeSpouse: "",
      combinedMonthlyIncome: "",
    },
    dependentsData: {
      femaleChildrenUnder18: "",
      maleChildrenUnder18: "",
      femaleChildren18To24: "",
      maleChildren18To24: "",
      otherDependents: "",
    },
    currentEmployerData: {
      companyName: "",
      address: "",
      suburb: "",
      city: "",
      province: "",
      postalCode: "",
      employmentDate: "",
      contactPersonName: "",
      contactPersonPhone: "",
      contactPersonEmail: "",
    },
    previousEmploymentData: {
      companyName: "",
      address: "",
      suburb: "",
      city: "",
      province: "",
      postalCode: "",
      employmentStartDate: "",
      employmentEndDate: "",
      termsAgreement: "",
    },
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const stepDataKey = getStepDataKey(currentStep) as keyof typeof formData; // Assuming formData is your form data state
    setFormData((prevFormData) => ({
      ...prevFormData,
      [stepDataKey]: {
        ...prevFormData[stepDataKey],
        [name as keyof (typeof prevFormData)[typeof stepDataKey]]: value, // Type assertion here
      },
    }));
  };

  const getStepDataKey = (step: any) => {
    switch (step) {
      case 1:
        return "personalData";
      case 2:
        return "addressData";
      case 3:
        return "supportData";
      case 4:
        return "qualificationData";
      case 5:
        return "dependentsData";
      case 6:
        return "currentEmployerData";
      case 7:
        return "previousEmploymentData";
      case 8:
        return "termsAgreement";

      default:
        return "personalData";
    }
  };

  const handleNext = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 8));
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    try {
      const res = await axios.post("/api/applications/first-home", {
        ...formData,
      });
      console.log(res);
    } catch (error) {
      console.log(error as AxiosError);
    }
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
                  How to apply for a finance
                </h2>

                <ol className="list-decimal list-inside">
                  <li>Select the finance to apply for</li>
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
          <form
            onSubmit={handleSubmit}
            className="grid bg-white p-8 rounded-xl min-h-full"
          >
            <div className="flex items-center justify-evenly ">
              <Image src={"/s-logo.png"} alt="" width={150} height={150} />{" "}
              <div className="grid">
                <h2 className="text-3xl font-semibold text-blue-500">
                  Finance Application
                </h2>
                <p className="text-sm text-gray-500">
                  Easy steps to go through the application form. Please ensure
                  that you have all the required documents ready.
                </p>
              </div>
            </div>
            <>
              <fieldset className="grid grid-cols-4 items-center gap-4">
                <legend>Is your finance application for? *</legend>

                <div>
                  <label className="flex items-center gap-x-2">
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
                  <label className="flex items-center gap-x-2">
                    <input
                      type="radio"
                      value="Incremental Housing Finance"
                      checked={selectedOption === "Incremental Housing Finance"}
                      onChange={handleOptionChange}
                    />
                    Incremental Housing Finance
                  </label>
                </div>

                <div>
                  <label className="flex items-center gap-x-2">
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
                  <label className="flex items-center gap-x-2">
                    <input
                      type="radio"
                      value="Affordable Housing Bridging Finance"
                      checked={
                        selectedOption === "Affordable Housing Bridging Finance"
                      }
                      onChange={handleOptionChange}
                    />
                    Affordable Housing Bridging Finance
                  </label>
                </div>

                <div>
                  <label className="flex items-center gap-x-2">
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
                  <label className="flex items-center gap-x-2">
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
                  <label className="flex items-center gap-x-2">
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
                  <label className="flex items-center gap-x-2">
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
                    <div>
                      <Criteria
                        items={[
                          "The borrowing entity must be a registered legal entity or a Non-Profit Company (NPC) and accredited SHI or ODA",
                          "The SHI or ODA must be allocated a CCG",
                          "The project feasability must be financially viable per NHFC criteria.",
                        ]}
                        itemsPerGroup={2}
                      />

                      <h2>Apply Here:</h2>
                      <FormUse selectedOption={selectedOption} />
                    </div>
                  )}
                  {selectedOption === "Incremental Housing Finance" && (
                    <>
                      <Criteria
                        items={[
                          "The borrowing entity, whether commercial Micro-Finance Intermediary or Community Based Organisation such as Co-operative Financial Institution or Cooperative, must be a registered legal entity",
                          "Registered as a credit provider with the National Credit Regulator and willing to supplementary register as a developmental credit provider",
                          "The MFI must be willing and able to lend in line with the core NHFC mandate",
                          "Cashflow projections must be financially viable per NHFC criteria",
                          "Equity contribution is required and is determined on a case by case basis to enable acceptable gearing levels.",
                        ]}
                        itemsPerGroup={2}
                      />
                      <h2>Apply Here:</h2>
                      <FormUse selectedOption={selectedOption} />
                    </>
                  )}
                  {selectedOption === "Contract Bridging Finance" && (
                    <div>
                      <Criteria
                        items={[
                          "Borrowing entity must be a registered legal entity",
                          "The contractor must be awarded a construction contract from Governmental Department (National, Provincial or Local) or the private sector",
                          "Must be registered with the NHBRC and have a CIDB grading and",
                          "The project feasibility must be financially viable per NHFC criteria",
                          "Equity contribution is required and is determined on a case by case basis to enable acceptable gearing levels.",
                        ]}
                        itemsPerGroup={2}
                      />
                      <h2>Apply Here:</h2>
                      <FormUse selectedOption={selectedOption} />
                    </div>
                  )}
                  {selectedOption === "Affordable Housing Bridging Finance" && (
                    <div>
                      <Criteria
                        items={[
                          "Borrowing entity must be a registered legal entity",
                          "Equity contribution is required and is determined on a case-by-case basis to enable acceptable gearing levels",
                          "The MFI must be willing and able to lend in line with the core NHFC mandate",
                          "The project feasability must be financially viable per NHFC criteria.",
                          "The proposed development must address core NHFC mandate and",
                        ]}
                        itemsPerGroup={2}
                      />
                      <h2>Apply Here:</h2>
                      <FormUse selectedOption={selectedOption} />
                    </div>
                  )}
                  {selectedOption === "Private Rental Housing Finance" && (
                    <div>
                      {" "}
                      <Criteria
                        items={[
                          "The borrowing entity must be a registered legal entity",
                          "The project feasability must be financially viable per NHFC criteria.",
                          "The proposed development must address core NHFC mandate and",
                          "Equity contribution is required and is determined on a case-by-case basis to enable acceptable gearing levels",
                        ]}
                        itemsPerGroup={2}
                      />
                      <h2>Apply Here:</h2>
                      <FormUse selectedOption={selectedOption} />
                    </div>
                  )}
                  {selectedOption === "Programme And Fund Management" && (
                    <div>
                      <Criteria
                        items={[
                          "The client or partner looking for support should be keen to consider alternative approaches of planning and executing the programme e.g. unbundling of the programme to optimise appointment of small contractors and localisation of suppliers",
                          "There are multiple aspects of support, like appropriate procurement strategies suitable for small contractors, on-site and off-site support, contractor training and working capital financing solutions, and ease access to building materials",
                          "Multi-year programmes are preferred as it gives small contractors (CIDB 1-3) an opportunity to gain experience, assimilate good business practices and acquire higher CIDB grades",
                          "Timeous payment to small contractors is key, and therefore the client should be willing to transfer the capital budget to NHFC that is managed through a dedicated account and with approvals secured from the National Treasury",
                          "NHFC provides the service at a fee, using the National Treasure guidelines",
                          "NHFC is willing to submit unsolicited proposals well as respond to invitation",
                          "The project feasability must be financially viable per NHFC criteria.",
                        ]}
                        itemsPerGroup={2}
                      />
                      <h2>Apply Here:</h2>
                      <FormUse selectedOption={selectedOption} />
                    </div>
                  )}
                  {selectedOption === "Equity Finance" && (
                    <div>
                      <Criteria
                        items={[
                          "The applicant must be a registered legal entity and preference will be on supporting BEE rated companies led by youth and women (BEE Level 4 score or better)",
                          "There must be a demonstrable market opportunity aligned with the NHFC mandate",
                          "A financial co-partnership arrangement must be demonstrated through the project sponsor contributing material risk capital to the project/venture",
                          "The project feasibility must be financially viable per NHFC criteria.",
                        ]}
                        itemsPerGroup={2}
                      />
                      <h2>Apply Here:</h2>
                      <FormUse selectedOption={selectedOption} />
                    </div>
                  )}
                  {selectedOption === "First Home Finance" && (
                    <div>
                      {currentStep === 1 && (
                        <div className="bg-green-400">
                          <h2 className="text-2xl font-semibold">
                            Applicant Identification
                          </h2>
                          <label>
                            RSA ID Number:
                            <input
                              type="text"
                              name="idNumber"
                              value={formData.personalData.idNumber}
                              onChange={handleChange}
                            />
                          </label>
                          <label>
                            First Name:
                            <input
                              type="text"
                              name="firstName"
                              value={formData.personalData.firstName}
                              onChange={handleChange}
                            />
                          </label>
                          <label>
                            Last Name:
                            <input
                              type="text"
                              name="lastName"
                              value={formData.personalData.lastName}
                              onChange={handleChange}
                            />
                          </label>
                          <label>
                            Email:
                            <input
                              type="email"
                              name="email"
                              value={formData.personalData.email}
                              onChange={handleChange}
                            />
                          </label>
                          <label>
                            Phone Number:
                            <input
                              type="text"
                              name="phoneNumber"
                              value={formData.personalData.phoneNumber}
                              onChange={handleChange}
                            />
                          </label>
                          <label>
                            Gender:
                            <select
                              name="gender"
                              value={formData.personalData.gender}
                              onChange={handleChange}
                            >
                              <option value="">Select Gender</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                            </select>
                          </label>

                          <label>
                            Race:
                            <select
                              name="race"
                              value={formData.personalData.race}
                              onChange={handleChange}
                            >
                              <option value="">Select Race</option>
                              <option value="asian">Asian</option>
                              <option value="black">Black</option>
                              <option value="white">White</option>
                              <option value="indian">Indian</option>
                              <option value="coloured">Coloured</option>
                            </select>
                          </label>
                        </div>
                      )}

                      {currentStep === 2 && (
                        <div>
                          <h2 className="text-2xl font-semibold">
                            Current Physical Address
                          </h2>
                          <label>
                            Address:
                            <textarea
                              name="address"
                              value={formData.addressData.address}
                              onChange={handleChange}
                            />
                          </label>
                          <label>
                            Suburb:
                            <input
                              type="text"
                              name="suburb"
                              value={formData.addressData.suburb}
                              onChange={handleChange}
                            />
                          </label>
                          <label>
                            City:
                            <input
                              type="text"
                              name="city"
                              value={formData.addressData.city}
                              onChange={handleChange}
                            />
                          </label>
                          <label>
                            Province:
                            <select
                              name="province"
                              value={formData.addressData.province}
                              onChange={handleChange}
                            >
                              <option value="">Select Province</option>
                              <option value="easternCape">Eastern Cape</option>
                              <option value="freeState">Free State</option>
                              <option value="gauteng">Gauteng</option>
                              <option value="kwazuluNatal">
                                KwaZulu-Natal
                              </option>
                              <option value="limpopo">Limpopo</option>
                              <option value="mpumalanga">Mpumalanga</option>
                              <option value="northWest">North West</option>
                              <option value="northernCape">
                                Northern Cape
                              </option>
                              <option value="westernCape">Western Cape</option>
                            </select>
                          </label>

                          <label>
                            Postal Code:
                            <input
                              type="text"
                              name="postalCode"
                              value={formData.addressData.postalCode}
                              onChange={handleChange}
                            />
                          </label>
                        </div>
                      )}

                      {currentStep === 3 && (
                        <div>
                          <h2>Support Type, Project and Product</h2>
                          <label>
                            Support Type:
                            <select
                              name="supportType"
                              value={formData.supportData.supportType}
                              onChange={handleChange}
                            >
                              <option value="">Select Support Type</option>
                              <option value="socialHousing">
                                Social Housing
                              </option>
                              <option value="affordableHousing">
                                Affordable Housing
                              </option>
                              <option value="rentalHousing">
                                Rental Housing
                              </option>
                              <option value="gapHousing">GAP Housing</option>
                            </select>
                          </label>

                          <label>
                            Province:
                            <select
                              name="province"
                              value={formData.supportData.province}
                              onChange={handleChange}
                            >
                              <option value="">Select Province</option>
                              <option value="easternCape">Eastern Cape</option>
                              <option value="freeState">Free State</option>
                              <option value="gauteng">Gauteng</option>
                              <option value="kwazuluNatal">
                                KwaZulu-Natal
                              </option>
                              <option value="limpopo">Limpopo</option>
                              <option value="mpumalanga">Mpumalanga</option>
                              <option value="northWest">North West</option>
                              <option value="northernCape">
                                Northern Cape
                              </option>
                              <option value="westernCape">Western Cape</option>
                            </select>
                          </label>
                          <label>
                            Municipality/ Metro:
                            <select
                              name="municipalityMetro"
                              value={formData.supportData.municipalityMetro}
                              onChange={handleChange}
                            >
                              <option value="">
                                Select Municipality/ Metro
                              </option>
                              <option value="buffaloCity">Buffalo City</option>
                              <option value="nelsonMandelaBay">
                                Nelson Mandela Bay
                              </option>
                              <option value="orTambo">OR Tambo</option>
                              <option value="chrisHani">Chris Hani</option>
                              <option value="amathole">Amathole</option>
                              <option value="joeGqabi">Joe Gqabi</option>
                              <option value="alfredNzo">Alfred Nzo</option>
                              <option value="sarahBaartman">
                                Sarah Baartman
                              </option>
                              <option value="mangaung">Mangaung</option>
                              <option value="fezileDabi">Fezile Dabi</option>
                              <option value="lejweleputswa">
                                Lejweleputswa
                              </option>
                              <option value="thaboMofutsanyana">
                                Thabo Mofutsanyana
                              </option>
                              <option value="xhariep">Xhariep</option>
                              <option value="cityOfJohannesburg">
                                City of Johannesburg
                              </option>
                              <option value="cityOfTshwane">
                                City of Tshwane
                              </option>
                              <option value="ekurhuleni">Ekurhuleni</option>
                              <option value="sedibeng">Sedibeng</option>
                              <option value="westRand">West Rand</option>
                              <option value="ethekwini">eThekwini</option>
                              <option value="umgungundlovu">
                                uMgungundlovu
                              </option>
                            </select>
                          </label>

                          <label>
                            Project Name:
                            <select
                              name="projectName"
                              value={formData.supportData.projectName}
                              onChange={handleChange}
                            >
                              <option value="">Select Project</option>
                              <option value="fleurhofIntegratedHousingDevelopment">
                                Fleurhof Integrated Housing Development
                              </option>
                              <option value="belharSocialHousingProject">
                                Belhar Social Housing Project
                              </option>
                              <option value="westgateSocialHousingProject">
                                Westgate Social Housing Project
                              </option>
                              <option value="devlandGardens">
                                Devland Gardens
                              </option>
                              <option value="southernwoodSquare">
                                Southernwood Square
                              </option>
                              <option value="thembelihleVillage">
                                Thembelihle Village
                              </option>
                            </select>
                          </label>

                          <label>
                            Product:
                            <input
                              type="text"
                              name="product"
                              value={formData.supportData.product}
                              onChange={handleChange}
                            />
                          </label>
                        </div>
                      )}

                      {currentStep === 4 && (
                        <div>
                          <h2>Qualification</h2>
                          <label>
                            I am a South African citizen or Resident:
                            <select
                              name="isCitizenOrResident"
                              value={
                                formData.qualificationData.isCitizenOrResident
                              }
                              onChange={handleChange}
                            >
                              <option value="">
                                Select Citizen or Resident
                              </option>
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </select>
                          </label>
                          <label>
                            I am over 18 years old:
                            <select
                              name="isOver18"
                              value={formData.qualificationData.isOver18}
                              onChange={handleChange}
                            >
                              <option value="">Are you Over 18</option>
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </select>
                          </label>
                          <label>
                            I am a first-time buyer:
                            <select
                              name="isFirstTimeBuyer"
                              value={
                                formData.qualificationData.isFirstTimeBuyer
                              }
                              onChange={handleChange}
                            >
                              <option value="">
                                Are you a First Time Buyer
                              </option>
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </select>
                          </label>
                          <label>
                            I have dependants that live with me:
                            <select
                              name="hasDependents"
                              value={formData.qualificationData.hasDependents}
                              onChange={handleChange}
                            >
                              <option value="">Do you have Dependants</option>
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </select>
                          </label>
                          <label>
                            Monthly Income Applicant:
                            <input
                              type="text"
                              name="monthlyIncomeApplicant"
                              value={
                                formData.qualificationData
                                  .monthlyIncomeApplicant
                              }
                              onChange={handleChange}
                            />
                          </label>
                          <label>
                            Monthly Income Spouse:
                            <input
                              type="text"
                              name="monthlyIncomeSpouse"
                              value={
                                formData.qualificationData.monthlyIncomeSpouse
                              }
                              onChange={handleChange}
                            />
                          </label>
                          <label>
                            Combined Monthly Household Income (between R6000 -
                            R12000):
                            <input
                              type="text"
                              name="combinedMonthlyIncome"
                              value={
                                formData.qualificationData.combinedMonthlyIncome
                              }
                              onChange={handleChange}
                            />
                          </label>
                        </div>
                      )}
                      {currentStep === 5 && (
                        <div>
                          <h2>Dependants Living With Applicant</h2>
                          <label>
                            No. of Female Children Under 18:
                            <input
                              type="text"
                              name="femaleChildrenUnder18"
                              value={
                                formData.dependentsData.femaleChildrenUnder18
                              }
                              onChange={handleChange}
                            />
                          </label>
                          <label>
                            No. of Male Children Under 18:
                            <input
                              type="text"
                              name="maleChildrenUnder18"
                              value={
                                formData.dependentsData.maleChildrenUnder18
                              }
                              onChange={handleChange}
                            />
                          </label>
                          <label>
                            No. of Female Children Between 18 and 24:
                            <input
                              type="text"
                              name="femaleChildren18To24"
                              value={
                                formData.dependentsData.femaleChildren18To24
                              }
                              onChange={handleChange}
                            />
                          </label>
                          <label>
                            No. of Male Children Between 18 and 24:
                            <input
                              type="text"
                              name="maleChildren18To24"
                              value={formData.dependentsData.maleChildren18To24}
                              onChange={handleChange}
                            />
                          </label>
                          <label>
                            Other (Including Spouse):
                            <input
                              type="text"
                              name="otherDependents"
                              value={formData.dependentsData.otherDependents}
                              onChange={handleChange}
                            />
                          </label>
                        </div>
                      )}
                      {currentStep === 6 && (
                        <div>
                          <h2>Applicant Current Employer</h2>
                          <label>
                            Company Name:
                            <input
                              type="text"
                              name="companyName"
                              value={formData.currentEmployerData.companyName}
                              onChange={handleChange}
                            />
                          </label>
                          <label>
                            Address:
                            <textarea
                              name="address"
                              value={formData.currentEmployerData.address}
                              onChange={handleChange}
                            />
                          </label>
                          <label>
                            Suburb:
                            <input
                              type="text"
                              name="suburb"
                              value={formData.currentEmployerData.suburb}
                              onChange={handleChange}
                            />
                          </label>
                          <label>
                            City:
                            <input
                              type="text"
                              name="city"
                              value={formData.currentEmployerData.city}
                              onChange={handleChange}
                            />
                          </label>
                          <label>
                            Province:
                            <select
                              name="province"
                              value={formData.currentEmployerData.province}
                              onChange={handleChange}
                            >
                              <option value="">Select Province</option>
                              <option value="easternCape">Eastern Cape</option>
                              <option value="freeState">Free State</option>
                              <option value="gauteng">Gauteng</option>
                              <option value="kwazuluNatal">
                                KwaZulu-Natal
                              </option>
                              <option value="limpopo">Limpopo</option>
                              <option value="mpumalanga">Mpumalanga</option>
                              <option value="northWest">North West</option>
                              <option value="northernCape">
                                Northern Cape
                              </option>
                              <option value="westernCape">Western Cape</option>
                            </select>
                          </label>
                          <label>
                            Postal Code:
                            <input
                              type="text"
                              name="postalCode"
                              value={formData.currentEmployerData.postalCode}
                              onChange={handleChange}
                            />
                          </label>
                          <label>
                            Employment Date:
                            <input
                              type="text"
                              name="employmentDate"
                              value={
                                formData.currentEmployerData.employmentDate
                              }
                              onChange={handleChange}
                            />
                          </label>
                          <label>
                            Contact Person Name:
                            <input
                              type="text"
                              name="contactPersonName"
                              value={
                                formData.currentEmployerData.contactPersonName
                              }
                              onChange={handleChange}
                            />
                          </label>
                          <label>
                            Contact Person Phone:
                            <input
                              type="text"
                              name="contactPersonPhone"
                              value={
                                formData.currentEmployerData.contactPersonPhone
                              }
                              onChange={handleChange}
                            />
                          </label>
                          <label>
                            Contact Person Email:
                            <input
                              type="text"
                              name="contactPersonEmail"
                              value={
                                formData.currentEmployerData.contactPersonEmail
                              }
                              onChange={handleChange}
                            />
                          </label>
                        </div>
                      )}
                      {currentStep === 7 && (
                        <div className="flex flex-col gap-4">

                          <div>
                            <h2>Previous Employment</h2>
                            <label>
                              Company Name:
                              <input
                                type="text"
                                name="companyName"
                                value={
                                  formData.previousEmploymentData.companyName
                                }
                                onChange={handleChange}
                              />
                            </label>
                            <label>
                              Address:
                              <textarea
                                name="address"
                                value={formData.previousEmploymentData.address}
                                onChange={handleChange}
                              />
                            </label>
                            <label>
                              Suburb:
                              <input
                                type="text"
                                name="suburb"
                                value={formData.previousEmploymentData.suburb}
                                onChange={handleChange}
                              />
                            </label>
                            <label>
                              City:
                              <input
                                type="text"
                                name="city"
                                value={formData.previousEmploymentData.city}
                                onChange={handleChange}
                              />
                            </label>
                            <label>
                              Province:
                              <select
                                name="province"
                                value={formData.previousEmploymentData.province}
                                onChange={handleChange}
                              >
                                <option value="">Select Province</option>
                                <option value="easternCape">Eastern Cape</option>
                                <option value="freeState">Free State</option>
                                <option value="gauteng">Gauteng</option>
                                <option value="kwazuluNatal">
                                  KwaZulu-Natal
                                </option>
                                <option value="limpopo">Limpopo</option>
                                <option value="mpumalanga">Mpumalanga</option>
                                <option value="northWest">North West</option>
                                <option value="northernCape">
                                  Northern Cape
                                </option>
                                <option value="westernCape">Western Cape</option>
                              </select>
                            </label>
                            <label>
                              Postal Code:
                              <input
                                type="text"
                                name="postalCode"
                                value={formData.previousEmploymentData.postalCode}
                                onChange={handleChange}
                              />
                            </label>
                            <label>
                              Employment Start Date:
                              <input
                                type="text"
                                name="employmentStartDate"
                                value={
                                  formData.previousEmploymentData
                                    .employmentStartDate
                                }
                                onChange={handleChange}
                              />
                            </label>
                            <label>
                              Employment End Date:
                              <input
                                type="text"
                                name="employmentEndDate"
                                value={
                                  formData.previousEmploymentData
                                    .employmentEndDate
                                }
                                onChange={handleChange}
                              />
                            </label>
                            <label>
                              Terms and Conditions:
                              <select
                                name="termsAgreement"
                                value={
                                  formData.previousEmploymentData.termsAgreement
                                }
                                onChange={handleChange}
                              >
                                <option value="">Do you agree with our terms and conditions</option>
                                <option value="agree">Agree</option>
                                <option value="disagree">Disagree</option>
                              </select>
                            </label>
  
                          </div>
                            <button type="submit" className="bg-blue-500 text-white rounded-xl py-2 px-4 mb-8">Submit</button>
                        </div>
                      )}
                      {currentStep === 8 && (
                        <h2>Thank you for applying for a first home loan</h2>
                      )}

                      <div>
                        {currentStep > 1 && (
                          <button
                            className="py-2 px-4 border rounded-xl bg-gray-500 text-white"
                            type="button"
                            onClick={handlePrevious}
                          >
                            Previous
                          </button>
                        )}
                        {currentStep < 7 && (
                          <button
                            className="py-2 px-4 border rounded-xl bg-green-500 text-white"
                            type="button"
                            onClick={handleNext}
                          >
                            Next
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          </form>
        </div>
      </div>
    </div>
  );
}
