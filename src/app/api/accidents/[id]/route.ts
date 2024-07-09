import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/connect";
import { getAuth } from "@/context";
import { AccidentVisibility } from "@prisma/client";

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const auth = await getAuth();
  //@ts-ignore
  const authId = auth.userId;
  // grab data from the request
  const accidentId = params.id;



  //Check if the accident exists
  const accident = await db.accident.findUnique({
    where: {
      id: accidentId,
    },
  });

  if (!accident) {
    return new NextResponse(JSON.stringify({ message: "Accident not found" }), {
      status: 404,
    });
  }



  try {
    await db.accident.update({
      where: {
        id: accidentId,
      },
      data: {
        visibility: AccidentVisibility.Invissible
      }
    });
    return new NextResponse(JSON.stringify({ message: "Accident deleted" }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error, message: "Errror! failed to delete accident" }),
      { status: 500 }
    );
  }
};
export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const auth = await getAuth();

  // grab data from the request
  const data = await request.json()
  const accidentId = params.id;


  //Check if the accident exists
  const accident = await db.accident.findUnique({
    where: {
      id: accidentId,
    },
  });

  if (!accident) {
    return new NextResponse(JSON.stringify({ message: "Accident not found" }), {
      status: 404,
    });
  }

  if(data.status === "Complete"){


    // check if the file exist
    const file = await db.accidentFile.findUnique({
      where: {
        accidentId: accidentId
      }
    })


    if(!file){
      return new NextResponse(JSON.stringify({message: "Unable to complete the form without a file. Upload document first"}),
        {status: 403}
      )
    }
  }

  try {
    await db.accident.update({
      where: {
        id: accidentId,
      },
      data: {
        ...data
      }
    });
    return new NextResponse(JSON.stringify({ message: "Accident Updated successfully" }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error, message: " Failed to update accident" }),
      { status: 500 }
    );
  }
};
