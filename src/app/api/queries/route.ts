import db from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await db.queries.findMany();

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {

    const data = await req.json();
    const {referenceNo, fullName, queryType, description, appliedLoan, attachments} = data;

    const adminQueries = await db.queries.create({
        data: {
            referenceNo: referenceNo,
            fullName: fullName,
            queryType: queryType,
            describeQuery: description,
            loanAppliedFor: appliedLoan,
            clientAttachment: attachments,
        }})

    return NextResponse.json({ adminQueries }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}