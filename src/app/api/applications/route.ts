import db from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await db.applications.findMany();

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  function generateUniqueId(length = 10) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
    }
    return result;
  }
  try {

    const data = await req.json();
    const {nameOfCompany, fullName, email, phone, address, city, province,equityAmount, postalCode,loanAmount,loanType,applicationType,country, rate, docs, applicantType,investmentType, projectName,  idNumber} = data;
    console.log(nameOfCompany, fullName, email, phone, address, city, province,applicationType,equityAmount, postalCode, loanAmount,loanType,country, rate, docs, applicantType,investmentType, projectName,  idNumber)
    const id = generateUniqueId();

    const applicationData = await db.applications.create({
      data: {
        id: id,
        NameOfCompany: nameOfCompany,
        ContactPerson: fullName,
        Email: email,
        PhoneNumber: phone,
        ApplicationType: applicationType,
        Address: address,
        City: city,
        EquityAmount: equityAmount,
        Rate: rate,
        LoanAmount: loanAmount,
        LoanType: loanType,
        ApplicantType: applicantType,
        Country: country,
        Docs: docs,
        InvestmentType: investmentType,
        ProjectName: projectName,
        IdNumber: idNumber,
        Province: province,
        PostalCode: postalCode,
      }
    })

    return NextResponse.json({ applicationData }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}