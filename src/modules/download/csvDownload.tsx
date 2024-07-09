'use client'
import { Button } from '@/components'
import React from 'react'
import {CSVDownload, CSVLink} from "react-csv"


export const ExportToCSV = (props: Props) => {
    const {data} = props
  return (
    <div className='flex items-center w-full'>
        <Button variant={"main"}>
            Download csv
            <CSVDownload  data={data} />
        </Button>
        <CSVLink data={data}>Download me</CSVLink>;
    </div>
  )
}


type Props = {
    data: any
}