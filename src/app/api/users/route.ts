import {NextResponse} from "next/server"
import db from "@/utils/connect"
import bcrypt from "bcrypt"
import crypto from "crypto"
import { randomGenerator } from "@/lib/methods"
import { getAuth } from "@/context";
import { userSchema } from "@/schema"
import { IdNumberExists, emailExists, phoneExists } from "@/validation"
import { UserActivity, UserActivityAction } from "@prisma/client"
import { createUserTemplate, email, transporter } from "@/notifications"


export const POST = async (request: Request) => {


    const auth = await getAuth();
    //@ts-ignore
    const userId = auth?.userId
   

    const admin = await db.user.findUnique({
        where: { id: userId },
      })
    
      if(!admin) {
        return new NextResponse(
          JSON.stringify({ message: "Unauthenticated User" }),
          { status: 406 }
        );
      }
    
    
    if(!auth) {
        return new NextResponse(JSON.stringify({message: "Unauthenticated User"}), {status: 406})
    }


    // grab data from the request
    const data = await request.json();
    
    const validate = userSchema.safeParse(data);
    if(!validate.success) {
        return new NextResponse(JSON.stringify({message: "Data validation Error!"}), {status: 406})
    }

    // check for duplicate fields
    const duplicateEmail = await emailExists(data.email);
    if(duplicateEmail) return new NextResponse(JSON.stringify({message: "Email already exist"}), {status: 409});

    const duplicatePhone = await phoneExists(data.phone);
    if(duplicatePhone) return new NextResponse(JSON.stringify({message: "Phone number already exist"}), {status: 409});

    const duplicateIdNumber = await IdNumberExists(data.IdNumber);
    if(duplicateIdNumber) return new NextResponse(JSON.stringify({message: "ID number already exist"}), {status: 409})

    //Generate password
    const password = randomGenerator(4);
    // hash the passWord
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    
    try {
       
        const user = await db.user.create({
            data: {
                ...data,
                password: hashedPassword,
                
            }
        })

        try {
            await db.report.create({
                data: {
                    adminId: admin.id,
                    activity: UserActivity.User_Management,
                    userId: user.id,
                    activityAction: UserActivityAction.Create, 
                    message: `User  ${user.firstName} ${user.lastName} has been created by 
                      ${admin.firstName} ${admin.lastName} with the role of ${user.role.split("_").join(" ")}
                    `
                }
            })
        } catch (error) {
            await db.user.delete({
                where: {
                    id: user.id
                }
            })
            
            return new NextResponse( JSON.stringify({message: "Failed to create report, Try again later"}) , {status: 403})
   
        }

        const accountDetails = {
            email: user.email,
            password: password,
            role: user.role,
            status: user.status
        }

        try {
            await transporter.sendMail({
                from: email,
                to: accountDetails.email,
                subject: "New account created",
                text: "We have created an account for you in the book management system",
                html: createUserTemplate(accountDetails)
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
        return new NextResponse( JSON.stringify({message: "User created successfully", accountDetails}) , {status: 201})
    } catch (error) {
        return new NextResponse( JSON.stringify({error, message: "Failed to create user"}) , {status: 500})
        
    }
    
    
}
export const GET = async (request: Request) => {

    const auth = await getAuth();
    //@ts-ignore
    const authUser = auth?.user
    
    if(!auth) {
        return new NextResponse(JSON.stringify({message: "Unauthenticated User"}), {status: 406})
    }

    if((authUser?.role !== "SUPERUSER") && (authUser?.role !== "ADMIN")) {
        return new NextResponse(JSON.stringify({message: "Unauthorized"}), {status: 401})
    }

    try {
        const users = await db.user.findMany();
        return new NextResponse( JSON.stringify(users) , {status: 200})
        
    } catch (error) {
        return new NextResponse( JSON.stringify(error) , {status: 500})
      }
    
    
}
