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

  // check if the driver already exists
  const observation = await db.personObservation.findFirst({
    where: {
      accidentId: data.accidentId,
      personNumber: data.personNumber,
      vehicleNumber: data.vehicleNumber
    }
  })

  if(observation){
    return new NextResponse(
      JSON.stringify({message: `observation for person ${observation.personNumber}  in vehicle ${observation.vehicleNumber} has already been added for this accident`}),
      { status: 409 }
    );
  }

  // creater observation

  try {
    await db.personObservation.create({
      data: {
        ...data,
      },
    });
    return new NextResponse(
      JSON.stringify({ message: "Observation added successfully" }),
      { status: 201 }
    );
  } catch (error) {
   
    return new NextResponse(
      JSON.stringify({ error, message: "Failed to add observation" }),
      { status: 500 }
    );
  }
};
