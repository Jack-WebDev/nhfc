"use client"

import React from 'react'
import ThemeToggler from './ThemeToggler'
import { Bell, AlignLeft, MessageCircle } from 'lucide-react'
import { Profile } from './Profile'
import { UiContextType, useUiStateContext } from '@/context'

export function TopNav  ()  {

  const {menu, toggleMenu} = useUiStateContext() as UiContextType
 
  return (
    <div className='flex items-center justify-between py-4 px-2 md:px-6 shadow-sm border-b sticky top-0 bg-white w-full'>
      <AlignLeft className='text-gray-500 cursor-pointer' 
      onClick={toggleMenu}
      />
      <div className='flex items-center gap-2'>
       <MessageCircle/>
       <Bell/>
        <Profile />
      </div>
    </div>
  )
}



