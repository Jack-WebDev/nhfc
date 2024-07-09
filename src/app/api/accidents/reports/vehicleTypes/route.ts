import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/connect";
import { accidentType } from "@/modules";
import { AccidentType } from "@/schema/accident";

export const GET = async (request: NextRequest) => {
  // grab data from the request
  const query = decodeURI(request.url).split("=")[1];

  try {
    const vehicles = await db.vehicle.findMany({
      where: {
        type: query,
      },
    });

    // Map througn each vehicle and find its accident
    let accidents: AccidentType[] = [];
    let fatal = 0;
    let serious = 0;
    let slight = 0;
    let noInjury = 0;

    for (let i = 0; i < vehicles.length; i++) {
      const accident = await db.accident.findFirst({
        where: {
          id: vehicles[i].accidentId,
        },
      });

      accident && accidents.push(accident);
    }

    for (let i = 0; i < accidents.length; i++) {
      fatal += accidents[i].numberOfDead;
      serious += accidents[i].numberOfSeriouslyInjured;
      slight += accidents[i].numberOfSlightlyInjured;
      noInjury += accidents[i].numberOfNotInjured;
    }

    const res = {
      numberOfDead: fatal,
      numberOfSeriouslyInjured: serious,
      numberOfSlightlyInjured: slight,
      numberOfNotInjured: noInjury,
    };

    console.log(res);
    return new NextResponse(JSON.stringify({ ...res }), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error, message: "Error fetching information" }),
      { status: 404 }
    );
  }
};
