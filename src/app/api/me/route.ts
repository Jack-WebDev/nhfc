import {NextResponse} from "next/server"
import db from "@/utils/connect"
import { getAuth } from "@/context";

export const GET = async (request: Request) => {

    const auth = await getAuth();
    //@ts-ignore
    const userId = auth?.userId
    
    if(!auth) {
        return new NextResponse(JSON.stringify({message: "Unauthenticated User"}), {status: 406})
    }

    try {
        const user = await db.user.findUnique({
            where: {
                id: userId
            }
        })

        if(!user) {
            return new NextResponse(JSON.stringify({message: "User not found"}), {status: 404});
        }

        const {password, ...others} = user

        const profile = {
            ...others,
        }

        return new NextResponse(JSON.stringify(profile), {status: 200})
    } catch (error) {
        return new NextResponse(JSON.stringify({message: "Failed to retrieve profile"}), {status: 500})
    }

}