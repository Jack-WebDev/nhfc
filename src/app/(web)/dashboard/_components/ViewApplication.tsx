"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { Check, Clock, FileText, History, Info, ListChecks, Lock, Mail, Play, ThumbsUp, TriangleAlert, User } from "lucide-react";
import EligibilityCheck from "./EligibilityCheck";
import { toast } from "react-toastify";

type LoanApplication = {
  id: string;
  NameOfCompany: string;
  ContactPerson: string;
  Email: string;
  PhoneNumber: string;
  IdNumber: string;
  InvestmentType: string;
  ProjectName: string;
  Address: string;
  City: string;
  Province: string;
  PostalCode: string;
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
  console.log(loanData);

  useEffect(() => {
    const fetchApplicationData = async () => {
      const res = await axios.get(`/api/applications/${applicationID}`);
      const usersData = await res.data;
      setLoanData(usersData);
    };

    fetchApplicationData();
  }, [applicationID]);

  const handleApprove = async (loan:string) => {
    const res = await axios.put(`/api/applications/${loan}`, {
      LoanStatus: "Approved",
    });
    toast.success("Application Approved Successfully");
  }

  return (
    <>
      {loanData?.map((loan) => {
        const fomattedDate = loan.createdAt.split("T")[0];
        return (
          <div
            key={loan.id}
            className="bg-white rounded-xl p-4 border w-[70%] mx-auto"
          >
            <h1 className="flex items-center gap-x-2 text-blue-500 font-semibold text-2xl">
              <FileText /> Application Review: {loan.id}
            </h1>

            <div className="my-8">
              <h2 className="flex items-center gap-x-2 text-blue-500 font-semibold text-2xl">
                <User /> Applicant Details
              </h2>
              <div className="grid gap-y-2 mt-4 px-4">
                <p className="flex justify-between items-center">
                  Name: <span>{loan.ContactPerson}</span>
                </p>
                <hr />
                <p className="flex justify-between items-center">ID Number: <span>{loan.IdNumber}</span></p>
                 <hr />
                <p className="flex justify-between items-center">
                  Email: <span>{loan.Email}</span>
                </p>
                 <hr />
                <p className="flex justify-between items-center">
                  Phone Number: <span>{loan.PhoneNumber}</span>
                </p>
                 <hr />
                <p className="flex justify-between items-center">
                  Company Name: <span>{loan.NameOfCompany}</span>
                </p>
                 <hr />
              </div>
            </div>

            <div className="my-8">
              <h2 className="flex items-center gap-x-2 text-blue-500 font-semibold text-2xl">
                <Info /> Application Details
              </h2>
              <div className="grid gap-y-2 mt-4 px-4">
                <p className="flex justify-between items-center">
                  Loan Type: <span>{loan.LoanType}</span>
                </p>
                <hr />
                <p className="flex justify-between items-center">
                  Loan Amount: <span>{loan.LoanAmount}</span>
                </p>
                <hr />
                <p className="flex justify-between items-center">
                  Investment Type: <span>{loan.InvestmentType}</span>
                </p>
                <hr />
                <p className="flex justify-between items-center">
                  Project Name: <span>{loan.ProjectName}</span>
                </p>
                <hr />
                <p className="flex justify-between items-center">
                  Project Location: <span>{loan.City}</span>
                </p>
                <hr />
                <p className="flex justify-between items-center">
                  Application Date: <span>{fomattedDate}</span>
                </p>
                <hr />
              </div>
            </div>

            <div className="my-8">
              <h3 className="flex items-center gap-x-2 text-blue-500 font-semibold text-2xl"><FileText /> Application Documents</h3>
              <div className="grid gap-y-2 my-8 px-4">
                <p>
                  <span className="text-blue-500 underline font-medium">Attachment 1</span>
                </p>
                <p>
                  <span className="text-blue-500 underline font-medium">Attachment 2</span>
                </p>
              </div>
            </div>

            <div className="my-8">
              <h2 className="flex items-center gap-x-2 text-blue-500 font-semibold text-2xl"><History/> Applicant History</h2>
              <div className="grid gap-y-2 mt-4 px-4">
                <p className="flex justify-between items-center">Previous Applications <span>2</span></p>
                <hr />
                <p className="flex justify-between items-center">Last Application Date: <span>2023-07-27</span></p>
                <hr />
                <p className="flex justify-between items-center">Last Application Outcome: <span>Declined</span></p>
                <hr />
              </div>
            </div>

            <div>
              <h2 className="flex items-center gap-x-2 text-blue-500 font-semibold text-2xl"><Clock /> Eligibility Check</h2>
              <hr />
              <EligibilityCheck />
            </div>

            <div>
              <h2 className="flex items-center gap-x-2 text-blue-500 font-semibold text-2xl"><ListChecks/> Application Stages</h2>

              <div className="grid gap-y-4 my-8 font-medium">
                <div className="border-l-4 border-blue-700 bg-blue-200 p-4 rounded-lg flex items-center justify-between">
                  <h3>Initial Review</h3>
                  <button className="flex items-center gap-x-2 bg-green-500 text-white py-2 px-4 rounded-lg"><Check /> Completed</button>
                </div>
                <div className=" bg-gray-100 p-4 rounded-lg flex items-center justify-between hover:bg-blue-100">
                  <h3>Detailed Assesment</h3>
                  <button className="flex items-center gap-x-2 bg-blue-500 text-white py-2 px-4 rounded-lg"><Play/> Initiate</button>
                </div>
                <div className=" bg-gray-100 p-4 rounded-lg flex items-center justify-between hover:bg-blue-100">
                  <h3>Credit Committe Review</h3>
                  <button className="flex items-center gap-x-2 bg-blue-500 text-white py-2 px-4 rounded-lg"><Lock/> Initiate</button>
                </div>
                <div className=" bg-gray-100 p-4 rounded-lg flex items-center justify-between hover:bg-blue-100">
                  <h3>Final Decision</h3>
                  <button className="flex items-center gap-x-2 bg-blue-500 text-white py-2 px-4 rounded-lg"><Lock/> Initiate</button>
                </div>
                <div className=" bg-gray-100 p-4 rounded-lg flex items-center justify-between hover:bg-blue-100">
                  <h3>Loan Disbursement</h3>
                  <button className="flex items-center gap-x-2 bg-blue-500 text-white py-2 px-4 rounded-lg"><Lock/> Initiate</button>
                </div>
              </div>
            </div>

            <div className="flex justify-around items-center">
              <button className="flex items-center gap-x-4 py-2 px-4 rounded-lg text-white bg-red-500"><TriangleAlert/> Override Eligibility Decision</button>
              <button className="flex items-center gap-x-4 py-2 px-4 rounded-lg text-white bg-blue-500"><Mail/> Request Additional Information</button>
              <button className="flex items-center gap-x-4 py-2 px-4 rounded-lg text-white bg-green-500" onClick={() => handleApprove(loan.id)}><ThumbsUp/> Approve Application</button>
            </div>
          </div>
        );
      })}
    </>
  );
}
