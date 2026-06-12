import { Button } from '@/components/ui/button'
import React from 'react'
import Loader from '../loader'
import { useSubscription } from '@/hooks/useSubscription'

type Props = {}

const PaymentButton = (props: Props) => {
  const { onSubscribe, isProcessing } = useSubscription()

  return (
    <Button
      className="text-xs w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-sm hover:shadow-indigo-500/10 transition-all duration-200 font-semibold"
      onClick={onSubscribe}
    >
      <Loader
        color="#fff"
        state={isProcessing}
      >
        Upgrade
      </Loader>
    </Button>
  )
}

export default PaymentButton