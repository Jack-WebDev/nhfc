import {NextResponse} from "next/server"
import db from "@/utils/connect"


export const POST = async (request: Request) => {


    // grab data from the request
    const data = await request.json(); 
    const {
        accidentSchema,
        areaSchema,
        generalInfoSchema,
        
      } = data

    // check the accidenr register number
    const accident = await db.accident.findUnique({
        where: {
            AR_number: accidentSchema.AR_number
        }
    });

    if(accident){
        return new NextResponse(JSON.stringify({message: "Accident register number already in the system"}), {status: 409})
    }

    // creater accident
    
    try {
        
        const newAccident = await db.accident.create({
            data: {
                ...accidentSchema
            }
        })

        // Add the area  to the accident
        try {
            await db.area.create({

                data: {
                    ...areaSchema,
                    accidentId: newAccident.id
                }
            })

            // Add generat informatioin
            try {
                await db.generalDetail.create({
                    data: {
                        ...generalInfoSchema,
                        accidentId: newAccident.id
                    }
                })

                return new NextResponse(JSON.stringify({message: "Accident added", accidentId: newAccident.id}), {status: 201})

            } catch (error) {
                return new NextResponse(JSON.stringify({error, message: "Failed to add general information"}), {status: 500})
            }
        } catch (error) {
            return new NextResponse(JSON.stringify({error, message: "Failed to add area information"}), {status: 500})
        }

    } catch (error: any) {
        return new NextResponse(JSON.stringify({error, message: "Failed to add accident"}), {status: 500})
    }
    
    
    
}

