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
    const {nameOfCompany, fullName, email, phone, address, city, province, postalCode,country, loanAmount,loanType} = data;
    console.log(nameOfCompany, fullName, email, phone, address, city, province, postalCode,country, loanAmount,loanType)

    const applicationData = await db.applications.create({
      data: {
        NameOfCompany: nameOfCompany,
        ContactPerson: fullName,
        Email: email,
        PhoneNumber: phone,
        Address: address,
        City: city,
        LoanAmount: loanAmount,
        LoanType: loanType,
        Province: province,
        PostalCode: postalCode,
        Country: country,
      }
    })

    return NextResponse.json({ applicationData }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}