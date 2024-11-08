"use client";

import Image from "next/image";
import { Tabs } from "./ui/tabs";

export function TabsDemo() {
  const tabs = [
    {
      title: "Home",
      value: "Home",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-black to-gray-500">
          <p>Home Page</p>
          <Home />
        </div>
      ),
    },
    {
      title: "clipvault",
      value: "clipvault",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-black to-gray-500">
          <p> My clipvault</p>
          <ClipVault />
        </div>
      ),
    },
    {
      title: "video",
      value: "video",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-black to-gray-500">
          <p>Video section</p>
          <Video />
        </div>
      ),
    },
    {
      title: "payment",
      value: "payment",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-black to-gray-500">
          <p> Stripe Payment</p>
          <Payment />
        </div>
      ),
    },
    {
      title: "settings",
      value: "settings",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-black to-gray-500">
          <p>Settings </p>
          <Settings />
        </div>
      ),
    },
  ];

  return (
    <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-40">
      <Tabs tabs={tabs} />
    </div>
  );
}

const Home = () => {
  return (
    <Image
      src="/main.png"
      alt="image"
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  );
};

const ClipVault = () => {
  return (
    <Image
      src="/home.png"
      alt="image"
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  );
};

const Video = () => {
  return (
    <Image
      src="/video.png"
      alt="image"
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  );
};

const Payment = () => {
  return (
    <Image
      src="/stripe.png"
      alt="image"
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  );
};
const Settings = () => {
  return (
    <Image
      src="/settings.png"
      alt="image"
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  );
};
