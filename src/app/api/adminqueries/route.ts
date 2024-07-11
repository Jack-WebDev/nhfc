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
    const {referenceNo, fullName, queryType, queryDate, queryStatus, description, appliedLoan, attachments} = data;

    const adminQueries = await db.adminQueries.create({
        data: {
            referenceNo: referenceNo,
            fullName: fullName,
            queryType: queryType,
            queryDate: queryDate,
            queryStatus: queryStatus,
            description: description,
            appliedLoan: appliedLoan,
            attachments: attachments,
        }})

    return NextResponse.json({ adminQueries }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}