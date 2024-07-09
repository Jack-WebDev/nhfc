import { NextResponse } from "next/server";
import db from "@/utils/connect";

export const POST = async (request: Request) => {
  // grab data from the request
  const vehicleData = await request.json();

  // check if the accident exists
  const accident = await db.accident.findUnique({
    where: {
      id: vehicleData.accidentId,
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

  // check if the vehicle already exists
  const vehicle = await db.vehicle.findFirst({
    where: {
      accidentId: vehicleData.accidentId,
      vehicleRef: vehicleData.vehicleRef
    }
  })

  if(vehicle){
    return new NextResponse(
      JSON.stringify({message: `Vehicle ${vehicle.vehicleRef} has already been added for this accident`}),
      { status: 409 }
    );
  }
  // creater accident

  try {
    await db.vehicle.create({
      data: {
        ...vehicleData,
      },
    });
    return new NextResponse(
      JSON.stringify({ message: "Vehicle added successfully" }),
      { status: 201 }
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ error, message: "Failed to add vehicle" }),
      { status: 500 }
    );
  }
};
