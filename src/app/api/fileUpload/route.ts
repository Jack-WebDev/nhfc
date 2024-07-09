import {NextRequest, NextResponse} from "next/server"
import db from "@/utils/connect"
import { getAuth } from "@/context";

export const POST = async (request: NextRequest) => {

    const auth = await getAuth();
    //@ts-ignore
    const userId = auth?.userId
    const data = await request.json();
    
    if(!auth) {
        return new NextResponse(JSON.stringify({message: "Unauthenticated User"}), {status: 406})
    }

    try {
        await db.accidentFile.upsert({
            where: {
                accidentId: data.accidentId
            },
            update: {
                file: data.file,
                fileType: data.fileType
            },
            create: {
                ...data
            },
        })


        return new NextResponse(JSON.stringify({message: "File added successfully"}), {status: 201})
    } catch (error) {
        return new NextResponse(JSON.stringify({message: "Failed to add file"}), {status: 500})
    }

}