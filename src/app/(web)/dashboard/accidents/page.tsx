import { fetchAccidents } from '@/apiCalls'
import { DataTable, PageHeader } from '@/components'
import { AccidentActions, accidentColumns } from '@/modules'
import { CarFront } from 'lucide-react'
import React from 'react'

const  Page = async() => {
  const {accidents, error} = await fetchAccidents();
 
  return (
    <div className='flex flex-col gap-4 w-full'>
      <div className="flex items-center justify-between w-full">
        <PageHeader Icon={CarFront} title="Accidents" />
        <AccidentActions />

      </div>
        {accidents && <DataTable  searchColumn={"province"} search={false} data={accidents} columns={accidentColumns}/>}
    </div>
  )
}

export default Page
