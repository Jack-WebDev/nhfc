import React from 'react'
import { TabHeader } from './tabHeader'
import { fetchBatchByType } from '@/apiCalls/batch'
import { DataTable } from '@/components';
import { batchColumns } from '../columns';


export async function Section56 ()  {

  const {batch, error} = await fetchBatchByType(50);

  return (
    <div className='flex flex-col gap-2'>
        <TabHeader title="Section 56" type={50}/>

          <DataTable search={true} data={batch} columns={batchColumns} searchColumn="batchId"/>
        
    </div>


  )
}