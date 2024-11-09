"use client";
import React from "react";
import Loader from "../loader";
import CardMenu from "./video-card-menu";
// import ChangeVideoLocation from '@/components/forms/change-video-location'
import CopyLink from "./copy-link";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dot, Share2, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type Props = {
  User: {
    firstname: string | null;
    lastname: string | null;
    image: string | null;
  } | null;
  id: string;
  Folder: {
    id: string;
    name: string;
  } | null;
  createdAt: Date;
  title: string | null;
  source: string;
  processing: boolean;
  workspaceId?: string;
};

const VideoCard = (props: Props) => {
  const daysAgo = Math.floor(
    (new Date().getTime() - props.createdAt.getTime()) / (24 * 60 * 60 * 1000)
  );

  return (
    <Loader
      className="bg-[#171717] flex justify-center items-center border-[1px] border-[rgb(37,37,37)] rounded-xl"
      // state={props.processing}
      state={false} //TODO: comment this later (Testing purpose)
    >
      <div className=" group overflow-hidden cursor-pointer dark:bg-[#171717] bg-gray-300 relative border-[1px] border-[#252525] flex flex-col rounded-xl">
        <div className="absolute top-3 right-3 z-50 gap-x-3 hidden group-hover:flex">
          <CardMenu
            currentFolderName={props.Folder?.name}
            videoId={props.id}
            currentWorkspace={props.workspaceId}
            currentFolder={props.Folder?.id}
          />
          <CopyLink
            className="p-[5px] h-5 dark:bg-[#252525] bg-transparent hover:bg-transparent "
            videoId={props.id}
          />
        </div>
        <Link
          href={`/dashboard/${props.workspaceId}/video/${props.id}`}
          className="dark:hover:bg-[#252525] transition duration-150 flex flex-col justify-between h-full"
        >
          <div className="p-1">
            <video
              controls={false}
              preload="metadata"
              className="w-full aspect-video z-20 rounded-lg"
            >
              <source src={`${props.source}#t=1`} />
            </video>
          </div>
          <Separator/>
          <div className="px-5 py-3 flex flex-col  z-20">
            <h2 className="text-sm font-semibold dark:text-[#BDBDBD]">
              {props.title}
            </h2>
            <div className="flex gap-x-2 items-center mt-4">
              <Avatar className=" w-8 h-8">
                <AvatarImage src={props.User?.image as string} />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="capitalize text-xs dark:text-[#BDBDBD]">
                  {props.User?.firstname} {props.User?.lastname}
                </p>
                <p className="dark:text-[#6d6b6b]  text-xs flex items-center ">
                  <Dot /> {daysAgo === 0 ? "Today" : `${daysAgo}d ago`}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <span className="flex gap-x-1 items-center">
                <Share2
                  fill="#9D9D9D"
                  className="dark:text-[#9D9D9D]"
                  size={12}
                />
                <p className="text-xs dark:text-[#9D9D9D] capitalize">
                  {props.User?.firstname}
                  {`'s`} Workspace
                </p>
              </span>
            </div>
          </div>
        </Link>
      </div>
    </Loader>
  );
};

export default VideoCard;
