"use client"
import React from 'react';
import { Sun, Moon } from 'lucide-react';

type Props = {}

const ThemeToggler = (props: Props) => {
    const theme: string = "dark"
  return (
    <div className='grid w-fit'>
        {
            theme === "light"? <Moon size={35} className='text-gray-500 p-2 cursor-pointer rounded-full hover:bg-gray-100'/>  
            : <Sun size={35} className='text-gray-500 p-2 cursor-pointer rounded-full hover:bg-gray-100' />
        }
    </div>
  )
}

export default ThemeToggler