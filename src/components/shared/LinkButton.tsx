import React from 'react'
import Link from "next/link"
import { Button } from '@/components'



export const LinkButton = (props: LinkButtonProps) => {

    const {title, url, textColor, deco} = props;
  return (
    deco ? 
    <Link href={url} className='w-full'>
        <p className={textColor? `font-normal text-sm text-[${textColor}]` : 'font-normal text-sm text-gray-500'}>{title}</p>
    </Link>
    :
    <Link href={url} className='w-full hover:underline '>
        <p className={textColor? `font-normal text-sm text-[${textColor}]` : 'font-normal text-sm text-gray-500'}>{title}</p>
    </Link>
  )
}

export const LinkIconButton = (props: LinkIconButtonProps) => {

    const {title, url, textColor,link , Icon} = props;
  return (
    link ?
    <Link href={url as string} className='w-full flex items-center hover:underline gap-4 ' style={{textDecoration: "none"}}>
        <Icon size={14} className='text-gray-500 justify-start gap-2 cursor-pointer rounded-full hover:bg-gray-100'/>
        <p className={textColor? `font-normal text-xs text-[${textColor}]` : 'font-normal text-sm text-gray-500'}>{title}</p>
    </Link>
    :
    <Button variant="ghost"  className='w-full flex items-center hover:underline gap-4 justify-start text-gray-500 hover:bg-[#f6bb48] hover:text-white '
      style={{textDecoration: "none"}}
    >
        <Icon size={14} className='justify-start gap-2 cursor-pointer rounded-full hover:bg-gray-100'/>
        <p className={textColor? `font-normal text-xs ` : 'font-normal text-sm '}>{title}</p>
    </Button>

  )
}




export type LinkButtonProps = {
    title: string,
    url: string,
    textColor?: string,
    deco?: boolean
}

export type LinkIconButtonProps = {
    link?: boolean,
    title: string,
    url?: string,
    textColor?: string,
    Icon: React.ElementType,
    onClick?: () => Promise<void>
}