"use client";
import { getPreviewVideo, sendEmailForFirstView, softDeleteVideo } from "@/actions/workspace";
import { useQueryData } from "@/hooks/useQueryData";
import { VideoProps } from "@/types/index.type";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CopyLink from "../copy-link";
import RichLink from "../rich-link";
import { truncateString } from "@/lib/utils";
import { Download, Trash2, Loader2, User } from "lucide-react";
import TabMenu from "../../tabs";
import AiTools from "../../ai-tools";
import VideoTranscript from "../../video-transcript";
import { TabsContent } from "@/components/ui/tabs";
import Activities from '../../activities'
import EditVideo from "../edit";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import ConfirmDeleteModal from "@/components/global/confirm-delete";

type Props = {
  videoId: string;
};

const VideoPreview = ({ videoId }: Props) => {
  const router = useRouter();
  const params = useParams();
  const workspaceId = params?.workspaceId as string;
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const { data } = useQueryData(["preview-video"], () =>
    getPreviewVideo(videoId)
  );

  console.log("Data from Preview ", data)

  const notifyFirstView = async () => await sendEmailForFirstView(videoId)

  const { data: video, status, author } = data as VideoProps;
  if (status !== 200) router.push("/");

  const daysAgo = Math.floor(
    (new Date().getTime() - new Date(video.createdAt).getTime()) / (24 * 60 * 60 * 1000)
  );

  useEffect(() => {
    if (video.views === 0) {
      notifyFirstView()
    }
    return () => {
      notifyFirstView()
    }
  }, [])

  const handleDeleteClick = () => {
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    setIsConfirmOpen(false);
    const res = await softDeleteVideo(videoId);
    if (res.status === 200) {
      toast.success("Video moved to Trash");
      router.push(`/dashboard/${workspaceId}`);
    } else {
      toast.error("Failed to delete video");
      setIsDeleting(false);
    }
  };

  console.log("Video URL ", video.source)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 py-6 overflow-y-auto gap-8">
      {/* Left side - video player and details */}
      <div className="flex flex-col lg:col-span-2 gap-y-6">
        <div className="flex flex-col gap-4">
          <div className="flex gap-x-5 items-start justify-between">
            <h1 className="text-neutral-100 text-2xl md:text-3xl font-extrabold tracking-tight">
              {video.title}
            </h1>
            {author && (
              <EditVideo
                videoId={videoId}
                title={video.title as string}
                description={video.description as string}
              />
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <Avatar className="w-9 h-9 border border-neutral-800">
              <AvatarImage src={video.User?.image as string} />
              <AvatarFallback className="bg-neutral-800 text-neutral-450">
                <User size={16} />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-neutral-200 text-sm font-semibold capitalize">
                {video.User?.firstname} {video.User?.lastname}
              </p>
              <p className="text-neutral-500 text-[11px] font-medium">
                Uploaded {daysAgo === 0 ? "today" : `${daysAgo} days ago`} &middot; {video.views} views
              </p>
            </div>
          </div>
        </div>

        {/* Video Player */}
        <div className="relative rounded-2xl overflow-hidden border border-neutral-900 bg-[#09090b]/40 backdrop-blur-sm p-1.5 shadow-xl hover:shadow-2xl transition duration-300">
          <video
            preload="auto"
            className="w-full aspect-video rounded-xl shadow-inner"
            controls
          >
            <source
              src={`${video.source}#t=1`}
            />
          </video>
        </div>

        {/* Description container */}
        <div className="bg-[#09090b]/20 border border-neutral-900 rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-neutral-900/60 pb-3">
            <p className="text-neutral-300 text-sm font-semibold">Description</p>
            {author && (
              <EditVideo
                videoId={videoId}
                title={video.title as string}
                description={video.description as string}
              />
            )}
          </div>
          <p className="text-neutral-400 text-sm font-normal leading-relaxed whitespace-pre-line">
            {video.description || "No description provided."}
          </p>
        </div>
      </div>

      {/* Right side - actions & tabs */}
      <div className="lg:col-span-1 flex flex-col gap-y-6">
        {/* Actions panel */}
        <div className="flex flex-wrap items-center gap-3 bg-[#09090b]/20 border border-neutral-900 rounded-2xl p-4 justify-between">
          <div className="flex items-center gap-2.5">
            <CopyLink
              variant="outline"
              className="rounded-xl border border-neutral-800 bg-transparent hover:bg-neutral-900 text-xs font-semibold px-4"
              videoId={videoId}
            />
            <RichLink
              description={truncateString(video.description as string, 150)}
              id={videoId}
              source={video.source}
              title={video.title as string}
            />
            <a
              href={video.source}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-2.5 rounded-xl border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900 text-neutral-400 hover:text-neutral-200 transition-all"
              title="Download Video"
            >
              <Download className="w-4 h-4" />
            </a>
          </div>

          {author && (
            <Button
              variant="destructive"
              disabled={isDeleting}
              onClick={handleDeleteClick}
              className="bg-rose-950/20 hover:bg-rose-900/40 text-rose-400 hover:text-rose-300 border border-rose-900/30 rounded-xl px-4 py-2 text-xs font-semibold flex items-center gap-1.5 h-auto"
            >
              {isDeleting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Trash2 className="w-3.5 h-3.5" />
              )}
              Delete Video
            </Button>
          )}
        </div>

        {/* Tab options menu */}
        <div className="bg-[#09090b]/40 border border-neutral-900 rounded-2xl p-4 backdrop-blur-sm">
          <TabMenu
            defaultValue="Ai tools"
            triggers={["Ai tools", "Transcript", "Activity"]}
          >
            <AiTools
              videoId={videoId}
              trial={video.User?.trial!}
              plan={video.User?.subscription?.plan!}
            />
            <VideoTranscript transcript={video.summery!} />
            <Activities
              author={video.User?.firstname as string}
              videoId={videoId}
            />
          </TabMenu>
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Move Video to Trash"
        description={`Are you sure you want to move the video "${video.title || "Untitled Video"}" to Trash? You can restore it later from your Trash folder.`}
        loading={isDeleting}
      />
    </div>
  );
};

export default VideoPreview;
