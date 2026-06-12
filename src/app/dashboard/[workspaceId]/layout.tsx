import React from "react";
import { redirect } from "next/navigation";
import { getNotifications, onAuthenticateUser } from "@/actions/user";
import Sidebar from "@/components/global/sidebar";
import GlobalHeader from "@/components/global/global-header";
import {
  getAllUserVideos,
  getWorkspaceFolders,
  getWorkSpaces,
  verifyAccessToWorkspace,
} from "@/actions/workspace";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
type Props = {
  params: Promise<{ workspaceId: string }>;
  children: React.ReactNode;
};
const Layout = async ({ params, children }: Props) => {
  const {workspaceId} = await params;
  console.log(workspaceId);
  const auth = await onAuthenticateUser();
  if (!auth.user?.workspace) redirect("/auth/sign-in");
  if (!auth.user.workspace.length) redirect("/auth/sign-in");

  const hasAccess = await verifyAccessToWorkspace(workspaceId);

  if (hasAccess.status !== 200) {
    redirect(`/dashboard/${auth.user?.workspace[0].id}`);
  }

  if (!hasAccess.data?.workspace) return null;
  const query = new QueryClient();

  await query.prefetchQuery({
    queryKey: ["worksapce-folders"],
    queryFn: () => getWorkspaceFolders(workspaceId),
  });

  await query.prefetchQuery({
    queryKey: ["user-videos"],
    queryFn: () => getAllUserVideos(workspaceId),
  });
  await query.prefetchQuery({
    queryKey: ["user-workspaces"],
    queryFn: () => getWorkSpaces(),
  });

  await query.prefetchQuery({
    queryKey: ["user-notifications"],
    queryFn: () => getNotifications(),
  });
  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="flex h-screen w-screen bg-[#04060A] text-neutral-200 antialiased selection:bg-neutral-800 selection:text-neutral-100 overflow-hidden">
        <Sidebar activeWorkspaceId={workspaceId} />
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
          {/* Subtle background glow effects */}
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none z-0" />
          <div className="absolute bottom-0 left-10 w-[350px] h-[350px] bg-emerald-600/5 rounded-full blur-[120px] pointer-events-none z-0" />
          
          <div className="flex-1 pt-28 p-6 overflow-y-auto overflow-x-hidden relative z-10 no-visible-scrollbar">
            <div className="max-w-[1600px] mx-auto w-full flex flex-col">
              <GlobalHeader workspace={hasAccess.data.workspace} />
              <div className="mt-6">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default Layout;
