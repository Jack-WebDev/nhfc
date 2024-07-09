import { NextResponse } from "next/server";
import db from "@/utils/connect";

export const POST = async (request: Request) => {
  // grab data from the request
  const witness = await request.json();

  // check if the accident exists
  const accident = await db.accident.findUnique({
    where: {
      id: witness.accidentId,
    },
  });

  if (!accident) {
    return new NextResponse(
      JSON.stringify({
        message: "The accident you are adding to does not exist",
      }),
      { status: 404 }
    );
  }
  // creater accident

  try {
    await db.witness.create({
      data: {
        ...witness,
      },
    });
    return new NextResponse(
      JSON.stringify({ message: "Witness added successfully" }),
      { status: 201 }
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ error, message: "Failed to add witness" }),
      { status: 500 }
    );
  }
};
