"use server"

import { fetchSingleUser } from '@/apiCalls'
import React from 'react'

export async function CapturingUser (props: CapturingUserProps) {

    const {userId} = props;
    console.log(userId)
    const {user, error } = await fetchSingleUser(userId ? userId : "");
    const userFullName = user?.firstName + " " + user?.lastName;

  return (
     error? <p>Failed to fetch user</p> :

     <p className='text-inherit font-inherit'>{userFullName}</p>
  )
}


type CapturingUserProps = {
    userId: string
}

