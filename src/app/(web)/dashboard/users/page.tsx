
import React from 'react'
import { Users } from 'lucide-react'
import { PageNotFoundError } from 'next/dist/shared/lib/utils'
import { PageHeader } from '@/components'
import { UserActions, userColumns } from '@/modules'
import { fetchUsers } from '@/apiCalls'
import { DataTable } from '@/components/ui'
import { getAuth } from '@/context'



 async function Page  ()  {

  const {users, error} = await fetchUsers();
  const auth = await getAuth();
  //@ts-ignore
  const userId = auth.userId;

  const userList = users?.filter((user) => user.id !== userId)
  return (
    <div className='flex flex-col gap-4 w-full '  >
        <div className='flex items-center justify-between '>

            <PageHeader Icon={Users} title='Users'/>
            <UserActions action='create'/>
        </div>
        {userList && <DataTable search={true} searchColumn='firstName' columns={userColumns} data={userList}/>}
      
    </div>
  )
}

export default Page
