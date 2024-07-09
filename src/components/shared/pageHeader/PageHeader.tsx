import React from 'react'



export const PageHeader = (props: Props) => {
    const {title, Icon} = props
  return (
    <div className='flex items-center gap-4'>

        <div className='bg-blue-500 p-3 rounded-lg'>
            <Icon className="text-white" size={18}/>
        </div>
        <span className='font-semibold text-lg'>{title}</span>
    </div>
  )
}


type Props = {
    title: string,
    Icon: React.ElementType
}