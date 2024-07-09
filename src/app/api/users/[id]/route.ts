import {NextResponse} from "next/server"
import db from "@/utils/connect"
import { getAuth } from "@/context";
import { userUpdateSchema } from "@/schema";
import { UserActivity, UserActivityAction } from "@prisma/client";
import { deactivateUserTemplate, email, transporter } from "@/notifications";

export const PATCH = async (request: Request, {params}: {params: {id: string}}) => {

    const auth = await getAuth();
    //@ts-ignore
    const authId = auth.userId
    // grab data from the request
    const userId = params.id;
    const data = await request.json();
    
    //Check if the user exists
    const admin = await db.user.findUnique({
        where: {
            id: authId
        }
    })

    if(!admin) {
        return new NextResponse(JSON.stringify({message: "Unautheticated User"}), {status: 404});
    }
    //Check if the user exists
    const user = await db.user.findUnique({
        where: {
            id: userId
        }
    })

    if(!user) {
        return new NextResponse(JSON.stringify({message: "User not found"}), {status: 404});
    }

    const validate = userUpdateSchema.safeParse(data);
    if(!validate.success) {
        return new NextResponse(JSON.stringify({message: "Data validation Error!"}), {status: 406})
    }
    try {
       
         await db.user.update({
            where: {
                id: userId
                
            }, 
            data: {
                ...data
            }
        })

        try {
            await db.report.create({
                data: {
                    adminId: admin.id,
                    activity: UserActivity.User_Management,
                    userId: user.id,
                    activityAction: UserActivityAction.Update, 
                    message: `User  ${user.firstName} ${user.lastName} has been ${
                        data.status === "Active" ? "Activated" : data.status === "Inactive" ? "Deactivated" : "Removed"
                    } by 
                      ${admin.firstName} ${admin.lastName}
                    `
                }
            })
        } catch (error) {
            return new NextResponse( JSON.stringify({message: "User updated successfully, but failed to create a report"}) , {status: 200})
        }
        try {
            await transporter.sendMail({
                from: email,
                to: user.email,
                subject: "Account suspension",
                text: "Your account has been suspended",
                html: deactivateUserTemplate()
            })
        } catch (error) {
            await db.user.delete({
                where: {
                    id: user.id
                }
            })
            console.log(error)
            return new NextResponse( JSON.stringify({error, message: "Failed to send mail"}) , {status: 403})
        
        }
        return new NextResponse( JSON.stringify({message: "User updated successfully"}) , {status: 200})
    } catch (error) {
        return new NextResponse( JSON.stringify({error, message: "Failed to update user"}) , {status: 500})
        
    }
    
    
}
export const GET = async (request: Request, {params}: {params: {id: string}}) => {

    const auth = await getAuth();
    
    // grab data from the request
    const userId = params.id;

    try {
       
        const user =  await db.user.findUnique({
            where: {
                id: userId
                
            }
        })
        return new NextResponse( JSON.stringify(user) , {status: 200})
    } catch (error) {
        return new NextResponse( JSON.stringify({error, message: "Failed to retrieve user"}) , {status: 500})
        
    }
    
    
}