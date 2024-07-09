import React from 'react'
import { BookActions } from '../actions';



export function TabHeader (props: TabHeaderProps)  {
    
    const {title, type} = props;

  return (
    <div className="flex items-center justify-between">
        <p className='font-semibold text-sm '>{title}</p>
        <BookActions type={type}/>
    </div>
  )
}

type TabHeaderProps = {
    title: string,
    type: number
}

