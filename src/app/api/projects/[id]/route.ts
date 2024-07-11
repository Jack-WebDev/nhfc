import db from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await db.projects.findMany({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await req.json();

    try {
      await db.projects.delete({
        where: {
          id: params.id,
        },
      });
    } catch (error) {
      console.error("Error inserting data:", error);
    }

    return NextResponse.json("Yes", { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
