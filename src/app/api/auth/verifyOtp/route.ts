import { NextResponse } from "next/server";
import db from "@/utils/connect";

export const POST = async (request: Request) => {
  // grab data from the request
  const data = await request.json();
  const { otp } = data;

  console.log(otp);
  try {
    
      // find the otp
      const otpData = await db.otp.findUnique({
        where: { otp: Number(otp) },
      });

      console.log("here")
    
      if (!otpData) {
        return new NextResponse(JSON.stringify({ message: "Invalid Otp" }), {
            status: 404,
        });
      }
    
      
      // Check if the OTP has expired
      const timeDifference = Number(new Date(otpData.date)) - Number(new Date(Date.now()))

      if(timeDifference <= 0){
        return new NextResponse(JSON.stringify({ message: "OTP has expired" }), {
            status: 404,
        });

      }
      // find the user
      const user = await db.user.findUnique({
          where: { id: otpData.userId },
        });
        
        if (!user) {
            return new NextResponse(JSON.stringify({ message: "Account not found" }), {
                status: 404,
            });
        }
        
        return new NextResponse(
            JSON.stringify({
                message: "Correct Otp, wait while we redirect you to the next step",
                userId: otpData?.userId,
            }),
            { status: 200 }
            );
        } catch (error) {
          return new NextResponse(JSON.stringify({ message: "Otp error" }), {
              status: 500,
            });
        }
};
