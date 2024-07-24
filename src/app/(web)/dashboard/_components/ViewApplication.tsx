"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  AlertTriangle,
  ArrowLeft,
  Ban,
  Check,
  Clock,
  Download,
  FileText,
  History,
  Info,
  ListChecks,
  Mail,
  Play,
  ThumbsUp,
  User,
} from "lucide-react";
import EligibilityCheck from "./EligibilityCheck";
import { toast } from "react-toastify";
import { Textarea } from "@/components";

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
  IdNumber: string;
  InvestmentType: string;
  Country: string;
  LoanType: string;
  LoanAmount: string;
  InvestmentAmount: string;
  EquityAmount: string;
  ApplicationType: string;
  LoanStatus: string;
  sourceOfFunds: string;
  purposeOfInvestment: string;
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

  const handleApprove = async (loan: string) => {
    await axios.put(`/api/applications/${loan}`, {
      LoanStatus: "Approved",
    });
    toast.success("Application Approved Successfully");
  };

  const renderEligibilityResults = (loan: LoanApplication) => {
    if (loan.LoanStatus === "Approved") {
      return (
        <div className="my-8 grid gap-y-2">
          <h3 className="font-semibold text-xl">Eligibility Results</h3>
    
          <p className="pl-2">
            Checking credit score... <span className="font-bold text-green-500">Passed</span>{" "}
            (750/850)
            <br />
            <span className="text-sm text-gray-500">
              Data source: TransUnion
            </span>
          </p>
          <p className="pl-2">
            Verifying income... <span className="font-bold text-green-500">Passed</span>{" "}
            (R550,000/year)
            <br />
            <span className="text-sm text-gray-500">
              Data source: Employer Records (New Dawn I.T and SARS)
            </span>
          </p>
          <p className="pl-2">
            Checking employment status...{" "}
            <span className="font-bold text-green-500">Passed</span> (Full-time)
            <br />
            <span className="text-sm text-gray-500">
              Data source: Employer Verification (New Dawn I.T)
            </span>
          </p>
          <p className="pl-2">
            Validating identity... <span className="font-bold text-green-500">Passed</span>
            <br />
            <span className="text-sm text-gray-500">
              Data source: Home Affairs Department Database
            </span>
          </p>
          <p className="pl-2">
            Reviewing application history...{" "}
            <span className="font-bold text-green-500">Passed</span>
            <br />
            <span className="text-sm text-gray-500">
              Data source: Loan Application Records
            </span>
          </p>
          <p className="pl-2">
            Overall Result:{" "}
            <span className="text-green-500 font-bold text-xl">Eligible</span>
          </p>
          <button className="bg-blue-500 text-white rounded-xl py-2 px-4 mt-4 grid justify-self-end">
            Download detailed report
          </button>
        </div>
      );
    } else if (loan.LoanStatus === "Rejected") {
      return (
        <div className="my-8 grid gap-y-2">
          <h3 className="font-semibold text-xl">Eligibility Results</h3>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: "60%" }}></div>
          </div>
          <p className="pl-2">
            Checking credit score... <span className="font-bold text-green-500">Passed</span>{" "}
            (650/850)
            <br />
            <span className="text-sm text-gray-500">
              Data source: TransUnion
            </span>
          </p>
          <p className="pl-2">
            Verifying income... <span className="font-bold text-green-500">Passed</span>{" "}
            (R280,000/year)
            <br />
            <span className="text-sm text-gray-500">
              Data source: Employer Records (StructureIT and SARS)
            </span>
          </p>
          <p className="pl-2">
            Checking employment status...{" "}
            <span className="font-bold text-red-500">Failed</span> (Part-time)
            <br />
            <span className="text-sm text-gray-500">
              Data source: Employer Verification (StructureIT)
            </span>
          </p>
          <p className="pl-2">
            Validating identity... <span className="font-bold text-green-500">Passed</span>
            <br />
            <span className="text-sm text-gray-500">
              Data source: Home Affairs Department Database
            </span>
          </p>
          <p className="pl-2">
            Reviewing application history...{" "}
            <span className="font-bold text-green-500">Passed</span>
            <br />
            <span className="text-sm text-gray-500">
              Data source: Loan Application Records
            </span>
          </p>
          <p className="pl-2">
            Overall Result:{" "}
            <span className="text-red-500 font-bold text-xl">Not Eligible</span>
          </p>
          <button className="bg-blue-500 text-white rounded-xl py-2 px-4 mt-4 grid justify-self-end">
            Download detailed report
          </button>
        </div>
      );
    }
    
    return null;
  };

  const formatAmount = (amount: string) => {
    if (amount === null || amount === undefined) {
      return "n/a";
    }

    // Convert the amount to a number and ensure it has two decimal places
    let number = parseFloat(amount.replace(/[R,]/g, "")).toFixed(2);

    // Split the number into the integer part and the decimal part
    let [integerPart, decimalPart] = number.split(".");

    // Add commas as thousand separators
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Combine the integer part and decimal part
    return "R" + integerPart + "." + decimalPart;
  };

  const formatDate = (date: string) => {
    return date.split("T")[0];
  }

  return (
    <>
      <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
      {loanData?.map((loan) => {
        const fomattedDate = loan.createdAt.split("T")[0];
        const buttonContent =
          loan.LoanStatus === "Approved" ? (
            <button className="flex items-center gap-x-2 bg-green-500 text-white py-2 px-4 rounded-lg">
              <Check /> Completed
            </button>
          ) : loan.LoanStatus === "Rejected" ? (
            <button className="flex items-center gap-x-2 bg-red-500 text-white py-2 px-4 rounded-lg">
              <Ban /> Rejected
            </button>
          ) : (
            <button className="flex items-center gap-x-2 bg-blue-500 text-white py-2 px-4 rounded-lg">
              <Play /> Initiate
            </button>
          );

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
                <p className="flex justify-between items-center">
                  ID Number: <span>{loan.IdNumber}</span>
                </p>
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
                  Financial Solution: <span>{loan.LoanType}</span>
                </p>
                <hr />
                <p className="flex justify-between items-center">
                  Application Type: <span>{loan.ApplicationType}</span>
                </p>
                <hr />
                {loan.ApplicationType === "Loan" ? (
                  <>
                    <p className="flex justify-between items-center">
                      Loan Amount: <span>{formatAmount(loan.LoanAmount)}</span>
                    </p>
                    <hr />
                  </>
                ) : null}
                {loan.ApplicationType === "Investment" ? (
                  <>
                    <p className="flex justify-between items-center">
                      Investment Type: <span>{loan.InvestmentType}</span>
                    </p>
                    <hr />
                    {loan.InvestmentAmount !== "null" ? (
                      <>
                        <p className="flex justify-between items-center">
                          Investment Amount:
                          <span>{formatAmount(loan.InvestmentAmount)}</span>
                        </p>
                        <hr />
                      </>
                    ) : null}
                    {loan.EquityAmount !== "null" ? (
                      <>
                        <p className="flex justify-between items-center">
                          Equity Amount:{" "}
                          <span>{formatAmount(loan.EquityAmount)}</span>
                        </p>
                        <hr />
                      </>
                    ) : null}
                    {loan.sourceOfFunds !== "null" ? (
                      <>
                        <p className="flex justify-between items-center">
                          Source of Funds: <span>{loan.sourceOfFunds}</span>
                        </p>
                        <hr />
                      </>
                    ) : null}
                    {loan.purposeOfInvestment !== "null" ? (
                      <>
                        <p className="flex justify-between items-center">
                          Purpose of Investment:{" "}
                          <span>{loan.purposeOfInvestment}</span>
                        </p>
                      </>
                    ) : null}
                    <hr />
                  </>
                ) : null}{" "}
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
              <h3 className="flex items-center gap-x-2 text-blue-500 font-semibold text-2xl">
                <FileText /> Application Documents
              </h3>
              <div className="grid gap-y-2 my-8 px-4">
                <p>
                  <span className="text-blue-500 underline font-medium">
                    Attachment 1
                  </span>
                </p>
                <p>
                  <span className="text-blue-500 underline font-medium">
                    Attachment 2
                  </span>
                </p>
              </div>
            </div>

            <div className="my-8">
              <h2 className="flex items-center gap-x-2 text-blue-500 font-semibold text-2xl">
                <History /> Applicant History
              </h2>
              <div className="grid gap-y-2 mt-4 px-4">
                <p className="flex justify-between items-center">
                  Previous Applications <span>2</span>
                </p>
                <hr />
                <p className="flex justify-between items-center">
                  Last Application Date: <span>2023-07-27</span>
                </p>
                <hr />
                <p className="flex justify-between items-center">
                  Last Application Outcome: <span>Declined</span>
                </p>
                <hr />
              </div>
            </div>

            {loan.ApplicationType === "Loan" ? (
              <div>
                <h2 className="flex items-center gap-x-2 text-blue-500 font-semibold text-2xl">
                  <Clock /> Eligibility Check
                </h2>
                <hr />
                {loan.LoanStatus === "Pending" && <EligibilityCheck />}
                {loan.LoanStatus !== "Pending" &&
                  renderEligibilityResults(loan)}
              </div>
            ) : (
              <div className="my-12">
                <div className="flex justify-evenly items-center">

                <h2 className="text-3xl text-blue-500 font-medium my-8 text-center">Due Diligence Report</h2>
                <button className="bg-blue-500 text-white rounded-xl py-2 px-4 mt-4 flex gap-x-2"><Download/>
            Download report
          </button>
                </div>
                <Tabs defaultValue="overview">
                  <TabsList className="flex items-center justify-between ">
                    <TabsTrigger className="text-lg font-medium" value="overview">Overview</TabsTrigger>
                    <TabsTrigger className="text-xl font-medium" value="risk">Risk Assessment</TabsTrigger>
                    {loan.NameOfCompany !== "N/A" ? <TabsTrigger className="text-lg font-medium" value="financial">
                      Financial Performance
                    </TabsTrigger>: null}
                    
                    <TabsTrigger className="text-lg font-medium" value="market">Market Analysis</TabsTrigger>
                    <TabsTrigger className="text-lg font-medium" value="legal">Legal & Compliance</TabsTrigger>
                    <TabsTrigger className="text-lg font-medium" value="conclusion">Conclusion</TabsTrigger>
                  </TabsList>

                  {/* Overview Tab */}
                  <TabsContent value="overview">
                    <Card>
                      <CardHeader>
                        <CardTitle>Due Diligence Report Overview</CardTitle>
                        <CardDescription>
                          Review the general information about the investment
                          opportunity.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4 grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="font-semibold">
                            Investment Amount:
                          </Label>
                          <p className="text-gray-800">{formatAmount(loan.InvestmentAmount)}</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="font-semibold">
                            Investment Type:
                          </Label>
                          <p className="text-gray-800">Equity</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="font-semibold">
                            Investment Date:
                          </Label>
                          <p className="text-gray-800">{formatDate(loan.createdAt)}</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="font-semibold">
                            Expected Return:
                          </Label>
                          <p className="text-gray-800">20% Annual Return</p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Risk Assessment Tab */}
                  <TabsContent value="risk">
                    <Card>
                      <CardHeader>
                        <CardTitle>Risk Assessment</CardTitle>
                        <CardDescription>
                          Detailed assessment of potential risks associated with
                          the investment.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4 grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="font-semibold">Market Risks:</Label>
                          <p className="text-gray-800">
                            - High competition in the tech industry.
                            <br />
                            - Potential market fluctuations.
                            <br />- Regulatory changes impacting market
                            conditions.
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label className="font-semibold">
                            Operational Risks:
                          </Label>
                          <p className="text-gray-800">
                            - Dependency on key personnel.
                            <br />
                            - Potential supply chain disruptions.
                            <br />- Technological obsolescence.
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label className="font-semibold">
                            Financial Risks:
                          </Label>
                          <p className="text-gray-800">
                            - Cash flow variability.
                            <br />
                            - Profit margin fluctuations.
                            <br />- Capital requirement uncertainties.
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label className="font-semibold">Legal Risks:</Label>
                          <p className="text-gray-800">
                            - Compliance with industry regulations.
                            <br />
                            - Intellectual property disputes.
                            <br />- Contractual obligations and liabilities.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Financial Performance Tab */}
                  {loan.NameOfCompany !== "N/A" ? (
                    <>
                                      <TabsContent value="financial">
                    <Card>
                      <CardHeader>
                        <CardTitle>Financial Performance</CardTitle>
                        <CardDescription>
                          Overview of the company&apos;s financial performance
                          including historical data and projections.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4 grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="font-semibold">
                            Historical Revenue:
                          </Label>
                          <p className="text-gray-800">
                            R2M (2023), R1.5M (2022), R1.2M (2021)
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label className="font-semibold">
                            Projected Revenue:
                          </Label>
                          <p className="text-gray-800">
                            R5M (2024), R8M (2025), R10M (2026)
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label className="font-semibold">
                            Net Profit Margin:
                          </Label>
                          <p className="text-gray-800">
                            15% (2023), Projected 18% (2024)
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label className="font-semibold">EBITDA:</Label>
                          <p className="text-gray-800">
                            R300,000 (2023), Projected R800,000 (2024)
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                    </>
                  ):null}


                  {/* Market Analysis Tab */}
                  <TabsContent value="market">
                    <Card>
                      <CardHeader>
                        <CardTitle>Market and Competitive Analysis</CardTitle>
                        <CardDescription>
                          Analysis of the market landscape and competitive
                          environment.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label className="font-semibold">Market Size:</Label>
                          <p className="text-gray-800">
                            R10B with a CAGR of 20%
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label className="font-semibold">
                            Competitive Landscape:
                          </Label>
                          <p className="text-gray-800">
                            - Major competitors: ABC Corp, DEF Ltd.
                            <br />
                            - Market share distribution and competitor
                            strengths.
                            <br />- Competitive advantages of the company.
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label className="font-semibold">
                            SWOT Analysis:
                          </Label>
                          <p className="text-gray-800">
                            - Strengths: Innovative technology, strong team.
                            <br />
                            - Weaknesses: High R&D costs.
                            <br />
                            - Opportunities: Expanding market, strategic
                            partnerships.
                            <br />- Threats: Regulatory changes, market
                            saturation.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Legal & Compliance Tab */}
                  <TabsContent value="legal">
                    <Card>
                      <CardHeader>
                        <CardTitle>Legal and Compliance</CardTitle>
                        <CardDescription>
                          Review of legal considerations and regulatory
                          compliance.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label className="font-semibold">
                            Legal Structure:
                          </Label>
                          <p className="text-gray-800">
                            LLC, registered in South Africa
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label className="font-semibold">
                            Regulatory Compliance:
                          </Label>
                          <p className="text-gray-800">
                            - Adherence to FDA regulations.
                            <br />
                            - Compliance with data protection laws.
                            <br />- Intellectual property rights and
                            registrations.
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label className="font-semibold">
                            Pending Legal Issues:
                          </Label>
                          <p className="text-gray-800">
                            - Ongoing patent dispute with a competitor.
                            <br />- Review of recent contract negotiations.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Conclusion Tab */}
                  <TabsContent value="conclusion">
                    <Card>
                      <CardHeader>
                        <CardTitle>Conclusion and Recommendations</CardTitle>
                        <CardDescription>
                          Summary of the investment&apos;s strengths and
                          recommendations based on the due diligence findings.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label className="font-semibold">
                            Overall Assessment:
                          </Label>
                          <p className="text-gray-800">
                            The investment presents a strong opportunity with
                            high growth potential and solid financial
                            projections. However, it is important to monitor the
                            competitive landscape and manage operational risks.
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label className="font-semibold">
                            Recommendations:
                          </Label>
                          <p className="text-gray-800">
                            - Proceed with the investment but ensure ongoing
                            risk management.
                            <br />
                            - Conduct further review of pending legal issues.
                            <br />- Consider strategic partnerships to mitigate
                            competitive risks.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            <div>
              <h2 className="flex items-center gap-x-2 text-blue-500 font-semibold text-2xl">
                <ListChecks /> Application Stages
              </h2>

              <div className="grid gap-y-4 my-8 font-medium">
                <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between hover:bg-blue-100">
                  <h3>Initial Review</h3>
                  <button className="flex items-center gap-x-2 bg-green-500 text-white py-2 px-4 rounded-lg">
                    <Check /> Completed
                  </button>{" "}
                </div>
                <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between hover:bg-blue-100">
                  <h3>Detailed Assessment</h3>
                  <button className="flex items-center gap-x-2 bg-green-500 text-white py-2 px-4 rounded-lg">
                    <Check /> Completed
                  </button>{" "}
                </div>
                <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between hover:bg-blue-100">
                  <h3>Credit Committee Review</h3>
                  {buttonContent}
                </div>
                <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between hover:bg-blue-100">
                  <h3>Final Decision</h3>
                  {buttonContent}
                </div>
                <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between hover:bg-blue-100">
                  <h3>Loan Disbursement</h3>
                  {buttonContent}
                </div>
              </div>
            </div>

            <div className="flex justify-around items-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-x-4 py-2 px-4 rounded-lg text-white bg-red-500 hover:bg-red-600">
                    <AlertTriangle />
                    Override Eligibility Decision
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Override Eligibility Decision</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to override the eligibility
                      decision?
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid items-center gap-4">
                      <Label htmlFor="name">
                        Provide a reason for overriding the eligibility decision
                      </Label>
                      <Textarea
                        placeholder="Enter your reason here"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      className="bg-blue-500 text-white hover:bg-blue-700"
                    >
                      Submit Eligibility Decision
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <button className="flex items-center gap-x-4 py-2 px-4 rounded-lg text-white bg-blue-500">
                <Mail /> Request Additional Information
              </button>
              <button
                className="flex items-center gap-x-4 py-2 px-4 rounded-lg text-white bg-green-500"
                onClick={() => handleApprove(loan.id)}
              >
                <ThumbsUp /> Approve Application
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
