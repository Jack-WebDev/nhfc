"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components";
import {
  ArrowLeft,
  Ban,
  CircleCheckBig,
  CircleDashed,
  Loader,
} from "lucide-react";

type LoanApplication = {
  id: string;
  NameOfCompany: string;
  ContactPerson: string;
  Email: string;
  PhoneNumber: string;
  Address: string;
  City: string;
  Province: string;
  PostalCode: string;
  ProjectName: string;
  InvestmentType: string;
  Country: string;
  LoanType: string;
  LoanAmount: string;
  LoanStatus: string;
  createdAt: any;
};

export default function ViewApplication() {
  const params = useParams();
  const applicationID = params.id;
  const [loanData, setLoanData] = useState<LoanApplication[]>([]);
  const router = useRouter();
  console.log(loanData);

  useEffect(() => {
    const fetchApplicationData = async () => {
      const res = await axios.get(`/api/applications/${applicationID}`);
      const usersData = await res.data;
      setLoanData(usersData);
    };

    fetchApplicationData();
  }, [applicationID]);

  const approvedSteps = (
    <>
      <div className="flex items-center gap-4 mb-4">
        <CircleCheckBig size={40} style={{ color: "#008000" }} />
        <div className="bg-gray-100 p-4 rounded-xl w-full">
          <h2>2024-07-07</h2>
          <h3>Application Submitted</h3>
          <span>Completed</span>
        </div>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <CircleCheckBig size={40} style={{ color: "#008000" }} />
        <div className="bg-gray-100 p-4 rounded-xl w-full">
          <h2>2024-07-23</h2>
          <h3>Initial Review</h3>
          <span>Completed</span>
        </div>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <CircleCheckBig size={40} style={{ color: "#008000" }} />
        <div className="bg-gray-100 p-4 rounded-xl w-full">
          <h2>2023-07-27</h2>
          <h3>Detailed Assessment</h3>
          <span>Completed</span>
        </div>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <CircleCheckBig size={40} style={{ color: "#008000" }} />
        <div className="bg-gray-100 p-4 rounded-xl w-full">
          <h3>Credit Check</h3>
          <span>Completed</span>
        </div>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <CircleCheckBig size={40} style={{ color: "#008000" }} />
        <div className="bg-gray-100 p-4 rounded-xl w-full">
          <h3>Final Decision</h3>
          <span>Completed</span>
        </div>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <CircleCheckBig size={40} style={{ color: "#008000" }} />
        <div className="bg-gray-100 p-4 rounded-xl w-full">
          <h3>Loan Disbursement</h3>
          <span>Completed</span>
        </div>
      </div>
    </>
  );

  const formatAmount = (amount: string) => {
    // Convert the amount to a number and ensure it has two decimal places
    let number = parseFloat(amount.replace(/[R,]/g, '')).toFixed(2);
  
    // Split the number into the integer part and the decimal part
    let [integerPart, decimalPart] = number.split('.');
  
    // Add commas as thousand separators
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
    // Combine the integer part and decimal part
    return 'R' + integerPart + '.' + decimalPart;
  }

  const rejectedSteps = (
    <>
      <div className="flex items-center gap-4 mb-4">
        <CircleCheckBig size={40} style={{ color: "#008000" }} />
        <div className="bg-gray-100 p-4 rounded-xl w-full">
          <h2>2024-07-07</h2>
          <h3>Application Submitted</h3>
          <span>Completed</span>
        </div>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <CircleCheckBig size={40} style={{ color: "#008000" }} />
        <div className="bg-gray-100 p-4 rounded-xl w-full">
          <h2>2024-07-23</h2>
          <h3>Initial Review</h3>
          <span>Completed</span>
        </div>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <Ban size={40} style={{ color: "#ff0000" }} />
        <div className="bg-gray-100 p-4 rounded-xl w-full">
          <h2>2023-07-27</h2>
          <h3>Detailed Assessment</h3>
          <span>Rejected</span>
        </div>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <Ban size={40} style={{ color: "#ff0000" }} />
        <div className="bg-gray-100 p-4 rounded-xl w-full">
          <h3>Credit Check</h3>
          <span>Rejected</span>
        </div>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <Ban size={40} style={{ color: "#ff0000" }} />
        <div className="bg-gray-100 p-4 rounded-xl w-full">
          <h3>Final Decision</h3>
          <span>Rejected</span>
        </div>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <Ban size={40} style={{ color: "#ff0000" }} />
        <div className="bg-gray-100 p-4 rounded-xl w-full">
          <h3>Loan Disbursement</h3>
          <span>Rejected</span>
        </div>
      </div>
    </>
  );

  const defaultSteps = (
    <>
      <div className="flex items-center gap-4 mb-4">
        <CircleCheckBig size={40} style={{ color: "#008000" }} />
        <div className="bg-gray-100 p-4 rounded-xl w-full">
          <h2>2024-07-07</h2>
          <h3>Application Submitted</h3>
          <span>Completed</span>
        </div>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <CircleCheckBig size={40} style={{ color: "#008000" }} />
        <div className="bg-gray-100 p-4 rounded-xl w-full">
          <h2>2024-07-23</h2>
          <h3>Initial Review</h3>
          <span>Completed</span>
        </div>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <Loader size={40} style={{ color: "#ffa500" }} />
        <div className="bg-gray-100 p-4 rounded-xl w-full">
          <h2>2023-07-27</h2>
          <h3>Detailed Assessment</h3>
          <span>In Progress</span>
        </div>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <CircleDashed size={40} style={{ color: "#6495ed" }} />
        <div className="bg-gray-100 p-4 rounded-xl w-full">
          <h3>Credit Check</h3>
          <span>Pending</span>
        </div>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <CircleDashed size={40} style={{ color: "#6495ed" }} />
        <div className="bg-gray-100 p-4 rounded-xl w-full">
          <h3>Final Decision</h3>
          <span>Pending</span>
        </div>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <CircleDashed size={40} style={{ color: "#6495ed" }} />
        <div className="bg-gray-100 p-4 rounded-xl w-full">
          <h3>Loan Disbursement</h3>
          <span>Pending</span>
        </div>
      </div>
    </>
  );


  return (
    <>
      <ArrowLeft onClick={() => router.back()} className="0 cursor-pointer" />
      {loanData?.map((loan) => {
        const fomattedDate = loan.createdAt.split("T")[0];
        return (
          <div
            key={loan.id}
            className="bg-white rounded-xl p-4 border w-[70%] mx-auto"
          >
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-semibold">
                Application ID: {loan.id}
              </h1>
              <span
                className={`py-2 px-4 rounded-xl text-white font-semibold ${
                  loan.LoanStatus === "Approved"
                    ? "bg-green-600"
                    : loan.LoanStatus === "Rejected"
                    ? "bg-red-600"
                    : "bg-yellow-500"
                }`}
              >
                {loan.LoanStatus}
              </span>
            </div>

            <h2>Application Details</h2>

            <div className="grid grid-cols-3 gap-4 my-8">
              <p>Application Type: {loan.LoanType}</p>
              <p>Submitted Date: {fomattedDate}</p>
              <p>Application Amount: {formatAmount(loan.LoanAmount)}</p>
              <p>Contact Person: {loan.ContactPerson}</p>
              <p>Email: {loan.Email}</p>
              <p>Phone Number: {loan.PhoneNumber}</p>
              <p>Address: {loan.Address}</p>
              <p>City: {loan.City}</p>
              <p>Province: {loan.Province}</p>
              <p>Postal Code: {loan.PostalCode}</p>
              <p>Country: {loan.Country}</p>
              <p>Name of Company: {loan.NameOfCompany}</p>
            </div>

            <Accordion type="single" collapsible className="w-full bg-gray-100">
              <AccordionItem value="item-1">
                <AccordionTrigger className="px-4">
                  Project: {loan.ProjectName}
                </AccordionTrigger>
                <AccordionContent className="grid gap-y-4 px-8">
                  <h2 className="text-2xl font-semibold text-blue-500">
                    Project Description:
                  </h2>
                  {loan.ProjectName} is an innovative social housing project
                  located in the heart of Johannesburg. This development aims to
                  provide quality, affordable housing to low and middle-income
                  families while fostering a sense of community and sustainable
                  living.{" "}
                  <h2 className="text-2xl font-semibold text-blue-500">
                    Client Name:
                  </h2>{" "}
                  Johannesburg Social Housing Company (JOSHCO) Project Value: R
                  280,000,000
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <h3 className="text-2xl my-8 text-blue-500">
              Application Timeline
            </h3>

            {loan.LoanStatus === "Approved" ? approvedSteps : loan.LoanStatus === "Rejected" ? rejectedSteps : defaultSteps}

            <div className="flex gap-x-4 items-center my-8">
              <button className="bg-blue-500 text-white py-2 px-8 rounded-xl">
                Upload Additional Documents
              </button>
              <button className="bg-green-500 text-white py-2 px-8 rounded-xl">
                Contact Loan Officer
              </button>
            </div>

            <div>
              <h3>Next Steps</h3>
              <h4>
                Our team is currently reviewing your application. Here&apos;s
                what you can expect:
              </h4>
              <ul className="list-disc list-inside">
                <li>
                  We may contact you for additional information or clarification
                  if needed.
                </li>
                <li>
                  Once the review is complete, we will conduct a credit check.
                </li>
                <li>
                  After all assessments are done, we will make a final decision
                  on your application.
                </li>
                <li>
                  You will be notified via email and SMS about the outcome of
                  your application.
                </li>
                <li>
                  If approved, we will provide further instructions on the loan
                  disbursement process.
                </li>
                <li>
                  The typical processing time for applications is 5-7 business
                  days. We appreciate your patience during this process.
                </li>
              </ul>
            </div>
          </div>
        );
      })}
    </>
  );
}
