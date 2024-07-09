import db from "@/utils/connect";
import { UserActivity } from "@prisma/client";


export async function fetchAllReports(){

    try {
        const reports = await db.report.findMany();
        return {reports: reports, error: null}
    } catch (error) {
        return {reports: null, error: error}
    }
}
export async function fetchAllReportsByType(type: string){
    let actionType = ""
    switch(type){
      case "User_Management":
        actionType = UserActivity.User_Management;
        break;
      case "Book_Management":
        actionType = UserActivity.Book_Management
        break;
      case "Batch_Management":
        actionType = UserActivity.Batch_Management;
        break;
      case "Notice_Management":
        actionType = UserActivity.Notice_Management
        break;
    }
    try {
        const reports = await db.report.findMany({
            where: {
                activity: actionType as UserActivity
            }
        });
        return {reports: reports, error: null}
    } catch (error) {
        return {reports: null, error: error}
    }
}