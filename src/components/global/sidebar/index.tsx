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
    <div className="bg-white dark:bg-[#09090b]/80 backdrop-blur-lg dark:border-neutral-900/60 flex-none p-4 h-full w-[250px] flex flex-col gap-4 items-center border-r transition-all duration-300">
      <div className="w-full p-4 flex gap-2 justify-center items-center border-b dark:border-neutral-900/40 mb-2">
        <Image src="/logo.png" height={43} width={43} alt="logo" />
        <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">ClipSync</p>
      </div>
      
      <div className="w-full relative px-2">
        <div
          onClick={toggleDropdown}
          className="flex justify-center items-center cursor-pointer w-full"
        >
          <button className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-neutral-900/60 dark:bg-neutral-900/40 hover:bg-neutral-800/80 dark:hover:bg-neutral-800/50 text-neutral-900 dark:text-neutral-200 rounded-xl transition-all duration-200 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md font-semibold text-sm">
            <Menu className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
            <span>Actions</span>
          </button>
        </div>

        {dropdownOpen && (
          <div className="absolute top-[50px] left-0 right-0 z-50 bg-white dark:bg-[#09090b]/95 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xl p-2 transition-all">
            <ul className="flex flex-col gap-1.5">
              <li>
                <Button className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 flex items-center justify-start gap-2.5 rounded-lg w-full h-full text-neutral-200 hover:text-white transition px-3 py-2 text-sm font-medium">
                  <VideoRecorderIcon />
                  <span>Record</span>
                </Button>
              </li>
              <li>
                <Button className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 flex items-center justify-start gap-2.5 rounded-lg w-full h-full text-neutral-200 hover:text-white transition px-3 py-2 text-sm font-medium">
                  <UploadIcon size={16} className="text-neutral-400" />
                  <span>Upload</span>
                </Button>
              </li>
              <li className="px-1 py-0.5">
                <CreateForlders workspaceId={activeWorkspaceId} />
              </li>
              <li className="px-1 py-0.5">
                <CreateWorkspace />
              </li>
            </ul>
          </div>
        )}
      </div>
      
      <p className="w-full text-neutral-400 dark:text-neutral-500 font-semibold text-xs uppercase tracking-wider mt-4 px-2">Menu</p>
      
      <nav className="w-full flex-1">
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
      
      <Separator className="w-4/5 bg-neutral-200 dark:bg-neutral-800/80" />
      
      {workspace.subscription?.plan === "FREE" && (
        <div className="w-full px-2 pb-4">
          <GlobalCard
            title="Unlock Pro Features"
            description="Access AI-driven features such as transcription and content summaries"
            footer={<PaymentButton />}
          />
        </div>
      )}
    </div>
  );
  return (
    <div className="h-full md:w-[250px] md:flex-none">
      <InfoBar activeWorkspaceId = {activeWorkspaceId}/>
      <div className="md:hidden fixed my-4">
        <Sheet>
          <SheetTrigger asChild className="ml-2">
            <Button variant={"ghost"} className="mt-[2px]">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"} className="p-0 w-fit h-full border-none">
            {SidebarSection}
          </SheetContent>
        </Sheet>
      </div>
      <div className="md:block hidden h-full">{SidebarSection}</div>
    </div>
  );
};

export default Sidebar;
