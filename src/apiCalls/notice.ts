import db from "@/utils/connect";


export async function fetchNoticeByBookNumber(bookNumber: number) {

    try {
        const notices = await db.notice.findMany({
            where: {
                bookNumber: bookNumber
            }
        })

        return {notices: notices, error: null};
    } catch (error) {
        return {notices: [], error: error};
    }
}
