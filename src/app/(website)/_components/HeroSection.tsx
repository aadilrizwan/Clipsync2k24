import Link from "next/link";
import { Spotlight } from "./ui/Spotlight";
import { User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { TextGenerateEffect } from "./ui/text-generate-effect";

type Props = {
  className?: string;
};
const words = `ClipSync is a video messaging platform designed for asynchronous communication, particularly in work environments. It allows users to quickly create and share videos by recording their screen, webcam, or both.`;
const HeroSection = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "h-auto md:h-[45rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-16 md:py-0",
        className,
      )}
    >
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#4f46e5"
      />
      <div className="p-4 relative z-10 w-full text-center max-w-4xl mx-auto flex flex-col items-center justify-center">
        {/* Intro Badge */}
        <div className="mb-6 flex items-center gap-2 px-4 py-1.5 bg-indigo-950/20 border border-indigo-900/60 rounded-full text-[10px] md:text-xs text-indigo-400 font-semibold tracking-wider uppercase select-none shadow-inner">
          <Sparkles size={12} className="text-indigo-400 animate-pulse" />
          <span>
            Introducing ClipSync &middot; Asynchronous Video Messaging
          </span>
        </div>

        <h1 className="mt-4 text-5xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 via-neutral-100 to-indigo-500 tracking-tight pb-2">
          ClipSync
        </h1>
        <div className="mt-6 font-normal text-sm md:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed">
          <TextGenerateEffect words={words} />
        </div>

        <div className="mt-12">
          <Link href="/auth/sign-in">
            <button className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold shadow-lg hover:shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border border-indigo-500/35 text-xs md:text-sm uppercase flex items-center justify-center gap-2.5 mx-auto">
              <User size={16} className="text-indigo-200" />
              <span>Get Started Free</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
