import db from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const query = await db.queries.findMany({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json(query, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const {queryStatus} = await req.json();
  // console.log(queryStatus);
  try {
    const query = await db.queries.update({
      where: {
        id: params.id,
      },
      data: {

        queryStatus: queryStatus,

      },
    });

    return NextResponse.json(query, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
