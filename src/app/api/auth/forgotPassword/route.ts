import {NextResponse} from "next/server"
import db from "@/utils/connect"
import { transporter } from "@/notifications";


export const POST = async (request: Request) => {
    const sessionDays = Number(process.env.NEXT_PUBLIC_USER_SESSION_Days as string);

    // grab data from the request
    const data = await request.json();
    const {email} = data

    // find the user by email
    const user = await db.user.findUnique({
        where:{email: email}
    });

    if(!user) {
        return new NextResponse(JSON.stringify({message: "Account not found"}), {status: 404})
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    
    try {
        await db.otp.upsert({
            where: {
                userId: user.id
            },
            update: {
                otp: otp,
                date: new Date(Date.now() + 15 * 60 * 1000)
            },
            create: {
               userId: user.id,
               otp: otp,
               date: new Date(Date.now() + 15 * 60 * 1000)
            }
        })
        try {
            await transporter.sendMail({
                from: email,
                to: user.email,
                subject: "Alfred Duma Municipality",
                text: `Your OPT is: ${otp}`,
               
            })
        } catch (error) {
            await db.otp.delete({
                where: {
                    userId: user.id
                }
            })
            console.log(error)
            return new NextResponse( JSON.stringify({error, message: "Failed to send OTP, try again later"}) , {status: 403})
        
        }
        return new NextResponse( JSON.stringify({message: "An OTP has been sent to your email"}) , {status: 201})
    } catch (error) {
        return new NextResponse( JSON.stringify({error, message: "Failed to create OTP"}) , {status: 500})
        
    }
    
    
}