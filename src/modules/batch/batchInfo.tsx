import { fetchSingleBatchBybatchId } from '@/apiCalls/batch'
import React from 'react'
import { batchTypeString } from './batchType'
import { Badge } from '@/components'
import { User } from '..'


export async function BatchInfo  (props: BatchInfoProps)  {
    const {batchId} = props
    const {batch,  error} = await fetchSingleBatchBybatchId(batchId);


    const fields = [
        {
            id: 1,
            label: "Batch Number:",
            value: batch?.batchId,
        },
        {
            id: 2,
            label: "Batch Type:",
            value: batch && batchTypeString(batch.batchType).toString(),
        },
        {
            id: 3,
            label: "First Notice:",
            value: batch?.firstNotice,
        },
        {
            id: 4,
            label: "Captured By:",
            value: batch?.capturedBy,
        },
    ]



  return (
    <div className='flex flex-wrap items-center justify-between w-full p-4 bg-white shadow-md rounded-lg gap-4'>
        {
            fields.map((item) => (

                item.id === 4 ?
                <div className='flex flex-col gap-1 items-center' key={item.id}>
                    <p className='text-sm font-semibold text-gray-500'>{item.label}</p>
                    <User userId={item.value as string}/>
                </div>  :

                <div className='flex flex-col gap-1 items-center' key={item.id}>
                    <p className='text-sm font-semibold text-gray-500'>{item.label}</p>
                    <p className='text-sm font-semibold text-blue-500'>{item.value}</p>
                </div>
            ))
        }
    </div>
  )
}

type BatchInfoProps = {

    batchId: number

}
