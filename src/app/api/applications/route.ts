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
  try {

    const data = await req.json();
    const {nameOfCompany, fullName, email, phone, address, city, province, postalCode,loanAmount,loanType,country, rate, docs, applicantType,investmentType, projectName,  idNumber} = data;
    console.log(nameOfCompany, fullName, email, phone, address, city, province, postalCode, loanAmount,loanType,country, rate, docs, applicantType,investmentType, projectName,  idNumber)

    const applicationData = await db.applications.create({
      data: {
        NameOfCompany: nameOfCompany,
        ContactPerson: fullName,
        Email: email,
        PhoneNumber: phone,
        Address: address,
        City: city,
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