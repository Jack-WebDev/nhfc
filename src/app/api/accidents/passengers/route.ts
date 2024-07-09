import { NextResponse } from "next/server";
import db from "@/utils/connect";

export const POST = async (request: Request) => {
  // grab data from the request
  const passengerData = await request.json();

  // check if the accident exists
  const accident = await db.accident.findUnique({
    where: {
      id: passengerData.accidentId,
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

  const duplicatePassenger = await db.passenger.findFirst({
    where: {
      accidentId: passengerData.accidentId,
      vehicleNumber: passengerData.vehicleNumber,
      passengerNumber: passengerData.passengerNumber
    }
  })

  if(duplicatePassenger) {
    return new NextResponse(
      JSON.stringify({ message: `Passenger ${duplicatePassenger.passengerNumber} in vehicle ${duplicatePassenger.vehicleNumber} is already added` }),
      { status: 409 }
    );
  }


  // creater accident

  try {
    await db.passenger.create({
      data: {
        ...passengerData,
      },
    });
    return new NextResponse(
      JSON.stringify({ message: "Passenger added successfully" }),
      { status: 201 }
    );
  } catch (error: any) {
   
    return new NextResponse(
      JSON.stringify({ error, message: "Failed to add passenger" }),
      { status: 500 }
    );
  }
};
