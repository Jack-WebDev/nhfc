import React from 'react'
import { BookOpenText, FileText, Users } from 'lucide-react'
import { PageHeader } from '@/components'
import { UserManagement } from '@/modules/report/tabs/userManagement'
import { ReportForm } from '@/modules/accidentReports'

 async function Page  ()  {

  
  return (
    <div className='flex flex-col gap-4 w-full '  >
        <div className='flex items-center justify-between mb-16 '>

            <PageHeader Icon={FileText} title='Accidents reports'/>
            
        </div>
        
        <div className='w-fulll h-full flex items-center justify-center'>
            <ReportForm />
        </div>
      
    </div>
  )
}

export default Page
