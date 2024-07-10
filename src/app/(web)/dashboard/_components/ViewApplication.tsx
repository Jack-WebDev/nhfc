"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

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
  console.log(loanData)


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
        <h1>Application ID: {params.id}</h1>
    </>
  );
}