import React from 'react'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type Props = {
  title: string
  description: string
  children?: React.ReactNode
  footer?: React.ReactNode
}

const GlobalCard = ({ title, children, description, footer }: Props) => {
  return (
    <Card className="bg-gradient-to-b from-neutral-900/40 to-neutral-900/10 dark:border-neutral-900 mt-4 rounded-xl shadow-md overflow-hidden backdrop-blur-sm">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm font-semibold text-neutral-200 tracking-tight">{title}</CardTitle>
        <CardDescription className="text-neutral-400 text-xs mt-1 leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      {children && <div className="p-4 pt-0">{children}</div>}
      {footer && <CardFooter className="p-4 pt-0">{footer}</CardFooter>}
    </Card>
  )
}

export default GlobalCard
