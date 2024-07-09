import React from 'react'



export function TabHeader (props: TabHeaderProps)  {
    

  return (
    <div className="flex items-center justify-between">
        <p className='font-semibold text-sm '>{props.title}</p>
        
    </div>
  )
}

type TabHeaderProps = {
    title: string,

}

