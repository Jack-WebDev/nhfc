"use client"

import { UserStatus } from '@prisma/client'
import axios from 'axios'
import React from 'react'

const page = () => {

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            email: "dakalo997@gmail.com",
            title: "Mr",
            firstName: "Dakalo",
            lastName: "Mbulaheni",
            ethnicity: "Black",
            phone: "07216554872",
            IdNumber: "46781386",
            role: "Admin",
            password: "dk970329"
        }

        try {
            const res = await axios.post(`${baseUrl}/auth/register`, {...data})
            
        } catch (error) {
            
        }
    }


  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register your account with us
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" onSubmit={handleSubmit}>
            
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>
          </form>

          
        </div>
      </div>
  )
}

export default page
