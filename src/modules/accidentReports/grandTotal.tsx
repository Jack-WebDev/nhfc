

import React from 'react'
import { DataItem } from './dataItem';
import { ChartView } from './chartView';

export const GrandTotal = async (props: GrandTotalProps) => {

  


  const {fatal, serious, slight, noInjury} = props

  console.log("fatal: ", {fatal})
  return (


    <div className='w-full flex items-start justify-between p-6 gap-10 bg-white shadow-sm border border-gray-100 rounded-lg'>

    <div className='w-1/3 flex flex-col gap-4  bg-white shadow- border border-gray-100 rounded-lg p-4 '>
      <h1 className='text-md font-semibold border-b border-gray-100 pb-1 w-fit'>Grand total</h1>

      <div className='flex flex-col gay-2 w-full '>
        <DataItem label='Fatal' value={fatal}/>
        <DataItem label='Seriously injured' value={serious}/>
        <DataItem label='Slightly Injured' value={slight}/>
        <DataItem label='No injury' value={noInjury}/>
      </div>
    </div>

    <div className='flex flex-col gap-3 w-2/3 items-center bg-white shadow-lg border border-gray-100 rounded-lg p-4'>
      <h1 className='text-md font-semibold border-b border-gray-100 pb-1 w-fit'>Graphical representation</h1>

      <ChartView fatal={fatal? fatal : 0} serious={serious? serious: 0} slight={slight? slight : 0} noInjury={noInjury? noInjury : 0}/>
    </div>
    </div>
  )
}

type GrandTotalProps = {
  fatal: number,
  serious: number,
  slight: number
  noInjury: number,
}


