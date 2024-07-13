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
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function ApplicationProcess() {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const router = useRouter();

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
      contactPersonName: "",
      contactPersonPhone: "",
      contactPersonEmail: "",
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
    console.log("Form submitted:", { ...formData, loanType: selectedOption });
    try {
      const res = await axios.post("/api/applications/first-home", {
        ...formData,
      });
      toast.success("Application Submitted Successfully");
      router.push("/frontend/applications");
      console.log(res);
    } catch (error) {
      console.log(error as AxiosError);
    }
  };
  return (
    <div>
      <ArrowLeft
        onClick={() => router.back()}
        className="cursor-pointer mb-12"
      />

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
                    NHFC Investment
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

                      <h2 className="text-2xl font-semibold my-4 text-center text-blue-500">
                        Apply Here:
                      </h2>

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
                      <h2 className="text-2xl font-semibold my-4 text-center text-blue-500">
                        Apply Here:
                      </h2>
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
                      <h2 className="text-2xl font-semibold my-4 text-center text-blue-500">
                        Apply Here:
                      </h2>
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
                      <h2 className="text-2xl font-semibold my-4 text-center text-blue-500">
                        Apply Here:
                      </h2>
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
                      <h2 className="text-2xl font-semibold my-4 text-center text-blue-500">
                        Apply Here:
                      </h2>
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
                      <h2 className="text-2xl font-semibold my-4 text-center text-blue-500">
                        Apply Here:
                      </h2>
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
                      <h2 className="text-2xl font-semibold my-4 text-center text-blue-500">
                        Apply Here:
                      </h2>
                      <FormUse selectedOption={selectedOption} />
                    </div>
                  )}
                  {selectedOption === "First Home Finance" && (
                    <div className="grid">
                      {currentStep === 1 && (
                        <div className="p-6 bg-white rounded-lg shadow-md">
                          <h2 className="text-2xl font-semibold mb-4">
                            Applicant Identification
                          </h2>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <label className="block">
                              <span className="text-gray-700">
                                RSA ID Number:
                              </span>
                              <input
                                type="text"
                                name="idNumber"
                                placeholder="Enter your RSA ID Number"
                                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={formData.personalData.idNumber}
                                onChange={handleChange}
                              />
                            </label>
                            <label className="block">
                              <span className="text-gray-700">First Name:</span>
                              <input
                                type="text"
                                name="firstName"
                                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={formData.personalData.firstName}
                                onChange={handleChange}
                                placeholder="Enter your First Name"
                              />
                            </label>
                            <label className="block">
                              <span className="text-gray-700">Last Name:</span>
                              <input
                                type="text"
                                name="lastName"
                                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={formData.personalData.lastName}
                                onChange={handleChange}
                                placeholder="Enter your Last Name"
                              />
                            </label>
                            <label className="block">
                              <span className="text-gray-700">Email:</span>
                              <input
                                type="email"
                                name="email"
                                placeholder="Enter your Email"
                                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={formData.personalData.email}
                                onChange={handleChange}
                              />
                            </label>
                            <label className="block">
                              <span className="text-gray-700">
                                Phone Number:
                              </span>
                              <input
                                type="text"
                                name="phoneNumber"
                                placeholder="Enter your Phone Number"
                                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={formData.personalData.phoneNumber}
                                onChange={handleChange}
                              />
                            </label>
                            <label className="block">
                              <span className="text-gray-700">Gender:</span>
                              <select
                                name="gender"
                                value={formData.personalData.gender}
                                onChange={handleChange}
                                className="border border-gray-500 rounded-lg p-1 bg-white"
                              >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Non-Binary">Non-Binary</option>
                              </select>
                            </label>
                            <label className="block">
                              <span className="text-gray-700">Race:</span>

                              <select
                                name="race"
                                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={formData.personalData.race}
                                onChange={handleChange}
                              >
                                <option value="" disabled>
                                  Select your Race
                                </option>
                                <option value="black">Black</option>
                                <option value="white">White</option>
                                <option value="asian">Asian</option>
                                <option value="colored">Colored</option>
                                <option value="other">Other</option>
                              </select>
                            </label>
                          </div>
                        </div>
                      )}

                      {currentStep === 2 && (
                        <div className="p-6 bg-white rounded-lg shadow-md">
                          <h2 className="text-2xl font-semibold mb-6">
                            Current Physical Address
                          </h2>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <label className="block col-span-2">
                              <span className="text-gray-700">Address:</span>
                              <textarea
                                name="address"
                                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={formData.addressData.address}
                                onChange={handleChange}
                                placeholder="Enter your Address"
                              />
                            </label>
                            <label className="block">
                              <span className="text-gray-700">Suburb:</span>
                              <input
                                type="text"
                                name="suburb"
                                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={formData.addressData.suburb}
                                placeholder="Enter your Suburb"
                                onChange={handleChange}
                              />
                            </label>
                            <label className="block">
                              <span className="text-gray-700">City:</span>
                              <input
                                type="text"
                                name="city"
                                placeholder="Enter your City"
                                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={formData.addressData.city}
                                onChange={handleChange}
                              />
                            </label>
                            <label className="block">
                              <span className="text-gray-700">Province:</span>

                              <select
                                name="province"
                                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={formData.addressData.province}
                                onChange={handleChange}
                              >
                                <option value="" disabled>
                                  Select your Province
                                </option>
                                <option value="Gauteng">Gauteng</option>
                                <option value="Western Cape">
                                  Western Cape
                                </option>
                                <option value="KwaZulu-Natal">
                                  KwaZulu-Natal
                                </option>
                                <option value="Eastern Cape">
                                  Eastern Cape
                                </option>
                                <option value="Free State">Free State</option>
                                <option value="Limpopo">Limpopo</option>
                                <option value="Mpumalanga">Mpumalanga</option>
                                <option value="North West">North West</option>
                                <option value="Northern Cape">
                                  Northern Cape
                                </option>
                              </select>
                            </label>
                            <label className="block">
                              <span className="text-gray-700">
                                Postal Code:
                              </span>
                              <input
                                type="text"
                                name="postalCode"
                                placeholder="Enter your Postal Code"
                                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={formData.addressData.postalCode}
                                onChange={handleChange}
                              />
                            </label>
                          </div>
                        </div>
                      )}

                      {currentStep === 3 && (
                        <div className="grid grid-cols-2 gap-y-2">
                          <h2>First Home Finance, Project and Typology</h2>
                          <label>
                            First Home Finance
                            <select
                              name="supportType"
                              value={formData.supportData.supportType}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                              <option value="">
                                Select First Home Finance Type
                              </option>
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
                              className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                              className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                              className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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

                          <label className="block">
                            <span>Typology:</span>

                            <select
                              name="product"
                              className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              value={formData.supportData.product}
                              onChange={handleChange}
                              
                            >
                              <option value="" disabled>
                                Select Typology
                              </option>
                              <option value="Housing Finance - 2 Bedroom">
                                Housing Finance - 2 Bedroom
                              </option>
                              <option value="Housing Finance - 3 Bedroom">
                                Housing Finance - 3 Bedroom
                              </option>
                              <option value="Housing Finance - 4 Bedroom">
                                Housing Finance - 4 Bedroom
                              </option>
                            </select>
                          </label>
                        </div>
                      )}

                      {currentStep === 4 && (
                        <div className="p-6 bg-white rounded-lg shadow-md">
                          <h2 className="text-2xl font-semibold mb-4">
                            Qualification
                          </h2>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <label className="block col-span-2">
                              <span className="text-gray-700">
                                I am a South African citizen or Resident:
                              </span>
                              <select
                                name="isCitizenOrResident"
                                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={
                                  formData.qualificationData.isCitizenOrResident
                                }
                                onChange={handleChange}
                              >
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                              </select>
                            </label>
                            <label className="block">
                              <span className="text-gray-700">
                                I am over 18 years old:
                              </span>
                              <select
                                name="isOver18"
                                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={formData.qualificationData.isOver18}
                                onChange={handleChange}
                              >
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                              </select>
                            </label>
                            <label className="block">
                              <span className="text-gray-700">
                                I am a first-time buyer:
                              </span>
                              <select
                                name="isFirstTimeBuyer"
                                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={
                                  formData.qualificationData.isFirstTimeBuyer
                                }
                                onChange={handleChange}
                              >
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                              </select>
                            </label>
                            <label className="block col-span-2">
                              <span className="text-gray-700">
                                I have dependants that live with me:
                              </span>
                              <select
                                name="hasDependents"
                                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={formData.qualificationData.hasDependents}
                                onChange={handleChange}
                              >
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                              </select>
                            </label>
                            <label className="block">
                              <span className="text-gray-700">
                                Monthly Income Applicant:
                              </span>
                              <input
                                type="text"
                                name="monthlyIncomeApplicant"
                                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={
                                  formData.qualificationData
                                    .monthlyIncomeApplicant
                                }
                                onChange={handleChange}
                              />
                            </label>
                            <label className="block">
                              <span className="text-gray-700">
                                Monthly Income Spouse:
                              </span>
                              <input
                                type="text"
                                name="monthlyIncomeSpouse"
                                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={
                                  formData.qualificationData.monthlyIncomeSpouse
                                }
                                onChange={handleChange}
                              />
                            </label>
                            <label className="block col-span-2">
                              <span className="text-gray-700">
                                Combined Monthly Household Income (between R6000
                                - R12000):
                              </span>
                              <input
                                type="text"
                                name="combinedMonthlyIncome"
                                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={
                                  formData.qualificationData
                                    .combinedMonthlyIncome
                                }
                                onChange={handleChange}
                              />
                            </label>
                          </div>
                        </div>
                      )}

                      {currentStep === 5 && (
                        <div className="p-6 bg-white rounded-lg shadow-md">
                          <h2 className="text-2xl font-semibold mb-4">
                            Dependants Living With Applicant
                          </h2>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <label className="block">
                              <span className="text-gray-700">
                                No. of Female Children Under 18:
                              </span>
                              <input
                                type="text"
                                name="femaleChildrenUnder18"
                                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={
                                  formData.dependentsData.femaleChildrenUnder18
                                }
                                onChange={handleChange}
                              />
                            </label>
                            <label className="block">
                              <span className="text-gray-700">
                                No. of Male Children Under 18:
                              </span>
                              <input
                                type="text"
                                name="maleChildrenUnder18"
                                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={
                                  formData.dependentsData.maleChildrenUnder18
                                }
                                onChange={handleChange}
                              />
                            </label>
                            <label className="block">
                              <span className="text-gray-700">
                                No. of Female Children Between 18 and 24:
                              </span>
                              <input
                                type="text"
                                name="femaleChildren18To24"
                                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={
                                  formData.dependentsData.femaleChildren18To24
                                }
                                onChange={handleChange}
                              />
                            </label>
                            <label className="block">
                              <span className="text-gray-700">
                                No. of Male Children Between 18 and 24:
                              </span>
                              <input
                                type="text"
                                name="maleChildren18To24"
                                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={
                                  formData.dependentsData.maleChildren18To24
                                }
                                onChange={handleChange}
                              />
                            </label>
                            <label className="block col-span-2">
                              <span className="text-gray-700">
                                Other (Including Spouse):
                              </span>
                              <input
                                type="text"
                                name="otherDependents"
                                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={formData.dependentsData.otherDependents}
                                onChange={handleChange}
                              />
                            </label>
                          </div>
                        </div>
                      )}
                      {currentStep === 6 && (
                        <div className="p-6 bg-white rounded-lg shadow-md">
                          <h2 className="text-2xl font-semibold mb-4">
                            Applicant Current Employer
                          </h2>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <label className="block">
                              <span className="text-gray-700">
                                Company Name:
                              </span>
                              <input
                                type="text"
                                name="companyName"
                                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={formData.currentEmployerData.companyName}
                                onChange={handleChange}
                              />
                            </label>
                            <label className="block col-span-2">
                              <span className="text-gray-700">Address:</span>
                              <textarea
                                name="address"
                                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={formData.currentEmployerData.address}
                                onChange={handleChange}
                              />
                            </label>
                            <label className="block">
                              <span className="text-gray-700">Suburb:</span>
                              <input
                                type="text"
                                name="suburb"
                                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={formData.currentEmployerData.suburb}
                                onChange={handleChange}
                              />
                            </label>
                            <label className="block">
                              <span className="text-gray-700">City:</span>
                              <input
                                type="text"
                                name="city"
                                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={formData.currentEmployerData.city}
                                onChange={handleChange}
                              />
                            </label>
                            <label className="block">
                              <span className="text-gray-700">Province:</span>

                              <select
                                name="province"
                                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={formData.currentEmployerData.province}
                                onChange={handleChange}
                              >
                                <option value="" disabled>
                                  Select your Province
                                </option>
                                <option value="Gauteng">Gauteng</option>
                                <option value="Western Cape">
                                  Western Cape
                                </option>
                                <option value="KwaZulu-Natal">
                                  KwaZulu-Natal
                                </option>
                                <option value="Eastern Cape">
                                  Eastern Cape
                                </option>
                                <option value="Free State">Free State</option>
                                <option value="Limpopo">Limpopo</option>
                                <option value="Mpumalanga">Mpumalanga</option>
                                <option value="North West">North West</option>
                                <option value="Northern Cape">
                                  Northern Cape
                                </option>
                              </select>
                            </label>
                            <label className="block">
                              <span className="text-gray-700">
                                Postal Code:
                              </span>
                              <input
                                type="text"
                                name="postalCode"
                                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={formData.currentEmployerData.postalCode}
                                onChange={handleChange}
                              />
                            </label>
                            <label className="block">
                              <span className="text-gray-700">
                                Employment Date:
                              </span>
                              <input
                                type="text"
                                name="employmentDate"
                                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={
                                  formData.currentEmployerData.employmentDate
                                }
                                onChange={handleChange}
                              />
                            </label>
                            <label className="block">
                              <span className="text-gray-700">
                                Contact Person Name:
                              </span>
                              <input
                                type="text"
                                name="contactPersonName"
                                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={
                                  formData.currentEmployerData.contactPersonName
                                }
                                onChange={handleChange}
                              />
                            </label>
                            <label className="block col-span-2">
                              <span className="text-gray-700">
                                Contact Person Phone:
                              </span>
                              <input
                                type="text"
                                name="contactPersonPhone"
                                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={
                                  formData.currentEmployerData
                                    .contactPersonPhone
                                }
                                onChange={handleChange}
                              />
                            </label>
                            <label className="block col-span-2">
                              <span className="text-gray-700">
                                Contact Person Email:
                              </span>
                              <input
                                type="text"
                                name="contactPersonEmail"
                                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={
                                  formData.currentEmployerData
                                    .contactPersonEmail
                                }
                                onChange={handleChange}
                              />
                            </label>
                          </div>
                        </div>
                      )}
                      {currentStep === 7 && (
                        <div className="p-6 bg-white rounded-lg shadow-md">
                          <h2 className="text-2xl font-semibold mb-4">
                            Previous Employment
                          </h2>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <label className="block">
                              <span className="text-gray-700">
                                Company Name:
                              </span>
                              <input
                                type="text"
                                name="companyName"
                                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={
                                  formData.previousEmploymentData.companyName
                                }
                                onChange={handleChange}
                              />
                            </label>
                            <label className="block col-span-2">
                              <span className="text-gray-700">Address:</span>
                              <textarea
                                name="address"
                                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={formData.previousEmploymentData.address}
                                onChange={handleChange}
                              />
                            </label>
                            <label className="block">
                              <span className="text-gray-700">Suburb:</span>
                              <input
                                type="text"
                                name="suburb"
                                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={formData.previousEmploymentData.suburb}
                                onChange={handleChange}
                              />
                            </label>
                            <label className="block">
                              <span className="text-gray-700">City:</span>
                              <input
                                type="text"
                                name="city"
                                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={formData.previousEmploymentData.city}
                                onChange={handleChange}
                              />
                            </label>
                            <label className="block">
                              <span className="text-gray-700">Province:</span>

                              <select
                                name="province"
                                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={formData.previousEmploymentData.province}
                                onChange={handleChange}
                              >
                                <option value="" disabled>
                                  Select your Province
                                </option>
                                <option value="Gauteng">Gauteng</option>
                                <option value="Western Cape">
                                  Western Cape
                                </option>
                                <option value="KwaZulu-Natal">
                                  KwaZulu-Natal
                                </option>
                                <option value="Eastern Cape">
                                  Eastern Cape
                                </option>
                                <option value="Free State">Free State</option>
                                <option value="Limpopo">Limpopo</option>
                                <option value="Mpumalanga">Mpumalanga</option>
                                <option value="North West">North West</option>
                                <option value="Northern Cape">
                                  Northern Cape
                                </option>
                              </select>
                            </label>

                            <label className="block">
                              <span className="text-gray-700">
                                Contact Person Name:
                              </span>
                              <input
                                type="text"
                                name="contactPersonName"
                                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={
                                  formData.previousEmploymentData
                                    .contactPersonName
                                }
                                onChange={handleChange}
                              />
                            </label>
                            <label className="block">
                              <span className="text-gray-700">
                                Contact Person Phone:
                              </span>
                              <input
                                type="text"
                                name="contactPersonPhone"
                                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={
                                  formData.previousEmploymentData
                                    .contactPersonPhone
                                }
                                onChange={handleChange}
                              />
                            </label>
                            <label className="block">
                              <span className="text-gray-700">
                                Contact Person Email:
                              </span>
                              <input
                                type="text"
                                name="contactPersonEmail"
                                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={
                                  formData.previousEmploymentData
                                    .contactPersonEmail
                                }
                                onChange={handleChange}
                              />
                            </label>

                            <label className="block">
                              <span className="text-gray-700">
                                Postal Code:
                              </span>
                              <input
                                type="text"
                                name="postalCode"
                                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={
                                  formData.previousEmploymentData.postalCode
                                }
                                onChange={handleChange}
                              />
                            </label>
                            <label className="block">
                              <span className="text-gray-700">
                                Employment Start Date:
                              </span>
                              <input
                                type="text"
                                name="employmentStartDate"
                                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={
                                  formData.previousEmploymentData
                                    .employmentStartDate
                                }
                                onChange={handleChange}
                              />
                            </label>
                            <label className="block">
                              <span className="text-gray-700">
                                Employment End Date:
                              </span>
                              <input
                                type="text"
                                name="employmentEndDate"
                                className="mt-1 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={
                                  formData.previousEmploymentData
                                    .employmentEndDate
                                }
                                onChange={handleChange}
                              />
                            </label>

                            <label className="block col-span-2">
                              <span className="text-gray-700">
                                Do you agree to the Terms and Conditions?
                              </span>
                              <input
                                type="checkbox"
                                name="termsAgreement"
                                className="mt-1 block rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                checked={
                                  formData.previousEmploymentData
                                    .termsAgreement === "yes"
                                }
                                onChange={(e) =>
                                  handleChange({
                                    target: {
                                      name: "termsAgreement",
                                      value: e.target.checked ? "yes" : "no",
                                    },
                                  })
                                }
                              />
                            </label>
                          </div>
                          <button
                            type="submit"
                            className="py-2 px-6 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition ease-in-out duration-200"
                          >
                            Submit
                          </button>
                        </div>
                      )}

                      <div>
                        {currentStep > 1 && (
                          <button
                            className="py-2 px-6 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition ease-in-out duration-200"
                            type="button"
                            onClick={handlePrevious}
                          >
                            Previous
                          </button>
                        )}
                        {currentStep < 7 && (
                          <button
                            className="py-2 px-6 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition ease-in-out duration-200"
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
