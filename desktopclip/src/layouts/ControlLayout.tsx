import { cn } from '@/lib/utils'
import { UserButton } from '@clerk/clerk-react'
import React, { useState } from 'react'

type Props = {
    children: React.ReactNode
    classname?:string
}

const ControlLayout = ({children,classname}: Props) => {
    const [isVisible,setIsVisible] = useState<boolean>(false)
    window.ipcRenderer.on("hide-plugin",(event,payload)=>{
        console.log(event)
        setIsVisible(payload.state)
    })
  return (
    <div className={cn(classname,isVisible&& 'invisible',
        'bg-[#171717] flex px-1 flex-col rounded-3xl overflow-hidden h-screen'
    )}>
      <div className='flex justify-between items-center p-5 draggable'>
        <span className='non-draggable'>
          <UserButton/>
        </span>

      </div>
    </div>
  )
}

export default ControlLayout