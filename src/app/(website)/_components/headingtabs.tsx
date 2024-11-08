"use client";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
export function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "Your",
      className: "text-white",
    },
    {
      text: "Journey",
      className: "text-white",
    },
    {
      text: "Through",
      className: "text-white",
    },
    {
      text: "Clipsync",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[9rem]  ">
      <TypewriterEffectSmooth words={words} />
    </div>
  );
}
