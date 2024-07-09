import db from "@/utils/connect";


export async function accidentFile(accisentId: string){

    try {
        const file = await db.accidentFile.findUnique({
            where: {
                accidentId: accisentId
            }
        })
        return file
    } catch (error) {
        return null
    }
}