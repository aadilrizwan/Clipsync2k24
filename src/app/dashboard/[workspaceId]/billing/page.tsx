import { getPaymentInfo } from "@/actions/user";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { ArrowBigRight } from "lucide-react";
import React from "react";

type Props = {};

const BillingPage = async (props: Props) => {
  const payment = await getPaymentInfo();

  return (
    <div className="bg-[#1D1D1D] flex flex-col gap-y-8 p-5 rounded-xl">
      <div>
        <h2 className="text-2xl text-white">Current Plan</h2>
        <p className="text-[#9D9D9D]">Your Payment Histroy</p>
      </div>
      <div>
        <h2 className="text-2xl text-white">
          {payment?.data?.subscription?.plan === "PRO" ? "5000 " : "0 "}Rs/Month
        </h2>
        <p className="text-[#9D9D9D]">{payment?.data?.subscription?.plan}</p>
      </div>

      <div className="flex items-center space-x-4 justify-center">
        <a
          href="/pricing"
          className="text-black text-center border bg-gray-300 p-2 font-semibold rounded-md cursor-pointer hover:bg-white transition duration-75"
        >
          Upgrade to Enterprise
        </a>
      </div>
    </div>
  );
};

export default BillingPage;
