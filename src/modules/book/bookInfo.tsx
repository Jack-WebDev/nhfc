import { fetchSingleBatchBybatchId } from '@/apiCalls/batch'
import { fetchBooksByBatchId, fetchSingleBook } from '@/apiCalls/book'
import { Badge } from '@/components'
import React from 'react'


export async function BookInfo  (props: BookInfoProps)  {
    const {bookId, batchId} = props
    const {book, } = await fetchSingleBook(bookId)
    const {batch, error} = await fetchSingleBatchBybatchId(batchId)

    const fields = [
        {
            id: 1,
            label: "Book Number:",
            value: book?.bookNumber,
        },
        {
            id: 2,
            label: "Book Type:",
            value: batch && batch.batchType,
        },
        {
            id: 3,
            label: "First Notice:",
            value: book?.firstNotice,
        },
        {
            id: 4,
            label: "Last Notice:",
            value: book?.lastNotice,
        },
        {
            id: 5,
            label: "Total Pages:",
            value: book?.total,
        },
        {
            id: 6,
            label: "Pages Completed:",
            value: book?.complete,
        },
    ]



  return (
    <div className='flex flex-col gap-4 w-full shadow-md rounded-lg p-4 bg-white'>
        <Badge
            className='w-max self-end'
            variant={book?.status === "New_Stock" ? "red" : book?.status === "Issued" ? "orange": book?.status === "Re_Issued" ? "blue" : "green"} 
        >{book?.status.split("_").join(" ")}</Badge>
        <div className='flex flex-wrap items-center justify-between w-full gap-4'>
            {
                fields.map((item) => (
                    <div className='flex flex-col gap-1 items-center' key={item.id}>
                        <p className='text-sm font-semibold text-gray-500'>{item.label}</p>
                        <p className='text-sm font-semibold text-blue-500'>{item.value}</p>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

type BookInfoProps = {

    bookId: number
    batchId: number

}
