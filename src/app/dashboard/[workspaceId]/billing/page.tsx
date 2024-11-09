
import { getPaymentInfo } from '@/actions/user'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { ArrowBigRight } from 'lucide-react'
import React from 'react'

type Props = {}

const BillingPage = async (props: Props) => {
  const payment = await getPaymentInfo()

  return (
    <div className="bg-[#1D1D1D] flex flex-col gap-y-8 p-5 rounded-xl">
      <div>
        <h2 className="text-2xl text-white">Current Plan</h2>
        <p className="text-[#9D9D9D]">Your Payment Histroy</p>
      </div>
      <div>
        <h2 className="text-2xl text-white">
          {payment?.data?.subscription?.plan === 'PRO' ? '5000 ' : '0 '}Rs/Month
        </h2>
        <p className="text-[#9D9D9D]">{payment?.data?.subscription?.plan}</p>
      </div>

      <div className='flex items-center space-x-4'>
  <a href='/pricing' className='text-white text-3xl border-2 rounded-md p-2 w-fit bg-black 
  shadow-[0_0_15px_10px_rgba(232,207,205,1)]'>
    Explore More About Prices ->
  </a>
</div>
    </div>
  )
}

export default BillingPage
