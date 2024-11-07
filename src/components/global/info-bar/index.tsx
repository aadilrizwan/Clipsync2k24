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
    <header className="pl-20 md:pl-[265px] fixed p-4 w-full flex items-center justify-between gap-4">
      <div className="flex gap-4 items-center border-2 rounded-full px-4 w-full max-w-lg">
        <Search size={20} className="text-[#707070]" />
        <Input
          className="bg-transparent border-none !placeholder-neutral-500"
          placeholder="Search for projects, tags, folders & people"
        />
      </div>
      <div className="flex items-center gap-4">
        {currentWorkspace?.type === "PUBLIC" &&
          workspace.subscription?.plan === "PRO" && (
            <Modal
              trigger={
                <span className="text-sm cursor-pointer flex items-center justify-center dark:bg-neutral-800/90  dark:hover:bg-neutral-800/60 w-full rounded-sm p-[5px] gap-2 border bg-gray-800">
                  <PlusCircle
                    size={30}
                    className="text-neutral-800/90 fill-neutral-500"
                  />
                  <span className="text-neutral-400 font-semibold text-xs">
                    Invite to Join Workspace
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
          <SelectTrigger className="dark:text-neutral-400 text-black bg-transparent border-black">
            <SelectValue
              className="text-blue-400"
              placeholder="Select a workspace"
            />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-black backdrop-blur-xl">
            <SelectGroup>
              <SelectLabel>Workspaces</SelectLabel>
              <Separator />
              {workspace.workspace.map((workspace) => (
                <SelectItem value={workspace.id} key={workspace.id}>
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
