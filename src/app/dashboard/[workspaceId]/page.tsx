import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getNotifications } from "@/actions/user";
import {
  getAllUserVideos,
  getWorkspaceFolders,
  getWorkSpaces,
} from "@/actions/workspace";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CreateWorkspace from "@/components/global/create-workspace";
import CreateForlders from "@/components/global/create-folders";
import Folders from "@/components/global/folders";
import VideoSection from "@/components/global/videoSection";

type Props = {
  params: Promise<{ workspaceId: string }>;
};

const Page = async ({ params }: Props) => {
  const { workspaceId } = await params;
  const query = new QueryClient();

  await query.prefetchQuery({
    queryKey: ["workspace-folders"],
    queryFn: () => getWorkspaceFolders(workspaceId),
  });

  await query.prefetchQuery({
    queryKey: ["user-videos"],
    queryFn: () => getAllUserVideos(workspaceId),
  });

  await query.prefetchQuery({
    queryKey: ["videos"],
    queryFn: () => getAllUserVideos(workspaceId),
  });
  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div>
        <Tabs defaultValue="videos" className="mt-2">
          <div className="flex w-full justify-between items-center">
            <TabsList className="bg-neutral-900/30 border border-neutral-900/60 rounded-full p-1 gap-1 flex items-center h-auto">
              <TabsTrigger
                className="px-5 py-1.5 text-xs md:text-sm font-semibold rounded-full text-neutral-400 hover:text-neutral-200 bg-transparent data-[state=active]:bg-neutral-800/80 data-[state=active]:text-neutral-100 transition-all duration-200 shadow-none border border-transparent"
                value="videos"
              >
                Videos
              </TabsTrigger>
              <TabsTrigger
                value="archive"
                className="px-5 py-1.5 text-xs md:text-sm font-semibold rounded-full text-neutral-400 hover:text-neutral-200 bg-transparent data-[state=active]:bg-neutral-800/80 data-[state=active]:text-neutral-100 transition-all duration-200 shadow-none border border-transparent"
              >
                Archive
              </TabsTrigger>
            </TabsList>
            <div className="flex gap-x-3">
              {/* <CreateWorkspace />
              <CreateForlders workspaceId={workspaceId} /> */}
            </div>
          </div>
          <section className="py-8">
            <TabsContent value="videos" className="flex flex-col gap-10">
              <Folders workspaceId={workspaceId} />
              <VideoSection workspaceId={workspaceId} />
            </TabsContent>
          </section>
        </Tabs>
      </div>
    </HydrationBoundary>
  );
};

export default Page;
