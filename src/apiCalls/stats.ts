import db from "@/utils/connect";
import { AccidentStatus } from "@prisma/client";


export async function fetchVehicles(){

    try {
        const vehicles = await db.vehicle.findMany();
        return vehicles
    } catch (error) {
        return []
    }
}
export async function fetchDrivers(){

    try {
        const drivers = await db.driver.findMany();
        return drivers
    } catch (error) {
        return []
    }
}
export async function fetchPassengers(){

    try {
        const passengers = await db.passenger.findMany();
        return passengers
    } catch (error) {
        return []
    }
}
export async function fetchAccidentsByStatus(status: AccidentStatus){

    try {
        const accidents = await db.accident.findMany({
            where: {
                status: status
            }
        });
        return accidents
    } catch (error) {
        return []
    }
}