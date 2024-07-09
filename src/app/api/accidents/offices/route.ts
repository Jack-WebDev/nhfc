import { NextResponse } from "next/server";
import db from "@/utils/connect";

export const POST = async (request: Request) => {
  // grab data from the request
  const data = await request.json();

  // check if the accident exists
  const accident = await db.accident.findUnique({
    where: {
        id: data.accidentId
    }
  })

  if(!accident){
    return new NextResponse(
        JSON.stringify({message: "The accident you are adding to does not exist" }),
        { status: 404 }
      );
  }

  // check if the office has been added already
  const office = await db.office.findFirst({
    where: {
        accidentId: data.accidentId,
        officeType: data.officeType,
    }
  });

  if(office) {
    return new NextResponse(
        JSON.stringify({message: "You have already added an office of this type" }),
        { status: 409 }
      );
  }




  // create office

  try {
    await db.office.create({
      data: {
        ...data,
        capturingNumber: accident.capturingNumber
      },
    });
    return new NextResponse(
      JSON.stringify({ message: "Office added successfully" }),
      { status: 201 }
    );
  } catch (error) {
    
    return new NextResponse(
      JSON.stringify({ error, message: "Failed to add office" }),
      { status: 500 }
    );
  }
};
