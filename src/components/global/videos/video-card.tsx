"use client";
import React, { useState } from "react";
import Loader from "../loader";
import CardMenu from "./video-card-menu";
// import ChangeVideoLocation from '@/components/forms/change-video-location'
import CopyLink from "./copy-link";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dot, Share2, User, Trash2, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { softDeleteVideo } from "@/actions/workspace";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ConfirmDeleteModal from "@/components/global/confirm-delete";

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
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const daysAgo = Math.floor(
    (new Date().getTime() - new Date(props.createdAt).getTime()) / (24 * 60 * 60 * 1000)
  );

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    setIsConfirmOpen(false);
    const res = await softDeleteVideo(props.id);
    if (res.status === 200) {
      toast.success("Video moved to Trash");
      router.refresh();
    } else {
      toast.error("Failed to delete video");
      setIsDeleting(false);
    }
  };

  return (
    <Loader
      className="bg-[#09090b]/45 flex justify-center items-center border border-neutral-900 rounded-2xl"
      state={false} //TODO: comment this later (Testing purpose)
    >
      <div className="group overflow-hidden cursor-pointer bg-neutral-900/10 dark:bg-[#09090b]/45 relative border border-neutral-900 hover:border-neutral-800/80 flex flex-col rounded-2xl transition-all duration-300 hover:shadow-md hover:shadow-neutral-950/20">
        <div className="absolute top-3 right-3 z-50 gap-x-2 hidden group-hover:flex">
          {isDeleting ? (
            <div className="p-[5px] h-7 w-7 flex items-center justify-center dark:bg-neutral-950 bg-white border border-neutral-800 rounded-lg">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-neutral-500" />
            </div>
          ) : (
            <button
              onClick={handleDeleteClick}
              className="p-[5px] h-7 w-7 flex items-center justify-center dark:bg-neutral-950/60 dark:hover:bg-neutral-950 bg-white border border-neutral-800 rounded-lg hover:text-rose-500 transition-all text-neutral-400"
            >
              <Trash2 size={14} />
            </button>
          )}
          <CardMenu
            currentFolderName={props.Folder?.name}
            videoId={props.id}
            currentWorkspace={props.workspaceId}
            currentFolder={props.Folder?.id}
          />
          <CopyLink
            className="p-[5px] h-7 w-7 dark:bg-neutral-950/60 dark:hover:bg-neutral-950 bg-white border border-neutral-800 rounded-lg transition-all"
            videoId={props.id}
          />
        </div>

        <ConfirmDeleteModal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Move Video to Trash"
          description={`Are you sure you want to move "${props.title || "Untitled Video"}" to Trash? You can restore it later from your Trash folder.`}
          loading={isDeleting}
        />
        <Link
          href={`/dashboard/${props.workspaceId}/video/${props.id}`}
          className="transition duration-200 flex flex-col justify-between h-full"
        >
          <div className="p-1 overflow-hidden rounded-t-2xl">
            <video
              controls={false}
              preload="metadata"
              className="w-full aspect-video z-20 rounded-xl group-hover:scale-[1.02] transition-transform duration-300 ease-out"
            >
              <source src={`${props.source}#t=1`} />
            </video>
          </div>
          <Separator className="bg-neutral-900/60" />
          <div className="px-4 py-3.5 flex flex-col z-20">
            <h2 className="text-sm font-semibold dark:text-neutral-200 group-hover:text-neutral-100 transition-colors line-clamp-1">
              {props.title || "Untitled Video"}
            </h2>
            <div className="flex gap-x-2 items-center mt-3">
              <Avatar className="w-7 h-7 border border-neutral-800">
                <AvatarImage src={props.User?.image as string} />
                <AvatarFallback className="bg-neutral-800 text-neutral-400">
                  <User size={14} />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="capitalize text-xs font-semibold dark:text-neutral-300">
                  {props.User?.firstname} {props.User?.lastname}
                </p>
                <p className="dark:text-neutral-500 text-[10px] font-medium flex items-center leading-none mt-0.5">
                  <span>{daysAgo === 0 ? "Today" : `${daysAgo}d ago`}</span>
                </p>
              </div>
            </div>
            <div className="mt-3.5 flex items-center justify-between border-t border-neutral-900/50 pt-2.5">
              <span className="flex gap-x-1 items-center">
                <Share2
                  className="text-neutral-500"
                  size={11}
                />
                <p className="text-[10px] dark:text-neutral-500 font-semibold uppercase tracking-wider capitalize">
                  {props.User?.firstname || "Personal"} Workspace
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
