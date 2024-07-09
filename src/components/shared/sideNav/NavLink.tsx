"use client"
import React, { Component, useEffect, useState } from 'react';
import Link from "next/link"
import { UiContextType, useUiStateContext } from '@/context';
import { usePathname } from 'next/navigation';


export const NavLink = (props: NavLinkProps) => {
  const [active, setActive] = useState(false)
  const {menu} = useUiStateContext() as UiContextType
  const display = menu === "open"? "flex" : "hidden"
  const {title, url, Icon} = props

  const location = usePathname().split("/")[2]
  const linkLocation = url.split("/")[2]
  

  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const list = document.querySelectorAll(".navLink")
    for(var i = 0; i < list.length; i++) {
      list[i].classList.remove("bg-blue-500" ,"text-white", "hover:border-blue-300", "font-semibold");
      list[i].classList.add("text-gray-400");
      list[i].children[0].classList.remove("text-white")
     
    }
    
    e.currentTarget.classList.add("bg-blue-500", "text-white", "hover:border-blue-300", "font-semibold");
    e.currentTarget.children[0].classList.add("text-white")

  }

  useEffect(() => {
    

    if(location === linkLocation){
      
      setActive(true)
    }
    
  },[location, title, url])

  const cls = active ? "bg-blue-500 text-white hover:border-blue-500 font-semibold" : "bg-transparent"
  const iconCls = active? "text-white" : "text-blue-500"
  
  return (
    
    <Link href={url}
        className={
          `navLink flex items-center text-gray-500 text-sm justify-center md:justify-start gap-4 w-fit md:w-full py-2 px-2 md:px-8  ${cls} `
        }
        onClick={(e) => handleClick(e)}
    >
        {<Icon size={18} className='text-inherit'/>}
        <p 
          
        className={
          `hidden md:${display} text-inherit `
        }>{title}</p>
    </Link>
  )
}



type NavLinkProps = {
    title: string,
    url: string,
    Icon: React.ElementType
}