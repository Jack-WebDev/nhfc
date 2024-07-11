import db from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await db.userQueries.findMany();

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {

    const data = await req.json();
    const {referenceNo, fullName, queryType, queryDate, queryStatus, description, appliedLoan, file} = data;
    console.log(referenceNo, fullName, queryType, queryDate, queryStatus, description, appliedLoan, file)

    const userQueries = await db.userQueries.create({
        data: {
            referenceNo: referenceNo,
            fullName: fullName,
            queryType: queryType,
            queryDate: queryDate,
            queryStatus: queryStatus,
            description: description,
            appliedLoan: appliedLoan,
            attachments: file,
        }
    })

    return NextResponse.json({ userQueries }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}