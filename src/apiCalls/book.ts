import url from "@/lib/apiUrl";
import db from "@/utils/connect";
import axios from "axios";

export async function fetchBooksByBatchId(batchId: number) {

    try {
        const books = await db.book.findMany({
            where: {
                batchId: batchId
            }
        })

        return {books: books, error: null};
    } catch (error) {
        return {books: null, error: error};
    }
}

export async function fetchSingleBook(bookNumber: number) {
    try {
        const book = await db.book.findUnique({
            where: {
                bookNumber: bookNumber
            }
        })
        return {book: book, error: null};
        
    } catch (error) {
        return {book: null, error: error};
    }
}

export async function getLastBookNumber(){

    try {
        const books = await db.book.findMany()

        if(!books || books.length === 0){
            return {error: null, bookNumber: 0}
        }
        const sorted = books.sort((a: any, b: any) => {
            return  b.bookNumber - a.bookNumber;
        })

        return {bookNumber: sorted[0].bookNumber, error: null}
    } catch (error) {
        return {error: error, bookNumber: null}
    }
}