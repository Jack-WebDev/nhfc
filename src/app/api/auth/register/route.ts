import {NextResponse} from "next/server"
import db from "@/utils/connect"
import bcrypt from "bcrypt"
import { UserStatus } from "@prisma/client";


export const POST = async (request: Request) => {

    // grab data from the request
    const data = await request.json();
    const {password, email, phone ,idNumber, ethnicity, role, gender, title} = data

    const emailExist = await db.user.findUnique({
        where:{email: email}
    });

    if(emailExist) {
        return new NextResponse(JSON.stringify({message: "Email already registered"}), {status: 409})
    }
    const phoneExist = await db.user.findUnique({
        where:{phone: phone}
    });

    if(phoneExist) {
        return new NextResponse(JSON.stringify({message: "Phone number already registered"}), {status: 409})
    }
    const IdNumberExist = await db.user.findUnique({
        where:{IdNumber: idNumber}
    });

    if(IdNumberExist) {
        return new NextResponse(JSON.stringify({message: "ID Number already registered"}), {status: 409})
    }
    
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    
    try {
        await db.user.create({
            data: {
                ...data,
                password: hashedPassword,
                status: UserStatus.Inactive
            }
        })
        return new NextResponse( JSON.stringify({message: "User created successfully"}) , {status: 201})
    } catch (error) {
        return new NextResponse( JSON.stringify({error, message: "Failed to create user"}) , {status: 500})
        
    }
    
    
}