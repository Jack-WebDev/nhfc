import {z} from "zod";

    //Vehicle 1
 export const velicleSchema = z.object({

        travelDirection: z.string(),
        plateNumber: z.string(),
        color: z.string(),
        make: z.string(),
        model: z.string(),
        trailer1Plate: z.string().optional(),
        trailer2Plate: z.string().optional(),
        carryPassengersForReward: z.string(),
        breakdownCompanyName: z.string().optional(),
        breakdownTelephoneNumber: z.string().optional(),
        breakdowndriverName: z.string().optional(),
        type: z.string(),
        position: z.string(),
        manoeuvre: z.string(),
        slope: z.string(),
        damage: z.string(),
    }).array();

