import {NextResponse} from "next/server"
import db from "@/utils/connect"
import { getAuth } from "@/context";
import { userUpdateSchema } from "@/schema";
import { UserActivity, UserActivityAction } from "@prisma/client";
import { fetchSingleUser } from "@/apiCalls";

export const GET = async (request: Request, {params}: {params: {id: string}}) => {

 
    
    // grab data from the request
    const bookNumber = params.id;

    try {
       
        const book = await db.book.findUnique({
            where: {
                bookNumber: Number(bookNumber)
            }
        })
        return new NextResponse( JSON.stringify(book) , {status: 200})
    } catch (error) {
        return new NextResponse( JSON.stringify({error, message: "Failed to get book"}) , {status: 500})
        
    }
    
    
}

export const PATCH = async (request: Request, {params}: {params: {id: string}}) => {

    const auth = await getAuth();
    //@ts-ignore
    if (!auth) {
        return new NextResponse(
          JSON.stringify({ message: "Unauthenticated User" }),
          { status: 406 }
        );
      }
    const authId = auth?.userId;

  const admin = await db.user.findUnique({
    where: { id: authId },
  })

  if(!admin) {
    return new NextResponse(
      JSON.stringify({ message: "Unauthenticated User" }),
      { status: 406 }
    );
  }
    
    // grab data from the request
    const bookNumber = Number(params.id);
    const data = await request.json();
    
    //Check if the book exists
    const book = await db.book.findUnique({
        where: {
            bookNumber: bookNumber
        }
    })

    if(!book) {
        return new NextResponse(JSON.stringify({message: "book not found"}), {status: 404});
    }

    
    try {
       
         await db.book.update({
            where: {
                bookNumber: bookNumber
                
            }, 
            data: {
                ...data
            }
        })

        try {
            const {user, error} = await fetchSingleUser(data.officerId);
            await db.report.create({
                data: {
                    adminId: authId,
                    activity: UserActivity.Book_Management,
                    bookNumber: bookNumber,
                    activityAction: UserActivityAction.Update, 
                    message: `The book with book number ${bookNumber} has been ${data.status} by 
                      ${admin.firstName} ${admin.lastName} ${data.status === "Issued" ? `to officer: ${user?.firstName} ${user?.lastName}` : data.status === "Re_Issued" ? `to officer: ${user?.firstName} ${user?.lastName}` : ""}`
                }
            
            })
        } catch (error) {
            await db.book.update({
                where: {
                    bookNumber: book.bookNumber,
                },
                data: {
                    status: book.status
                }
            })
            return new NextResponse( JSON.stringify({message: "Failed to create activity report, try again later"}) , {status: 403})
        }
        return new NextResponse( JSON.stringify({message: "Book updated successfully"}) , {status: 200})
    } catch (error) {
        return new NextResponse( JSON.stringify({error, message: "Failed to update the book"}) , {status: 500})
        
    }
    
    
}