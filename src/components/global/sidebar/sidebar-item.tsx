import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

type Props = {
  icon: React.ReactNode
  title: string
  href: string
  selected: boolean
  notifications?: number
}

const SidebarItem = ({ href, icon, selected, title, notifications }: Props) => {
  return (
    <li className="cursor-pointer my-1 px-1">
      <Link
        href={href}
        className={cn(
          'flex items-center justify-between group rounded-xl px-3 py-2 border transition-all duration-200',
          selected 
            ? 'bg-neutral-900 border-neutral-800/80 text-neutral-100 shadow-sm' 
            : 'bg-transparent border-transparent hover:bg-neutral-900/30 hover:border-neutral-900/40 text-neutral-400 hover:text-neutral-200'
        )}
      >
        <div className="flex items-center gap-3 transition-all cursor-pointer">
          <span className={cn(
            'transition-colors duration-200',
            selected ? 'text-indigo-400' : 'text-neutral-500 group-hover:text-neutral-400'
          )}>
            {icon}
          </span>
          <span className="font-semibold text-sm tracking-wide truncate w-32">
            {title}
          </span>
        </div>
        
        {notifications && notifications > 0 ? (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-bold text-indigo-400">
            {notifications}
          </span>
        ) : null}
      </Link>
    </li>
  )
}

export default SidebarItem
