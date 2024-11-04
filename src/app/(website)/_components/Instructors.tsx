"use client";
import { SparklesCore } from "./ui/sparkles";
import { AnimatedTooltip } from "./ui/animated-tooltip";

const instructors = [
  {
    id: 1,
    name: "MD Aadil Rizwan",
    designation: "Full stack Developer",
    image:
      "/pc.jpg",
  },
  {
    id: 2,
    name: "Mohammad Mojij Ansari",
    designation: "Full Stack Developer",
    image:
      "/pd.jpg",
  },
  {
    id: 3,
    name: "Abdul Samad Ansari",
    designation: "Full Stack Developer",
    image:
      "/pe.jpg",
  },
];

function Instructors() {
  return (
    <div className="h-[25rem] w-full bg-[#171717] flex flex-col items-center justify-center overflow-hidden rounded-md">
      <h1 className="md:text-7xl text-3xl lg:text-4xl font-bold text-center text-white relative z-10">
        Dedicated Team members of Clipsync
      </h1>
      <p
        className="text-base md:text-lg text-white 
       text-center mb-4"
      >

      </p>
      <div className="w-[35rem] h-40 relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
        <div className="absolute inset-0 w-full h-full bg-[#171717] [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)] "></div>
        <div className="flex flex-row items-center justify-center mb-10 w-full">
          <AnimatedTooltip items={instructors} />
        </div>
      </div>
    </div>
  );
}

export default Instructors;
