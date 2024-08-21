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
  const [errors, setErrors] = useState<FormData>({});
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
  // console.log(projects);

  useEffect(() => {
    const fetchProjectData = async () => {
      const res = await axios.get("/api/projects");
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

    // Reset error for the changed field
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors: FormData = {};

    // Validate contact information
    if (!formData.fullName) {
      newErrors.fullName = "Contact Person is required";
      valid = false;
    }
    if (!formData.idNumber) {
      newErrors.idNumber = "ID Number is required";
      valid = false;
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    }
    if (!formData.phone) {
      newErrors.phone = "Phone Number is required";
      valid = false;
    }

    // Validate address information
    if (!formData.address) {
      newErrors.address = "Address is required";
      valid = false;
    }
    if (!formData.city) {
      newErrors.city = "City is required";
      valid = false;
    }
    if (!formData.country) {
      newErrors.country = "Country is required";
      valid = false;
    }
    if (!formData.province) {
      newErrors.province = "Province is required";
      valid = false;
    }
    if (!formData.postalCode) {
      newErrors.postalCode = "Postal Code is required";
      valid = false;
    }

    // Validate project information
    if (!formData.projectName) {
      newErrors.projectName = "Project Name is required";
      valid = false;
    }
    if (!formData.applicantType) {
      newErrors.applicantType = "Applicant Type is required";
      valid = false;
    }
    if (
      formData.applicantType === "Organization/Business" &&
      !formData.nameOfCompany
    ) {
      newErrors.nameOfCompany = "Name of Company is required";
      valid = false;
    }

    // Validate financial information
    if (!formData.applicationType) {
      newErrors.applicationType = "Application Type is required";
      valid = false;
    }
    if (formData.applicationType === "Investment" && !formData.investmentType) {
      newErrors.investmentType = "Investment Type is required";
      valid = false;
    }
    if (
      formData.applicationType === "Investment" &&
      formData.investmentType === "Quasi Equity"
    ) {
      if (!formData.investmentAmount) {
        newErrors.investmentAmount = "Investment Amount is required";
        valid = false;
      }
      if (!formData.loanAmount) {
        newErrors.loanAmount = "Loan Amount is required";
        valid = false;
      }
      if (!formData.equityAmount) {
        newErrors.equityAmount = "Equity Amount is required";
        valid = false;
      }
    }
    if (
      formData.applicationType === "Investment" &&
      (formData.investmentType === "Equity" ||
        formData.investmentType === "Loan")
    ) {
      if (!totalAmount) {
        newErrors.totalAmount = "Total Investment Amount is required";
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    // console.log("Form Data:", { ...formData, loanType: selectedOption });
    try {
      const res = await axios.post("/api/applications", {
        ...formData,
        loanType: selectedOption,
      });
      // console.log(res);
      router.push("/frontend");
      toast.success("Application Submitted Successfully");
    } catch (error) {
      console.log(error as AxiosError);
    }
  };

  return (
    <form
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
              required
            />
            {errors.fullName && (
              <p className="text-red-600">{errors.fullName}</p>
            )}
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
              required
            />
            {errors.idNumber && (
              <p className="text-red-600">{errors.idNumber}</p>
            )}
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
              required
            />
            {errors.email && <p className="text-red-600">{errors.email}</p>}
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
              required
            />
            {errors.phone && <p className="text-red-600">{errors.phone}</p>}
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
              required
            />
            {errors.address && <p className="text-red-600">{errors.address}</p>}
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
              required
            />
            {errors.city && <p className="text-red-600">{errors.city}</p>}
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
              required
            >
              <option value="" disabled>
                Select Country
              </option>
              <option value="South Africa">South Africa</option>
              <option value="Nigeria">Nigeria</option>
              <option value="Ghana">Ghana</option>
              <option value="Botswana">Botswana</option>
            </select>
            {errors.country && <p className="text-red-600">{errors.country}</p>}
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
              required
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
            {errors.province && (
              <p className="text-red-600">{errors.province}</p>
            )}
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
              required
            />
            {errors.postalCode && (
              <p className="text-red-600">{errors.postalCode}</p>
            )}
          </div>
        </div>
      </fieldset>
      <fieldset className="border p-4 rounded-md mb-6">
        <legend className="text-lg font-medium">Project Information</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          {projects.map((project) => (
            <option key={project.id} value={project.projectName}>
              {project.projectName}
            </option>

          ))}
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
              required
            >
              <option value="" disabled>
                Select Applicant Type
              </option>
              <option value="Individual">Individual</option>
              <option value="Organization/Business">
                Organization/Business
              </option>
            </select>
            {errors.applicantType && (
              <p className="text-red-600">{errors.applicantType}</p>
            )}
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
                required
              />
              {errors.nameOfCompany && (
                <p className="text-red-600">{errors.nameOfCompany}</p>
              )}
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
              required
            >
              <option value="" disabled>
                Select Application Type
              </option>
              <option value="Loan">Loan</option>
              <option value="Investment">Investment</option>
            </select>
            {errors.applicationType && (
              <p className="text-red-600">{errors.applicationType}</p>
            )}
          </div>
          {formData.applicationType === "Investment" && (
            <div className="col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="investmentType" className="block">
                  Investment Type:
                </label>
                <select
                  name="investmentType"
                  value={formData.investmentType || ""}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 p-2"
                  required
                >
                  <option value="" disabled>
                    Select Investment Type
                  </option>
                  <option value="Quasi Equity">Quasi Equity</option>
                  <option value="Equity">Equity</option>
                  <option value="Loan">Loan</option>
                </select>
                {errors.investmentType && (
                  <p className="text-red-600">{errors.investmentType}</p>
                )}
              </div>
              {formData.investmentType === "Quasi Equity" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 col-span-3">
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
                      required
                    />
                    {errors.investmentAmount && (
                      <p className="text-red-600">{errors.investmentAmount}</p>
                    )}
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
                      required
                    />
                    {errors.loanAmount && (
                      <p className="text-red-600">{errors.loanAmount}</p>
                    )}
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
                      required
                    />
                    {errors.equityAmount && (
                      <p className="text-red-600">{errors.equityAmount}</p>
                    )}
                  </div>
                </div>
              )}
              {(formData.investmentType === "Equity" ||
                formData.investmentType === "Loan") && (
                <div className="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
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
                      required
                    />
                    {errors.totalAmount && (
                      <p className="text-red-600">{errors.totalAmount}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="milestone-0" className="block">
                      Milestone 1:
                    </label>
                    <input
                      type="text"
                      id="milestone-0"
                      name="milestone-0"
                      value={milestones[0].amount}
                      onChange={(e) => handleMilestoneChange(0, e)}
                      placeholder="Enter amount for Milestone 1"
                      className="block w-full rounded-lg border border-gray-300 p-2"
                      required
                    />
                    {errors[`milestone-0`] && (
                      <p className="text-red-600">{errors[`milestone-0`]}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="milestone-1" className="block">
                      Milestone 2:
                    </label>
                    <input
                      type="text"
                      id="milestone-1"
                      name="milestone-1"
                      value={milestones[1].amount}
                      onChange={(e) => handleMilestoneChange(1, e)}
                      placeholder="Enter amount for Milestone 2"
                      className="block w-full rounded-lg border border-gray-300 p-2"
                      required
                    />
                    {errors[`milestone-1`] && (
                      <p className="text-red-600">{errors[`milestone-1`]}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          {formData.applicationType === "Loan" && (
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
                  required
                >
                  <option value="" disabled>
                    Select Repayment Period
                  </option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="semi-annually">Semi-annually</option>
                  <option value="annually">Annually</option>
                </select>
                {errors.loanRepaymentPeriod && (
                  <p className="text-red-600">{errors.loanRepaymentPeriod}</p>
                )}
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
                  required
                />
                {errors.loanAmount && (
                  <p className="text-red-600">{errors.loanAmount}</p>
                )}
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
      {formData.applicationType === "Investment" ? (
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
              required
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
            {errors.sourceOfFunds && (
              <p className="text-red-600">{errors.sourceOfFunds}</p>
            )}
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
              required
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
            {errors.purposeOfInvestment && (
              <p className="text-red-600">{errors.purposeOfInvestment}</p>
            )}
          </div>
        </div>
      </fieldset>

      ): null}
      <fieldset className="border p-4 rounded-md mb-6">
        <legend className="text-lg font-medium">Document Uploads</legend>
        <div className="space-y-4 grid grid-cols-2 gap-4 self-end">
          <label htmlFor="docs" className="block">
            <span className="text-gray-700">
              Certificate of Incorporation or Registration:
            </span>
            <input
              type="file"
              name="docs"
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2"
              onChange={handleChange}
              required
            />
            {errors.docs && <p className="text-red-600">{errors.docs}</p>}
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
              required
            />
            {errors.docs && <p className="text-red-600">{errors.docs}</p>}
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
              required
            />
            {errors.docs && <p className="text-red-600">{errors.docs}</p>}
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
              required
            />
            {errors.docs && <p className="text-red-600">{errors.docs}</p>}
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
              required
            />
            {errors.docs && <p className="text-red-600">{errors.docs}</p>}
          </label>
        </div>
      </fieldset>
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-8 rounded-lg hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
