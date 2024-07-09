"use client"
import React from 'react'
import {Button} from "@/components"



export function Error (props: ErrorProps)  {


  return (
    <div className='w-full flex flex-col p-4 rounded-lg shadow-md bg-white'>
        <p>Sorry we couldn&rsquot get what you were looking for</p>

        <Button variant="main" onClick={() => location.reload}>
            Reload
        </Button>
    </div>
  )
}

type ErrorProps = {}