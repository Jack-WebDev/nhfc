"use client"
import { Button } from '@/components'
import { File, FileText } from 'lucide-react'
import React from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { ReportDocument } from './document'
import { BookType } from '@/schema'



export function BatchReport (props: BatchReportProps)  {

  return (
    <div className='flex items-center gap-3 justify-end'>
      <PDFDownloadLink document={<ReportDocument type='First Print' books={props.books}/>} fileName='First print report'>
        {
          ({loading}) => loading? 
          <Button disabled variant="main" className="flex items-center text-white">
            <FileText size={20} className="text-white mr-2" />
            <span className="text-white font-medium  text-xs font-xs">Loading document....</span>
        </Button>
        :
        <Button variant="main" className="flex items-center text-white">
            <FileText size={20} className="text-white mr-2" />
            <span className="text-white font-medium  text-xs font-xs">First print report</span>
        </Button>
        }
      </PDFDownloadLink>


      <PDFDownloadLink document={<ReportDocument type='Latest Update' books={props.books}/>} fileName='First print report'>
        {
          ({loading}) => loading? 
          <Button disabled variant="main" className="flex items-center text-white">
            <FileText size={20} className="text-white mr-2" />
            <span className="text-white font-medium  text-xs font-xs">Loading document....</span>
        </Button>
        :
        <Button variant="main" className="flex items-center text-white">
            <FileText size={20} className="text-white mr-2" />
            <span className="text-white text-xs font-medium font-xs">Latest update report</span>
        </Button>
        }
      </PDFDownloadLink>
        
    </div>
  )
}

type BatchReportProps = {
    books: BookType[]
}