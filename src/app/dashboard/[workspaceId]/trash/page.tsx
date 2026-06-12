"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  getDeletedItems, 
  restoreWorkspace, 
  permanentlyDeleteWorkspace, 
  restoreFolder, 
  permanentlyDeleteFolder, 
  restoreVideo, 
  permanentlyDeleteVideo 
} from "@/actions/workspace";
import { Folder, Video, Layers, RotateCcw, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import ConfirmDeleteModal from "@/components/global/confirm-delete";

type DeletedWorkspace = {
  id: string;
  name: string;
  type: string;
  createdAt: Date;
};

type DeletedFolder = {
  id: string;
  name: string;
  createdAt: Date;
};

type DeletedVideo = {
  id: string;
  title: string | null;
  source: string;
  createdAt: Date;
};

export default function TrashPage() {
  const params = useParams();
  const router = useRouter();
  const workspaceId = params?.workspaceId as string;

  const [activeTab, setActiveTab] = useState<"videos" | "folders" | "workspaces">("videos");
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  const [deletedWorkspaces, setDeletedWorkspaces] = useState<DeletedWorkspace[]>([]);
  const [deletedFolders, setDeletedFolders] = useState<DeletedFolder[]>([]);
  const [deletedVideos, setDeletedVideos] = useState<DeletedVideo[]>([]);
  const [confirmDeleteTarget, setConfirmDeleteTarget] = useState<{
    id: string;
    type: "workspace" | "folder" | "video";
    name: string;
  } | null>(null);

  useEffect(() => {
    async function loadTrash() {
      if (!workspaceId) return;
      setLoading(true);
      const res = await getDeletedItems(workspaceId);
      if (res.status === 200 && res.data) {
        setDeletedWorkspaces(res.data.workspaces as DeletedWorkspace[]);
        setDeletedFolders(res.data.folders as DeletedFolder[]);
        setDeletedVideos(res.data.videos as DeletedVideo[]);
      } else {
        toast.error("Failed to load deleted items");
      }
      setLoading(false);
    }
    loadTrash();
  }, [workspaceId]);

  const handleRestoreWorkspace = async (id: string) => {
    setActionId(id);
    const res = await restoreWorkspace(id);
    if (res.status === 200) {
      setDeletedWorkspaces(prev => prev.filter(w => w.id !== id));
      toast.success("Workspace restored successfully");
      router.refresh();
    } else {
      toast.error("Failed to restore workspace");
    }
    setActionId(null);
  };

  const handlePermanentDeleteWorkspace = async (id: string) => {
    setActionId(id);
    const res = await permanentlyDeleteWorkspace(id);
    if (res.status === 200) {
      setDeletedWorkspaces(prev => prev.filter(w => w.id !== id));
      toast.success("Workspace permanently deleted");
      router.refresh();
    } else {
      toast.error("Failed to delete workspace");
    }
    setActionId(null);
  };

  const handleRestoreFolder = async (id: string) => {
    setActionId(id);
    const res = await restoreFolder(id);
    if (res.status === 200) {
      setDeletedFolders(prev => prev.filter(f => f.id !== id));
      toast.success("Folder restored successfully");
      router.refresh();
    } else {
      toast.error("Failed to restore folder");
    }
    setActionId(null);
  };

  const handlePermanentDeleteFolder = async (id: string) => {
    setActionId(id);
    const res = await permanentlyDeleteFolder(id);
    if (res.status === 200) {
      setDeletedFolders(prev => prev.filter(f => f.id !== id));
      toast.success("Folder permanently deleted");
      router.refresh();
    } else {
      toast.error("Failed to delete folder");
    }
    setActionId(null);
  };

  const handleRestoreVideo = async (id: string) => {
    setActionId(id);
    const res = await restoreVideo(id);
    if (res.status === 200) {
      setDeletedVideos(prev => prev.filter(v => v.id !== id));
      toast.success("Video restored successfully");
      router.refresh();
    } else {
      toast.error("Failed to restore video");
    }
    setActionId(null);
  };

  const handlePermanentDeleteVideo = async (id: string) => {
    setActionId(id);
    const res = await permanentlyDeleteVideo(id);
    if (res.status === 200) {
      setDeletedVideos(prev => prev.filter(v => v.id !== id));
      toast.success("Video permanently deleted");
      router.refresh();
    } else {
      toast.error("Failed to delete video");
    }
    setActionId(null);
  };

  const handleConfirmDelete = async () => {
    if (!confirmDeleteTarget) return;
    const { id, type } = confirmDeleteTarget;
    try {
      if (type === "workspace") {
        await handlePermanentDeleteWorkspace(id);
      } else if (type === "folder") {
        await handlePermanentDeleteFolder(id);
      } else if (type === "video") {
        await handlePermanentDeleteVideo(id);
      }
    } catch (error) {
      toast.error(`Failed to delete ${type}`);
    } finally {
      setConfirmDeleteTarget(null);
    }
  };

  const getModalTitleAndDescription = () => {
    if (!confirmDeleteTarget) return { title: "", description: "" };
    const { type, name } = confirmDeleteTarget;
    switch (type) {
      case "workspace":
        return {
          title: `Permanently delete "${name}"?`,
          description: "Are you sure you want to permanently delete this workspace? This action is irreversible and all folders, videos, and settings inside it will be lost forever."
        };
      case "folder":
        return {
          title: `Permanently delete "${name}"?`,
          description: "Are you sure you want to permanently delete this folder? This will permanently delete all videos inside it."
        };
      case "video":
        return {
          title: `Permanently delete "${name}"?`,
          description: "Are you sure you want to permanently delete this video? This action cannot be undone."
        };
      default:
        return { title: "", description: "" };
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-6xl py-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-neutral-100 flex items-center gap-2">
          <Trash2 className="w-6 h-6 text-neutral-400" />
          Trash
        </h1>
        <p className="text-neutral-400 text-sm max-w-2xl leading-relaxed">
          Manage your deleted items. You can restore them back to their original locations or delete them permanently.
        </p>
      </div>

      <div className="flex bg-neutral-900/30 border border-neutral-900/60 rounded-full p-1 gap-1 self-start">
        <button
          onClick={() => setActiveTab("videos")}
          className={`px-5 py-1.5 text-xs md:text-sm font-semibold rounded-full transition-all duration-200 ${
            activeTab === "videos"
              ? "bg-neutral-800/80 text-neutral-100"
              : "text-neutral-400 hover:text-neutral-200 bg-transparent"
          }`}
        >
          Videos ({deletedVideos.length})
        </button>
        <button
          onClick={() => setActiveTab("folders")}
          className={`px-5 py-1.5 text-xs md:text-sm font-semibold rounded-full transition-all duration-200 ${
            activeTab === "folders"
              ? "bg-neutral-800/80 text-neutral-100"
              : "text-neutral-400 hover:text-neutral-200 bg-transparent"
          }`}
        >
          Folders ({deletedFolders.length})
        </button>
        <button
          onClick={() => setActiveTab("workspaces")}
          className={`px-5 py-1.5 text-xs md:text-sm font-semibold rounded-full transition-all duration-200 ${
            activeTab === "workspaces"
              ? "bg-neutral-800/80 text-neutral-100"
              : "text-neutral-400 hover:text-neutral-200 bg-transparent"
          }`}
        >
          Workspaces ({deletedWorkspaces.length})
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
        </div>
      ) : (
        <div className="mt-4">
          {activeTab === "videos" && (
            deletedVideos.length === 0 ? (
              <p className="text-neutral-500 text-sm py-12 text-center border border-dashed border-neutral-900 rounded-2xl">
                No deleted videos found in this workspace.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {deletedVideos.map((video) => (
                  <div key={video.id} className="bg-[#09090b]/45 border border-neutral-900 rounded-2xl p-5 flex flex-col justify-between hover:border-neutral-800 transition duration-300">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-neutral-900 rounded-xl">
                          <Video className="w-5 h-5 text-indigo-400" />
                        </div>
                        <h3 className="font-semibold text-neutral-200 line-clamp-1 text-sm">
                          {video.title || "Untitled Video"}
                        </h3>
                      </div>
                      <p className="text-[10px] text-neutral-500">
                        Deleted: {new Date(video.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex gap-2.5 mt-6 border-t border-neutral-900/50 pt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={actionId === video.id}
                        onClick={() => handleRestoreVideo(video.id)}
                        className="flex-1 bg-transparent hover:bg-neutral-900/60 text-neutral-300 hover:text-white border-neutral-800 rounded-xl"
                      >
                        {actionId === video.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                        ) : (
                          <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                        )}
                        Restore
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        disabled={actionId !== null}
                        onClick={() => setConfirmDeleteTarget({ id: video.id, type: "video", name: video.title || "Untitled Video" })}
                        className="flex-1 bg-rose-950/20 hover:bg-rose-900/40 text-rose-400 hover:text-rose-300 border border-rose-900/30 rounded-xl"
                      >
                        <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

          {activeTab === "folders" && (
            deletedFolders.length === 0 ? (
              <p className="text-neutral-500 text-sm py-12 text-center border border-dashed border-neutral-900 rounded-2xl">
                No deleted folders found in this workspace.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {deletedFolders.map((folder) => (
                  <div key={folder.id} className="bg-[#09090b]/45 border border-neutral-900 rounded-2xl p-5 flex flex-col justify-between hover:border-neutral-800 transition duration-300">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-neutral-900 rounded-xl">
                          <Folder className="w-5 h-5 text-amber-400" />
                        </div>
                        <h3 className="font-semibold text-neutral-200 line-clamp-1 text-sm">
                          {folder.name}
                        </h3>
                      </div>
                      <p className="text-[10px] text-neutral-500">
                        Deleted: {new Date(folder.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex gap-2.5 mt-6 border-t border-neutral-900/50 pt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={actionId === folder.id}
                        onClick={() => handleRestoreFolder(folder.id)}
                        className="flex-1 bg-transparent hover:bg-neutral-900/60 text-neutral-300 hover:text-white border-neutral-800 rounded-xl"
                      >
                        {actionId === folder.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                        ) : (
                          <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                        )}
                        Restore
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        disabled={actionId !== null}
                        onClick={() => setConfirmDeleteTarget({ id: folder.id, type: "folder", name: folder.name })}
                        className="flex-1 bg-rose-950/20 hover:bg-rose-900/40 text-rose-400 hover:text-rose-300 border border-rose-900/30 rounded-xl"
                      >
                        <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

          {activeTab === "workspaces" && (
            deletedWorkspaces.length === 0 ? (
              <p className="text-neutral-500 text-sm py-12 text-center border border-dashed border-neutral-900 rounded-2xl">
                No deleted workspaces found.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {deletedWorkspaces.map((workspace) => (
                  <div key={workspace.id} className="bg-[#09090b]/45 border border-neutral-900 rounded-2xl p-5 flex flex-col justify-between hover:border-neutral-800 transition duration-300">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-neutral-900 rounded-xl">
                          <Layers className="w-5 h-5 text-indigo-400" />
                        </div>
                        <h3 className="font-semibold text-neutral-200 line-clamp-1 text-sm">
                          {workspace.name}
                        </h3>
                      </div>
                      <span className="text-[10px] bg-neutral-900/60 border border-neutral-800/80 px-2 py-0.5 rounded-full text-neutral-400 self-start capitalize">
                        {workspace.type.toLowerCase()}
                      </span>
                    </div>

                    <div className="flex gap-2.5 mt-6 border-t border-neutral-900/50 pt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={actionId === workspace.id}
                        onClick={() => handleRestoreWorkspace(workspace.id)}
                        className="flex-1 bg-transparent hover:bg-neutral-900/60 text-neutral-300 hover:text-white border-neutral-800 rounded-xl"
                      >
                        {actionId === workspace.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                        ) : (
                          <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                        )}
                        Restore
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        disabled={actionId !== null}
                        onClick={() => setConfirmDeleteTarget({ id: workspace.id, type: "workspace", name: workspace.name })}
                        className="flex-1 bg-rose-950/20 hover:bg-rose-900/40 text-rose-400 hover:text-rose-300 border border-rose-900/30 rounded-xl"
                      >
                        <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      )}

      <ConfirmDeleteModal
        isOpen={confirmDeleteTarget !== null}
        onClose={() => setConfirmDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title={getModalTitleAndDescription().title}
        description={getModalTitleAndDescription().description}
        loading={actionId !== null}
      />
    </div>
  );
}