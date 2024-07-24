"use client";

import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { formatAmount, isNumeric } from "@/utils/amountFormat";

type FormData = {
  applicationType?: string;
  investmentType?: string;
  investmentAmount?: string;
  loanAmount?: string;
  equityAmount?: string;
  docs?: string;
  [key: string]: any;
};

type ProjectData = {
  id: string;
  projectName: string;
};

type TitleProp = {
  selectedOption: string;
};

export default function FormUse({ selectedOption }: TitleProp) {
  const [formData, setFormData] = useState<FormData>({});
  const router = useRouter();
  const [rate, setRate] = useState<number | null>(null);
  const excludeFields = ["phone", "idNumber", "address", "postalCode"];
  const [totalAmount, setTotalAmount] = useState("");
  const [milestones, setMilestones] = useState([
    { name: "Milestone 1", amount: "" },
    { name: "Milestone 2", amount: "" },
  ]);

  useEffect(() => {
    const { loanAmount, loanRepaymentPeriod } = formData;
    if (loanAmount && loanRepaymentPeriod) {
      const amount = parseFloat(loanAmount);
      if (!isNaN(amount)) {
        const calculatedRate = getLoanPaymentRate(amount, loanRepaymentPeriod);
        setRate(calculatedRate);
      } else {
        setRate(null);
      }
    } else {
      setRate(null);
    }
  }, [formData.loanAmount, formData.loanRepaymentPeriod]);

  const handleTotalAmountChange = (e: any) => {
    setTotalAmount(e.target.value);
  };

  const getLoanPaymentRate = (
    amount: number,
    repaymentPeriod: string
  ): number => {
    let baseRate: number;

    if (amount <= 5000) {
      baseRate = 5;
    } else if (amount <= 20000) {
      baseRate = 7;
    } else if (amount <= 100000) {
      baseRate = 10;
    } else {
      baseRate = 12;
    }

    switch (repaymentPeriod) {
      case "monthly":
        baseRate += 0.5;
        break;
      case "quarterly":
        baseRate += 0.25;
        break;
      case "semi-annually":
        baseRate += 0.1;
        break;
      case "annually":
        baseRate -= 0.1;
        break;
    }

    const variability = Math.random() * 2 - 1;
    const rate = baseRate + variability;

    return parseFloat(rate.toFixed(2));
  };

  const handleMilestoneChange = (index: any, e: any) => {
    const newMilestones = [...milestones];
    newMilestones[index].amount = e.target.value;
    setMilestones(newMilestones);
  };

  const [projects, setProjects] = useState<ProjectData[]>([]);
  console.log(projects)

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  useEffect(() => {
    const fetchProjectData = async () => {
      const res = await axios.get('/api/projects');
      setProjects(res.data);
    };

    fetchProjectData();
  }, []);

  const handleChange = (e: any) => {
    const { name, value, type, files } = e.target;
    let newValue = value;

    if (!excludeFields.includes(name) && isNumeric(value.replace(/,/g, ""))) {
      newValue = formatAmount(value.replace(/,/g, ""));
    }

    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: newValue };

      if (updatedData.investmentAmount && updatedData.equityAmount) {
        const investmentAmount = parseFloat(
          updatedData.investmentAmount.replace(/,/g, "")
        );
        const equityAmount = parseFloat(
          updatedData.equityAmount.replace(/,/g, "")
        );
        const loanAmount = (investmentAmount - equityAmount).toFixed(2);

        updatedData.loanAmount = formatAmount(loanAmount.toString());
      }

      return updatedData;
    });
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
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow-md space-y-6"
    >
      <fieldset className="border p-4 rounded-md mb-6">
        <legend className="text-lg font-medium">Contact Information</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fullName" className="block">
              Contact Person:
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName || ""}
              onChange={handleChange}
              placeholder="Enter Contact Person"
              className="border border-gray-200 rounded-lg p-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="idNumber" className="block">
              ID Number:
            </label>
            <input
              type="text"
              name="idNumber"
              value={formData.idNumber || ""}
              onChange={handleChange}
              placeholder="Enter Id Number"
              className="block w-full rounded-lg border border-gray-300 p-2"
            />
          </div>
          <div>
            <label htmlFor="email" className="block">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              placeholder="Enter Email"
              className="block w-full rounded-lg border border-gray-300 p-2"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block">
              Phone Number:
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              placeholder="Enter Phone Number"
              className="block w-full rounded-lg border border-gray-300 p-2"
            />
          </div>
        </div>
      </fieldset>
      <fieldset className="border p-4 rounded-md mb-6">
        <legend className="text-lg font-medium">Address Information</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="address" className="block">
              Address:
            </label>
            <textarea
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
              placeholder="Enter Address"
              className="block w-full rounded-lg border border-gray-300 p-2"
            />
          </div>
          <div>
            <label htmlFor="city" className="block">
              City:
            </label>
            <input
              type="text"
              name="city"
              value={formData.city || ""}
              onChange={handleChange}
              placeholder="Enter City"
              className="block w-full rounded-lg border border-gray-300 p-2"
            />
          </div>
          <div>
            <label htmlFor="country" className="block">
              Country:
            </label>
            <select
              name="country"
              value={formData.country || ""}
              onChange={handleChange}
              className="block w-full rounded-lg border border-gray-300 p-2"
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
          <div>
            <label htmlFor="province" className="block">
              Province:
            </label>
            <select
              name="province"
              value={formData.province || ""}
              onChange={handleChange}
              className="block w-full rounded-lg border border-gray-300 p-2"
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
          <div>
            <label htmlFor="postalCode" className="block">
              Postal Code:
            </label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode || ""}
              onChange={handleChange}
              placeholder="Enter Postal Code"
              className="block w-full rounded-lg border border-gray-300 p-2"
            />
          </div>
        </div>
      </fieldset>
      <fieldset className="border p-4 rounded-md mb-6">
        <legend className="text-lg font-medium">Project Information</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="projectName" className="block">
              Project Name:
            </label>
            <select
              name="projectName"
              value={formData.projectName || ""}
              onChange={handleChange}
              className="block w-full rounded-lg border border-gray-300 p-2"
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
          <div>
            <label htmlFor="applicantType" className="block">
              Applicant Type:
            </label>
            <select
              name="applicantType"
              value={formData.applicantType || ""}
              onChange={handleChange}
              className="block w-full rounded-lg border border-gray-300 p-2"
            >
              <option value="" disabled>
                Select Applicant Type
              </option>
              <option value="Individual">Individual</option>
              <option value="Organization/Business">
                Organization/Business
              </option>
            </select>
          </div>
          {formData.applicantType === "Organization/Business" && (
            <div>
              <label htmlFor="nameOfCompany" className="block">
                Name of Company:
              </label>

              <input
                type="text"
                name="nameOfCompany"
                value={formData.nameOfCompany || ""}
                onChange={handleChange}
                placeholder="Enter Name of Company"
                className="block w-full rounded-lg border border-gray-300 p-2"
              />
            </div>
          )}
        </div>
      </fieldset>
      <fieldset className="border p-4 rounded-md mb-6">
        <legend className="text-lg font-medium">Financial Information</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="applicationType" className="block">
              Application Type:
            </label>
            <select
              name="applicationType"
              value={formData.applicationType || ""}
              onChange={handleChange}
              className="block w-full rounded-lg border border-gray-300 p-2"
            >
              <option value="" disabled>
                Select Application Type
              </option>
              <option value="Loan">Loan</option>
              <option value="Investment">Investment</option>
            </select>
          </div>
          {formData.applicationType === "Investment" ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="investmentType" className="block">
                  Investment Type:
                </label>
                <select
                  name="investmentType"
                  value={formData.investmentType || ""}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 p-2"
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="investmentAmount" className="block">
                      Investment Amount:
                    </label>
                    <input
                      type="text"
                      name="investmentAmount"
                      value={formData.investmentAmount || ""}
                      onChange={handleChange}
                      placeholder="Enter Investment Amount"
                      className="block w-full rounded-lg border border-gray-300 p-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="loanAmount" className="block">
                      Loan Amount:
                    </label>
                    <input
                      type="text"
                      name="loanAmount"
                      value={formData.loanAmount || ""}
                      onChange={handleChange}
                      readOnly
                      className="block w-full rounded-lg border border-gray-300 p-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="equityAmount" className="block">
                      Equity Amount:
                    </label>
                    <input
                      type="text"
                      name="equityAmount"
                      value={formData.equityAmount || ""}
                      onChange={handleChange}
                      placeholder="Enter Equity Amount"
                      className="block w-full rounded-lg border border-gray-300 p-2"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div>
                    <label htmlFor="totalAmount" className="block">
                      Total Investment Amount:
                    </label>
                    <input
                      type="text"
                      id="totalAmount"
                      name="totalAmount"
                      value={totalAmount}
                      onChange={handleTotalAmountChange}
                      placeholder="Enter Total Investment Amount"
                      className="block w-full rounded-lg border border-gray-300 p-2"
                    />
                  </div>
                  {milestones.map((milestone, index) => (
                    <div key={index} className="mt-4">
                      <label htmlFor={`milestone-${index}`} className="block">
                        {milestone.name}:
                      </label>
                      <input
                        type="text"
                        id={`milestone-${index}`}
                        name={`milestone-${index}`}
                        value={milestone.amount}
                        onChange={(e) => handleMilestoneChange(index, e)}
                        placeholder={`Enter amount for ${milestone.name}`}
                        className="block w-full rounded-lg border border-gray-300 p-2"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="loanRepaymentPeriod" className="block">
                  Repayment Period:
                </label>
                <select
                  name="loanRepaymentPeriod"
                  value={formData.loanRepaymentPeriod || ""}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 p-2"
                >
                  <option value="" disabled>
                    Select Repayment Period
                  </option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="semi-annually">Semi-annually</option>
                  <option value="annually">Annually</option>
                </select>
              </div>
              <div>
                <label htmlFor="loanAmount" className="block">
                  Amount:
                </label>
                <input
                  type="text"
                  name="loanAmount"
                  value={formData.loanAmount || ""}
                  onChange={handleChange}
                  placeholder="Enter Amount"
                  className="block w-full rounded-lg border border-gray-300 p-2"
                />
              </div>
              {rate !== null && (
                <p className="font-bold text-2xl text-blue-600">
                  Rate: {rate}%
                </p>
              )}
            </div>
          )}
        </div>
      </fieldset>
      <fieldset className="border p-4 rounded-md mb-6">
        <legend className="text-lg font-medium">Funding Information</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="sourceOfFunds" className="block">
              Source of Funds:
            </label>
            <select
              name="sourceOfFunds"
              value={formData.sourceOfFunds || ""}
              onChange={handleChange}
              className="block w-full rounded-lg border border-gray-300 p-2"
            >
              <option value="" disabled>
                Select Source of Funds
              </option>
              <option value="gifts">Gifts / inheritance / winnings</option>
              <option value="trade">Trade / business</option>
              <option value="credit">Credit</option>
              <option value="child">Child / spousal support payments</option>
              <option value="tax">Tax refund</option>
              <option value="savings"> Savings</option>
              <option value="salary">Salary / bonus</option>
              <option value="retirement">Retirement / insurance pay out</option>
              <option value="passiveIncome">
                Passive income (Rental, Dividends, Interest)
              </option>
            </select>
          </div>
          <div>
            <label htmlFor="purposeOfInvestment" className="block">
              Purpose of Investment:
            </label>
            <select
              name="purposeOfInvestment"
              value={formData.purposeOfInvestment || ""}
              onChange={handleChange}
              className="block w-full rounded-lg border border-gray-300 p-2"
            >
              <option value="" disabled>
                Select Purpose of Investment
              </option>
              <option value="startBusiness">Start and expand a business</option>
              <option value="educationSavings">Education savings</option>
              <option value="foreignExchangeHedging">
                Foreign exchange hedging
              </option>
              <option value="saveForRetirement">
                Save for retirement / financial goals
              </option>
              <option value="windingUpEstate">Winding up estate</option>
            </select>
          </div>
        </div>
      </fieldset>
      <fieldset className="border p-4 rounded-md mb-6">
        <legend className="text-lg font-medium">Document Uploads</legend>
        <div className="space-y-4">
          <label htmlFor="docs" className="block">
            <span className="text-gray-700">
              Certificate of Incorporation or Registration:
            </span>
            <input
              type="file"
              name="docs"
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="docs" className="block">
            <span className="text-gray-700">
              Memorandum of Incorporation (MOI):
            </span>
            <input
              type="file"
              name="docs"
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="docs" className="block">
            <span className="text-gray-700">
              Registration documents as a Non-Profit Company (if applicable):
            </span>
            <input
              type="file"
              name="docs"
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="docs" className="block">
            <span className="text-gray-700">
              Accreditation documents as a Social Housing Institution (SHI) or
              Other Developmental Agency (ODA):
            </span>
            <input
              type="file"
              name="docs"
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="docs" className="block">
            <span className="text-gray-700">
              Certificate or official documentation confirming the allocation of
              a Community Credit Guarantee (CCG):
            </span>
            <input
              type="file"
              name="docs"
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2"
              onChange={handleChange}
            />
          </label>
        </div>
      </fieldset>
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-8 rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
