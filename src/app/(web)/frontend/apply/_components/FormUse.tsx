"use client";

import React, { useEffect, useState } from "react";
import FormSections from "./FormSections";
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

type TitleProp = {
  selectedOption: string;
};

export default function FormUse({ selectedOption }: TitleProp) {
  const [formData, setFormData] = useState<FormData>({});
  const router = useRouter();

  const [rate, setRate] = useState<number | null>(null);

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

  const excludeFields = ["phone", "idNumber", "address", "postalCode"];

  const [totalAmount, setTotalAmount] = useState("");
  const [milestones, setMilestones] = useState([
    { name: "Milestone 1", amount: "" },
    { name: "Milestone 2", amount: "" },
  ]);

  const handleTotalAmountChange = (e: any) => {
    setTotalAmount(e.target.value);
  };

  const getLoanPaymentRate = (amount: number, repaymentPeriod: string): number => {
    let baseRate: number;
  
    if (amount <= 5000) {
      baseRate = 5; // Base rate for small loans
    } else if (amount <= 20000) {
      baseRate = 7; // Base rate for medium loans
    } else if (amount <= 100000) {
      baseRate = 10; // Base rate for large loans
    } else {
      baseRate = 12; // Base rate for very large loans
    }
  
    // Adjust base rate based on repayment period
    switch (repaymentPeriod) {
      case 'monthly':
        baseRate += 0.5;
        break;
      case 'quarterly':
        baseRate += 0.25;
        break;
      case 'semi-annually':
        baseRate += 0.1;
        break;
      case 'annually':
        baseRate -= 0.1;
        break;
    }
  
    // Add a random factor to the base rate to simulate bank variability
    const variability = Math.random() * 2 - 1; // Random number between -1 and 1
    const rate = baseRate + variability;
  
    return parseFloat(rate.toFixed(2)); // Return the rate rounded to two decimal places
  };

  const handleMilestoneChange = (index: any, e: any) => {
    const newMilestones = [...milestones];
    newMilestones[index].amount = e.target.value;
    setMilestones(newMilestones);
  };

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
    <form>
      <div className="flex justify-between items-center">
        <div className="grid gap-y-4">
          <label htmlFor="fullName">Contact Person:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName || ""}
            onChange={handleChange}
            placeholder="Enter Contact Person"
            className="border border-gray-200 rounded-lg p-2 w-full"
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
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
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
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
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
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
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
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
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
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
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
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
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
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
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
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
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
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
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
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
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
                className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
              />
            </div>
          </>
        ) : null}
      </div>

      <div className="flex justify-between items-center">
        <div>
          <label htmlFor="applicationType">Application Type:</label>
          <select
            name="applicationType"
            value={formData.applicationType || ""}
            onChange={handleChange}
            className="mt-1 block w-1/2 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
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
                  className="mt-1 block w-1/2 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
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
                <div className="flex items-center justify-between">
                  <div>
                    <label htmlFor="investmentAmount">Investment Amount:</label>
                    <input
                      type="text"
                      name="investmentAmount"
                      value={formData.investmentAmount || ""}
                      onChange={handleChange}
                      placeholder="Enter Investment Amount"
                      className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="loanAmount">Loan Amount:</label>
                    <input
                      type="text"
                      name="loanAmount"
                      value={formData.loanAmount || ""}
                      onChange={handleChange}
                      readOnly
                      className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
                    />
                  </div>

                  <div className="grid gap-y-4">
                    <label htmlFor="equityAmount">Equity Amount:</label>
                    <input
                      type="text"
                      name="equityAmount"
                      value={formData.equityAmount || ""}
                      onChange={handleChange}
                      placeholder="Enter Equity Amount"
                      className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  {/* <div>
                    <label htmlFor="investmentAmount">Investment Amount:</label>
                    <input
                      type="text"
                      name="investmentAmount"
                      value={formData.investmentAmount || ""}
                      onChange={handleChange}
                      placeholder="Enter Investment Amount"
                      className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
                    />
                  </div> */}
                  <div>
                    <label htmlFor="totalAmount">
                      Total Investment Amount:
                    </label>
                    <input
                      type="text"
                      id="totalAmount"
                      name="totalAmount"
                      value={totalAmount}
                      onChange={handleTotalAmountChange}
                      placeholder="Enter Total Investment Amount"
                      className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
                    />
                  </div>

                  {milestones.map((milestone, index) => (
                    <div key={index} className="mt-4">
                      <label htmlFor={`milestone-${index}`}>
                        {milestone.name}:
                      </label>
                      <input
                        type="text"
                        id={`milestone-${index}`}
                        name={`milestone-${index}`}
                        value={milestone.amount}
                        onChange={(e) => handleMilestoneChange(index, e)}
                        placeholder={`Enter amount for ${milestone.name}`}
                        className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="flex justify-between items-end gap-4">
              <div>
                <label htmlFor="loanRepaymentPeriod">
                  {formData.applicationType === "Loan" ? "Application" : null}{" "}
                  Repayment Period:
                </label>
                <select
                  name="loanRepaymentPeriod"
                  value={formData.loanRepaymentPeriod || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
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
                <label htmlFor="loanAmount">
                  {formData.applicationType === "Loan" ? "Application" : null}{" "}
                  Amount:
                </label>
                <input
                  type="text"
                  name="loanAmount"
                  value={formData.loanAmount || ""}
                  onChange={handleChange}
                  placeholder="Enter Amount"
                  className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
                />
              </div>

              {rate !== null && <p className="font-bold text-2xl text-blue-600">Rate: {rate}%</p>}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <label htmlFor="sourceOfFunds">Source of Funds:</label>
          <select
            name="sourceOfFunds"
            value={formData.sourceOfFunds || ""}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
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
          <label htmlFor="purposeOfInvestment">Purpose of Investment:</label>
          <select
            name="purposeOfInvestment"
            value={formData.purposeOfInvestment || ""}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 bg-white"
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

      <label htmlFor="docs" className="block">
        <span className="text-gray-700">
          Certificate of Incorporation or Registration:
        </span>
        <input
          type="file"
          name="docs"
          className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out"
          value={formData.docs || ""}
          onChange={handleChange}
          placeholder="Enter Equity Amount"
        />
      </label>
      <label htmlFor="docs" className="block">
        <span className="text-gray-700">
          Memorandum of Incorporation (MOI):
        </span>
        <input
          type="file"
          name="docs"
          className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out"
          value={formData.docs || ""}
          onChange={handleChange}
          placeholder="Enter Equity Amount"
        />
      </label>
      <label htmlFor="docs" className="block">
        <span className="text-gray-700">
          Registration documents as a Non-Profit Company (if applicable):
        </span>
        <input
          type="file"
          name="docs"
          className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out"
          value={formData.docs || ""}
          onChange={handleChange}
          placeholder="Enter Equity Amount"
        />
      </label>
      <label htmlFor="docs" className="block">
        <span className="text-gray-700">
          Accreditation documents as a Social Housing Institution (SHI) or Other
          Developmental Agency (ODA):
        </span>
        <input
          type="file"
          name="docs"
          className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out"
          value={formData.docs || ""}
          onChange={handleChange}
          placeholder="Enter Equity Amount"
        />
      </label>
      <label htmlFor="docs" className="block">
        <span className="text-gray-700">
          Certificate or official documentation confirming the allocation of a
          Community Credit Guarantee (CCG):
        </span>
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