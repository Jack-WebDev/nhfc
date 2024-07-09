import db from "@/utils/connect";
import { BookStatus } from "@prisma/client";

export async function fetchBatchByType(batchType: number){
    
    try {
        const batch = await db.batch.findMany({
            where: {
                batchType: batchType
            }
        })

        return {batch: batch, error: null}
    } catch (error) {
        return {batch: [], error: error}
    }
}


export async function fetchSingleBatchBybatchId(id: number) {

    try {
        const batch = await db.batch.findUnique({
            where: {
                batchId: id
            }
        })

        return {batch: batch, error: null}
    } catch (error) {
        return {batch: null, error: error}
    }
}

export async function fetchAllBatches(){
     try {
        const batches = await db.batch.findMany()
        return batches
     } catch (error) {
        return [];
     }
}
export async function fetchAllBooks(){
     try {
        const books = await db.book.findMany()
        return books
     } catch (error) {
        return [];
     }
}
export async function fetchAllBooksByStatus(status: BookStatus){
     try {
        const books = await db.book.findMany({
            where: {
                status: status
            }
        })
        return books
     } catch (error) {
        return [];
     }
}
export async function fetchAllNotices(){
     try {
        const notices = await db.notice.findMany()
        return notices
     } catch (error) {
        return [];
     }
}
export async function fetchAllNoticesByStatus(status: string){
     try {
        const notices = await db.notice.findMany({
            where: {
                status: status
            }
        })
        return notices
     } catch (error) {
        return [];
     }
}