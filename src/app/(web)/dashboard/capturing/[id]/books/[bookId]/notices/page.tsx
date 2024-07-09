
import React from 'react'
import { BatchInfo} from '@/modules'
import { fetchBooksByBatchId } from '@/apiCalls/book'
import { DataTable, PageHeader } from '@/components'
import { bookColumns } from '@/modules/book/columns'
import { fetchNoticeByBookNumber } from '@/apiCalls/notice'
import { BookActions, BookInfo } from '@/modules/book'
import { noticeColumns } from '@/modules/notice'
import { BookOpen } from 'lucide-react'


 async function Page  (props: UserPageProps)  {

  const {params} = props
  const bookId = Number(params.bookId)
  const batchId = Number(params.id)

  const {notices, error} = await fetchNoticeByBookNumber(bookId)

  
  return (
    <div className='flex flex-col gap-4 w-full '  >

        <PageHeader Icon={BookOpen} title='Book'/>

        <BookInfo bookId={bookId} batchId={batchId}/>
        <div className='flex flex-col gap-2  w-full '>
 
          <p className='text-md font-semibold'>Notices</p>
        { notices && <DataTable search={true} searchColumn='noticeNumber' columns={noticeColumns} data={notices}/>}
        <div className='w-full flex items-center justify-end gap-3'>
          <BookActions action='issue' bookNumber={bookId}/>
        </div>
        </div>
      
    </div>
  )
}

export type UserPageProps = {
  params: Record<string, string>;
  searchParams: Record<string, string>;
};


export default Page
