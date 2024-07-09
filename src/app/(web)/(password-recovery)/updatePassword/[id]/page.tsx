import { ChangePasswordForm } from '@/modules'
import React from 'react'
import {z} from "zod"


const schema = z.string().cuid();
const isCUID = (id: string) => schema.safeParse(id).success;

const page = (props: ChangePasswordPageProps) => {

  const { params } = props;
  
    if (!isCUID(params.id)) {
      return null;
    }

  return (
    <div className='flex  w-full h-screen justify-center items-center'>
        <div className='flex flex-col gap-3 bg-white shadow-lg rounded-lg p-8 border border-gray-100'>
            <h1 className='text-lg font-semibold'>Reset Password</h1>
            <p className='text-sm text-gray-500 '>All access to the system is blocked untill you reset your password</p>

            <ChangePasswordForm userId={params.id}/>
        </div>
    </div>
  )
}

export default page


type ChangePasswordPageProps = {
  params: Record<string, string>;
  searchParams: Record<string, string>;
};