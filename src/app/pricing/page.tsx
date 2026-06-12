"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "../(website)/_components/ui/moving-border";
import { useSubscription } from "@/hooks/useSubscription";

const plans = [
  {
    name: "Free",
    price: "₹0",
    description: "Perfect for testing out ClipSync features.",
    features: [
      "Workspace limit: 0 custom",
      "Server storage: 10 GB capacity",
      "File sharing: Up to 7 days",
      "Video recording: 5 min max limit",
      "Basic chatbot support"
    ],
    popular: false,
    cta: "Get Started",
  },
  {
    name: "PRO",
    price: "₹4500",
    description: "Best for creators and professionals.",
    features: [
      "Workspace limit: 10 custom",
      "Server storage: 100 GB capacity",
      "File sharing: Up to 30 days",
      "Video recording: 30 min max limit",
      "AI Title and Description generator",
      "Priority customer support"
    ],
    popular: false,
    cta: "Get Started",
  },
  {
    name: "Popular",
    price: "₹5000",
    description: "Optimal capacity for growing teams.",
    features: [
      "Workspace limit: 50 custom",
      "Server storage: 1 TB capacity",
      "File sharing: Up to 90 days",
      "Video recording: 2 hours max limit",
      "AI Title, Description & Transcript summary",
      "Full priority developer support"
    ],
    popular: true,
    cta: "Subscribe Now",
  },
  {
    name: "Enterprise",
    price: "₹7000",
    description: "Maximum capability for large organizations.",
    features: [
      "Workspace limit: Unlimited",
      "Server storage: Unlimited capacity",
      "File sharing: Full history recovery",
      "Video recording: 10 hours max limit",
      "Full premium AI capability support",
      "Dedicated 24/7 account manager"
    ],
    popular: false,
    cta: "Contact Sales",
  }
];

const Pricing = () => {
  const { onSubscribe } = useSubscription();

  return (
    <section className="min-h-screen bg-neutral-950 text-white py-16 px-6 sm:px-12 relative overflow-hidden bg-grid-white/[0.02]">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Back Button */}
      <div className="absolute top-8 left-6 sm:left-12 lg:left-24 z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-x-2 text-sm font-semibold text-neutral-400 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      <div className="max-w-6xl mx-auto mt-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 tracking-tight">
            Flexible Plans for Everyone
          </h2>
          <p className="mt-4 text-lg text-neutral-400 max-w-xl mx-auto">
            Choose a ClipSync plan that perfectly aligns with your workflow, custom workspaces, and recording needs.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col justify-between p-8 rounded-3xl border transition-all duration-300 relative group bg-neutral-900/60 backdrop-blur-sm ${
                plan.popular
                  ? "border-indigo-500 shadow-[0_0_24px_rgba(99,102,241,0.15)] ring-2 ring-indigo-500/30"
                  : "border-neutral-800 hover:border-neutral-700 hover:shadow-[0_0_20px_rgba(255,255,255,0.02)]"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md">
                  Most Popular
                </span>
              )}

              <div>
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-xs text-neutral-400 mb-6 min-h-[32px]">{plan.description}</p>
                <div className="flex items-baseline gap-x-1 mb-8">
                  <span className="text-4xl font-extrabold tracking-tight text-white">{plan.price}</span>
                  <span className="text-xs text-neutral-500">/month</span>
                </div>

                <hr className="border-neutral-800 mb-8" />

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-x-3 text-sm text-neutral-300">
                      <Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-6">
                {plan.popular ? (
                  <Button
                    className="w-full text-sm font-semibold py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90 border-none rounded-full"
                    onClick={onSubscribe}
                  >
                    {plan.cta}
                  </Button>
                ) : (
                  <Link href={plan.name === "Enterprise" ? "/contact" : "#"}>
                    <button className="w-full text-sm font-semibold py-3 px-4 rounded-full border border-neutral-700 bg-neutral-800/40 hover:bg-neutral-800 hover:border-neutral-600 transition duration-150 text-white">
                      {plan.cta}
                    </button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
