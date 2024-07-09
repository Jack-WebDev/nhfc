import { NextResponse } from "next/server";
import db from "@/utils/connect";

export const POST = async (request: Request) => {
  // grab data from the request
  const driverData = await request.json();

  // check if the accident exists
  const accident = await db.accident.findUnique({
    where: {
        id: driverData.accidentId
    }
  })

  if(!accident){
    return new NextResponse(
        JSON.stringify({message: "The accident you are adding to does not exist" }),
        { status: 404 }
      );
  }

  // check if the driver already exists
  const driver = await db.driver.findFirst({
    where: {
      accidentId: driverData.accidentId,
      driverRef: driverData.driverRef
    }
  })

  if(driver){
    return new NextResponse(
      JSON.stringify({message: `driver ${driver.driverRef} has already been added for this accident`}),
      { status: 409 }
    );
  }

  // creater accident

  try {
    await db.driver.create({
      data: {
        ...driverData,
      },
    });
    return new NextResponse(
      JSON.stringify({ message: "Driver added successfully" }),
      { status: 201 }
    );
  } catch (error) {
    
    return new NextResponse(
      JSON.stringify({ error, message: "Failed to add driver" }),
      { status: 500 }
    );
  }
};
