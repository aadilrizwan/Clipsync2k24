import React from "react";
import LandingPageNavBar from "./_components/navbar";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col py-9 px-9 xl:px-20 container bg-black w-full">
      <LandingPageNavBar />
      {children}
    </div>
  );
};

export default Layout;
