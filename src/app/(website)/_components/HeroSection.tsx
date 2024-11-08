import Link from "next/link";
import { Spotlight } from "./ui/Spotlight";
import { Button } from "./ui/moving-border";
import { User } from "lucide-react";
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
        "h-auto md:h-[40rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0",
        className
      )}
    >
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="gold" />
      <div className="p-4 relative z-10 w-full text-center">
        <h1
          className="mt-20 md:mt-0 text-4xl md:text-7xl
        font-bold bg-clip-text text-transparent 
        bg-gradient-to-b from-neutral-50 to-neutral-400"
        >
          Clip Sync
        </h1>
        <p
          className="mt-4 font-normal text-base md:text-lg text-yellow-300
         max-w-lg mx-auto"
        >
          <TextGenerateEffect words={words} />
        </p>

        <div className="mt-4">
          <Link href="/auth/sign-in">
            <Button
              borderRadius="1.75rem"
              className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
            >
              <User fill="#000" />
              JOIN US
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
