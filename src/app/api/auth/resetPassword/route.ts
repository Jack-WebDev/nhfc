import {NextResponse} from "next/server"
import db from "@/utils/connect"
import bcrypt from "bcrypt"
import { cookies } from "next/headers";
import { UserActivity, UserActivityAction } from "@prisma/client";


export const POST = async (request: Request) => {
    const sessionDays = Number(process.env.NEXT_PUBLIC_USER_SESSION_Days as string);

    // grab data from the request
    const data = await request.json();
    const {userId, password} = data

    // find the user
    const user = await db.user.findUnique({
        where:{id: userId}
    });

    if(!user) {
        return new NextResponse(JSON.stringify({message: "User not found"}), {status: 404})
    }

    // find the otp
    const otp = await db.otp.findUnique({
        where:{userId: userId}
    });

    if(!otp) {
        return new NextResponse(JSON.stringify({message: "OTP not found"}), {status: 404})
    }

    const timeDifference = Number(new Date(otp.date)) - Number(new Date(Date.now()))
    if(timeDifference <= 0){
        return new NextResponse(JSON.stringify({message: "OTP has expired"}), {status: 404})
    }

    // hash the passWord
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

  
    
    try {
        await db.user.update({
            where: {id: userId},
         
            data: {
                passwordChangedAt: new Date(Date.now()),
                nextPasswordChangedAt: new Date(Date.now()  + sessionDays * 24 * 60 * 60 * 1000),
                password: hashedPassword
            }
        })
        cookies().delete("authToken");

        return new NextResponse( JSON.stringify({message: "Password saved successfully"}) , {status: 201})
    } catch (error) {
        return new NextResponse( JSON.stringify({error, message: "Failed to create user"}) , {status: 500})
        
    }
    
    
}