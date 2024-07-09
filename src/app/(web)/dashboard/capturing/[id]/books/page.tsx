
import React from 'react'
import { BatchInfo, BatchReport} from '@/modules'
import { fetchBooksByBatchId } from '@/apiCalls/book'
import { DataTable, PageHeader } from '@/components'
import { bookColumns } from '@/modules/book/columns'
import { Container } from 'lucide-react'


 async function Page  (props: UserPageProps)  {

  const {params} = props
  const batchId = Number(params.id)

  const {books, error} = await fetchBooksByBatchId(batchId)

  
  return (
    <div className='flex flex-col gap-4 w-full '  >

        <PageHeader Icon={Container} title='Batch' />

        <BatchInfo batchId={batchId}/>
        <div className='flex flex-col gap-2  w-full '>
 
          <p className='text-md font-semibold'>Books</p>
        { books && <DataTable search={true} searchColumn='bookNumber' columns={bookColumns} data={books}/>}
        {books && <BatchReport books={books}/>}
        </div>
      
    </div>
  )
}

export type UserPageProps = {
  params: Record<string, string>;
  searchParams: Record<string, string>;
};


export default Page
