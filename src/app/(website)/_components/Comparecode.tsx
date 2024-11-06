import React from "react";
import { Compare } from "./ui/compare";

export function CompareDemo() {
  return (
    <div className="w-full h-[80vh] flex flex-col items-center justify-center [perspective:800px] [transform-style:preserve-3d]">
      <h2 className="md:text-7xl text-3xl lg:text-4xl font-bold text-center text-white relative mt-0 mb-9">Production Compare</h2>
      <div
        style={{
          transform: "rotateX(15deg) translateZ(80px)",
        }}
        className="p-1 md:p-4 border rounded-3xl dark:bg-neutral-900 dark:border-neutral-800 w-full max-w-lg h-[60vh] md:h-3/4 flex items-center justify-center"
      >
        <Compare
          firstImage="/code.png"
          secondImage="/home.png"
          firstImageClassName="object-cover object-left-top w-full"
          secondImageClassname="object-cover object-left-top w-full"
          className="w-full h-full rounded-[22px] md:rounded-lg"
          slideMode="hover"
          autoplay={true}
        />
      </div>
    </div>
  );
}
