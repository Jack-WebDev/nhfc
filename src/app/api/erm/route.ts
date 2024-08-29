import db from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await db.eRM.findMany();

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
