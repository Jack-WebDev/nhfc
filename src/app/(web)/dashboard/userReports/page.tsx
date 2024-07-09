
import React from 'react'
import { BookOpenText, FileText, Users } from 'lucide-react'
import { PageHeader } from '@/components'
import { ReportTabs } from '@/modules/report/tabs'
import { UserManagement } from '@/modules/report/tabs/userManagement'



 async function Page  ()  {

  
  return (
    <div className='flex flex-col gap-4 w-full '  >
        <div className='flex items-center justify-between '>

            <PageHeader Icon={FileText} title='User reports'/>
            
        </div>
        
        <UserManagement />
      
    </div>
  )
}

export default Page
