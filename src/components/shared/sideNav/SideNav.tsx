"use client"

import React from 'react'
import Logo from './Logo'
import Staff from './staff'
import { UiContextType, useUiStateContext } from '@/context'

export const SideNav = () => {
  const {menu} = useUiStateContext() as UiContextType
  const width = menu === "open"? "64" : "fit"
  return (
    <div className={
      `h-screen  flex flex-col items-start gap-0 w-fit md:w-${width} pb-2 pt-0 bg-white shadow-lg border-r-gray-200 text-white sticky top-0`
    }>
      <Logo />
      <Staff />
    </div>
  )
}

