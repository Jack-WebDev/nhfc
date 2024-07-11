"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { Check, Clock, FileText, History, Info, ListChecks, Lock, Mail, Play, ThumbsUp, TriangleAlert, User } from "lucide-react";
import EligibilityCheck from "./EligibilityCheck";

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

  return (
    <>
      {loanData?.map((loan) => {
        const fomattedDate = loan.createdAt.split("T")[0];
        return (
          <div
            key={loan.id}
            className="bg-white rounded-xl p-4 border w-[70%] mx-auto"
          >
            <h1>
              <FileText /> Application Review: {loan.id}
            </h1>
            <hr />

            <div>
              <h2>
                <User /> Applicant Details
              </h2>
              <hr />
              <div>
                <p>
                  Name: <span>{loan.ContactPerson}</span>
                </p>
                <p>ID Number: <span>{loan.IdNumber}</span></p>
                <p>
                  Email: <span>{loan.Email}</span>
                </p>
                <p>
                  Phone Number: <span>{loan.PhoneNumber}</span>
                </p>
                <p>
                  Company Name: <span>{loan.NameOfCompany}</span>
                </p>
              </div>
            </div>

            <div>
              <h2>
                <Info /> Application Details
              </h2>
              <hr />
              <div>
                <p>
                  Loan Type: <span>{loan.LoanType}</span>
                </p>
                <p>
                  Loan Amount: <span>{loan.LoanAmount}</span>
                </p>
                <p>
                  Investment Type: <span>{loan.InvestmentType}</span>
                </p>
                <p>
                  Project Name: <span>{loan.ProjectName}</span>
                </p>
                <p>
                  Project Location: <span>{loan.City}</span>
                </p>
                <p>
                  Application Date: <span>{fomattedDate}</span>
                </p>
              </div>
            </div>

            <div>
              <h3><FileText /> Application Documents</h3>
              <hr />
              <div>
                <p>
                  <span>Attachment 1</span>
                </p>
                <p>
                  <span>Attachment 2</span>
                </p>
              </div>
            </div>

            <div>
              <h2><History/> Applicant History</h2>
              <hr />
              <div>
                <p>Previous Applications <span>2</span></p>
                <p>Last Application Date: <span>2023-07-27</span></p>
                <p>Last Application Outcome: <span>Declined</span></p>
              </div>
            </div>

            <div>
              <h2><Clock /> Eligibility Check</h2>
              <hr />
              <EligibilityCheck />
            </div>

            <div>
              <h2><ListChecks/> Application Stages</h2>

              <div>
                <div>
                  <h3>Initial Review</h3>
                  <button><Check /> Completed</button>
                </div>
                <div>
                  <h3>Detailed Assesment</h3>
                  <button><Play/> Initiate</button>
                </div>
                <div>
                  <h3>Credit Committe Review</h3>
                  <button><Lock/> Initiate</button>
                </div>
                <div>
                  <h3>Final Decision</h3>
                  <button><Lock/> Initiate</button>
                </div>
                <div>
                  <h3>Loan Disbursement</h3>
                  <button><Lock/> Initiate</button>
                </div>
              </div>
            </div>

            <div>
              <button><TriangleAlert/> Override Eligibility Decision</button>
              <button><Mail/> Reuqest Additional Information</button>
              <button><ThumbsUp/> Approve Application</button>
            </div>
          </div>
        );
      })}
    </>
  );
}
