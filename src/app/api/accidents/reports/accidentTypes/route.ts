import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/connect";

export const GET = async (request: NextRequest) => {
  // grab data from the request
  const query = decodeURI(request.url).split("=")[1]
  

   try {
    const stats = await db.accident.aggregate({
        _sum: {
            numberOfDead: true,
            numberOfNotInjured: true,
            numberOfSeriouslyInjured: true,
            numberOfSlightlyInjured: true,
        },

        where: {
            accidentType: query
        }
        
    })
    return new NextResponse(
        JSON.stringify(stats._sum),
        { status: 200 }
      );
   } catch (error) {
    return new NextResponse(
        JSON.stringify({error, message: "Error fetching information"}),
        { status: 404 }
      );
   }
  
  
 
};


