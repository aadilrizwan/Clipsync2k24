"use client";
import { getWorkSpaces } from "@/actions/workspace";
import { Separator } from "@/components/ui/separator";
import { NotificationProps, WorkspaceProps } from "@/types/index.type";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { Menu, PlusCircle, UploadIcon } from "lucide-react";
import { MENU_ITEMS } from "@/constants";
import SidebarItem from "./sidebar-item";
import { getNotifications } from "@/actions/user";
import { useQueryData } from "@/hooks/useQueryData";
import GlobalCard from "../global-card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import InfoBar from "../info-bar";
import { useDispatch } from "react-redux";
import { WORKSPACES } from "@/redux/slices/workspaces";
import PaymentButton from "../payment-button";
import Pluss from "@/components/icons/plus";
import CreateForlders from "../create-folders";
import CreateWorkspace from "../create-workspace";
import VideoRecorderIcon from "@/components/icons/video-recorder";
type Props = {
  activeWorkspaceId: string;
};

const Sidebar = ({ activeWorkspaceId }: Props) => {
  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const { data, isFetched } = useQueryData(["user-workspaces"], getWorkSpaces);
  const menuItems = MENU_ITEMS(activeWorkspaceId);

  const { data: notifications } = useQueryData(
    ["user-notifications"],
    getNotifications
  );

  const { data: workspace } = data as WorkspaceProps;
  const { data: count } = notifications as NotificationProps;

  const onChangeActiveWorkspace = (value: string) => {
    router.push(`/dashboard/${value}`);
  };
  const currentWorkspace = workspace.workspace.find(
    (s) => s.id === activeWorkspaceId
  );

  if (isFetched && workspace) {
    dispatch(WORKSPACES({ workspaces: workspace.workspace }));
  }

  const SidebarSection = (
    <div className="bg-white dark:bg-black flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center">
      <div className="bg-white dark:bg-black p-4 flex gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0 ">
        <Image src="/logo.png" height={43} width={43} alt="logo" />
        <p className="text-2xl font-bold">ClipSync</p>
      </div>
      <div
        onClick={toggleDropdown}
        className="flex justify-center items-center mt-16 cursor-pointer"
      >
        <button className="flex items-center px-4 py-2 bg-white dark:bg-black rounded-3xl shadow-lg hover:shadow-xl hover:shadow-blue-500/50 transition duration-300 border">
          <span className="mr-2">
            <Pluss />
          </span>
          <span className="text-black font-bold dark:text-white">New</span>
        </button>
      </div>

      {dropdownOpen && (
        <div className="mt-6 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg">
          <ul className="py-2">
            <li className="px-4 py-2 cursor-pointer">
              {" "}
              <Button className="bg-black flex items-center gap-2 rounded-xl w-full h-full dark:text-white">
                <VideoRecorderIcon />
                <span className="flex items-center gap-2">Record</span>
              </Button>
            </li>
            <li className="px-4 py-2 cursor-pointer">
              <Button className="bg-black flex items-center gap-2 rounded-xl w-full h-full dark:text-white">
                <UploadIcon size={20} />{" "}
                <span className="flex items-center gap-2">Upload</span>
              </Button>
            </li>
            <li className="px-4 py-2 cursor-pointer">
              <CreateForlders workspaceId={activeWorkspaceId} />
            </li>
            <li className="px-4 py-2 cursor-pointer">
              <CreateWorkspace />
            </li>
          </ul>
        </div>
      )}
      <p className="w-full text-[#9D9D9D] font-bold mt-4">Menu</p>
      <nav className="w-full">
        <ul>
          {menuItems.map((item) => (
            <SidebarItem
              href={item.href}
              icon={item.icon}
              selected={pathName === item.href}
              title={item.title}
              key={item.title}
              notifications={
                (item.title === "Notifications" &&
                  count._count &&
                  count._count.notification) ||
                0
              }
            />
          ))}
        </ul>
      </nav>
      <Separator className="w-4/5" />
      {workspace.subscription?.plan === "FREE" && (
        <GlobalCard
          title="Unlock Pro Features"
          description=" Access AI-driven features such as transcription and content summaries"
          footer={<PaymentButton />}
        />
      )}
    </div>
  );
  return (
    <div className="full">
      <InfoBar activeWorkspaceId = {activeWorkspaceId}/>
      <div className="md:hidden fixed my-4">
        <Sheet>
          <SheetTrigger asChild className="ml-2">
            <Button variant={"ghost"} className="mt-[2px]">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"} className="p-0 w-fit h-full">
            {SidebarSection}
          </SheetContent>
        </Sheet>
      </div>
      <div className="md:block hidden h-full">{SidebarSection}</div>
    </div>
  );
};

export default Sidebar;
