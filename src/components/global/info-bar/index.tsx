"use client";
import VideoRecorderIcon from "@/components/icons/video-recorder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserButton } from "@clerk/nextjs";
import { PlusCircle, UploadIcon, Search } from "lucide-react";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { getWorkSpaces } from "@/actions/workspace";
import { usePathname, useRouter } from "next/navigation";
import { NotificationProps, WorkspaceProps } from "@/types/index.type";
import { MENU_ITEMS } from "@/constants";
import { useQueryData } from "@/hooks/useQueryData";
import { getNotifications } from "@/actions/user";
import { useDispatch } from "react-redux";
import Modal from "../modal";
import { WORKSPACES } from "@/redux/slices/workspaces";
import Invite from "../search";

type Props = {
  activeWorkspaceId: string;
};
const InfoBar = ({ activeWorkspaceId }: Props) => {
  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useDispatch();
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

  // console.log(activeWorkspaceId);

  return (
    <header className="pl-16 md:pl-6 md:left-[250px] left-0 right-0 fixed top-0 h-20 bg-[#04060A]/85 backdrop-blur-md border-b border-neutral-900/40 flex items-center justify-between gap-4 z-40 transition-all duration-200">
      <div className="flex gap-2.5 items-center bg-neutral-900/30 border border-neutral-800/80 hover:border-neutral-700/60 focus-within:border-indigo-500/40 focus-within:ring-1 focus-within:ring-indigo-500/30 rounded-xl px-3.5 py-1 w-full max-w-md transition-all duration-200">
        <Search size={16} className="text-neutral-500" />
        <Input
          className="bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 !placeholder-neutral-500 h-8 text-sm px-0 py-0 dark:text-neutral-200"
          placeholder="Search for projects, tags, folders..."
        />
      </div>
      <div className="flex items-center gap-4">
        {currentWorkspace?.type === "PUBLIC" &&
          workspace.subscription?.plan === "PRO" && (
            <Modal
              trigger={
                <span className="text-xs font-semibold cursor-pointer flex items-center justify-center dark:bg-neutral-900/50 dark:hover:bg-neutral-900/80 hover:text-neutral-200 text-neutral-400 rounded-xl px-4 py-2 gap-2 border border-neutral-800/80 hover:border-neutral-700/80 transition-all duration-200">
                  <PlusCircle
                    size={16}
                    className="text-neutral-400"
                  />
                  <span>
                    Invite to Workspace
                  </span>
                </span>
              }
              title="Invite to Join Workspace"
              description="Invite other users to your workspace"
            >
              <Invite workspaceId={activeWorkspaceId} />
            </Modal>
          )}
        <Select
          defaultValue={activeWorkspaceId}
          onValueChange={onChangeActiveWorkspace}
        >
          <SelectTrigger className="dark:text-neutral-300 text-black bg-neutral-900/30 dark:border-neutral-800/80 hover:bg-neutral-900/60 transition-colors rounded-xl px-3 py-1.5 focus:ring-1 focus:ring-indigo-500/50 w-[180px]">
            <SelectValue
              className="text-indigo-400"
              placeholder="Select a workspace"
            />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-[#09090b]/95 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xl">
            <SelectGroup>
              <SelectLabel className="text-xs text-neutral-500 uppercase tracking-wider font-semibold px-2 py-1.5">Workspaces</SelectLabel>
              <Separator className="bg-neutral-200 dark:bg-neutral-800/80 my-1" />
              {workspace.workspace.map((workspace) => (
                <SelectItem value={workspace.id} key={workspace.id} className="text-sm rounded-lg my-0.5 focus:bg-neutral-900 focus:text-neutral-100">
                  {workspace.name}
                </SelectItem>
              ))}
              {workspace.members.length > 0 &&
                workspace.members.map(
                  (workspace) =>
                    workspace.WorkSpace && (
                      <SelectItem
                        value={workspace.WorkSpace.id}
                        key={workspace.WorkSpace.id}
                        className="text-sm rounded-lg my-0.5 focus:bg-neutral-900 focus:text-neutral-100"
                      >
                        {workspace.WorkSpace.name}
                      </SelectItem>
                    )
                )}
            </SelectGroup>
          </SelectContent>
        </Select>
        <UserButton />
      </div>
    </header>
  );
};

export default InfoBar;
