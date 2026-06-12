import { getPaymentInfo } from "@/actions/user";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { ArrowBigRight } from "lucide-react";
import React from "react";

type Props = {};

const BillingPage = async (props: Props) => {
  const payment = await getPaymentInfo();

  return (
    <div className="bg-[#09090b]/40 backdrop-blur-sm border border-neutral-900 flex flex-col gap-y-6 p-6 rounded-2xl max-w-2xl">
      <div>
        <h2 className="text-base font-semibold text-neutral-100">Current Plan</h2>
        <p className="text-neutral-500 text-xs">View plan subscriptions, pricing details, and manage renewals</p>
      </div>

      <div className="flex justify-between items-center bg-neutral-950/45 border border-neutral-900/60 rounded-xl p-5 mt-1">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Pricing Details</span>
          <span className="text-2xl font-bold text-neutral-100">
            {payment?.data?.subscription?.plan === "PRO" ? "₹5,000" : "₹0"}
            <span className="text-sm font-medium text-neutral-500">/month</span>
          </span>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 uppercase tracking-wider">
            {payment?.data?.subscription?.plan || "FREE"}
          </span>
          <span className="text-neutral-500 text-[10px]">Active Status</span>
        </div>
      </div>

      <div className="flex items-center justify-start border-t border-neutral-900/60 pt-5 mt-2">
        <a
          href="/pricing"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm hover:shadow-indigo-500/10 cursor-pointer"
        >
          <span>Upgrade to Enterprise</span>
          <ArrowBigRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default BillingPage;
