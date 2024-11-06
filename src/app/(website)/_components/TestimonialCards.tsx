"use client";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

const hadith = [
  {
    quote:
      "Clipsync allows me to connect more personally with people without having to do 75 different one-on-one calls, which is just impossible at scale",
    name: "MD Aadil Rizwan",
    title: "Web Developer(ClipSync)",
  },
  {
    quote:
      "Clipsync has been the light of my life since you showed me it.I never tire of hearing this from folks. Not even an investor... yet",
    name: "Abdul Samad",
    title: "Full stack Developer",
  },
  {
    quote: "Clipsync enables us to maximize our impact as a distributed company by helping us collaborate and share ideas more easily",
    name: "Mohammad Mojij Ansari",
    title: "Competitive Programmer",
  },
  {
    quote:
      "Clipsync allows me to connect more personally with people without having to do 75 different one-on-one calls, which is just impossible at scale",
    name: "MD Aadil Rizwan",
    title: "Web Developer(ClipSync)",
  },
  {
    quote:
      "Clipsync has been the light of my life since you showed me it.I never tire of hearing this from folks. Not even an investor... yet",
    name: "Abdul Samad",
    title: "Full stack Developer",
  },
  {
    quote: "Clipsync enables us to maximize our impact as a distributed company by helping us collaborate and share ideas more easily",
    name: "Mohammad Mojij Ansari",
    title: "Competitive Programmer",
  },
];
function Feedback() {
  return (
    <div
      className="h-[40rem] w-full dark:bg-black
    dark:bg-grid-white/[0.2] relative flex flex-col
    items-center jusify-center overflow-hidden "
    >
      <h2
        className="text-3xl font-bold text-center
    mb-8 z-10 mt-10"
      >
       Testimonials
      </h2>
      <div
        className="flex justify-center w-full 
      overflow-hidden px-4 sm:px-6 lg:px-8"
      >
        <div className="w-full max-w-6xl">
          <InfiniteMovingCards items={hadith} direction="right" speed="slow" />
        </div>
      </div>
    </div>
  );
}

export default Feedback;
