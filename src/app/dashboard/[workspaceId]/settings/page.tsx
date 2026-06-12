"use client";
import { enableFirstView, getFirstView } from "@/actions/user";

import { DarkMode } from "@/components/theme/dark.mode";
import { LightMode } from "@/components/theme/light-mode";
import { SystemMode } from "@/components/theme/system-mode";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { softDeleteWorkspace } from "@/actions/workspace";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmDeleteModal from "@/components/global/confirm-delete";

const SettingsPage = () => {
  const [firstView, setFirstView] = useState<undefined | boolean>(undefined);
  const { setTheme, theme } = useTheme();
  const params = useParams();
  const router = useRouter();
  const workspaceId = params?.workspaceId as string;
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  useEffect(() => {
    if (firstView !== undefined) return;
    const fetchData = async () => {
      const response = await getFirstView();
      if (response.status === 200) setFirstView(response?.data);
    };
    fetchData();
  }, [firstView]);

  const switchState = async (checked: boolean) => {
    const view = await enableFirstView(checked);
    if (view) {
      toast(view.status === 200 ? "Success" : "Failed", {
        description: view.data,
      });
    }
  };

  const handleDeleteClick = () => {
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    setIsConfirmOpen(false);
    const res = await softDeleteWorkspace(workspaceId);
    if (res.status === 200) {
      toast.success("Workspace moved to Trash");
      router.push("/dashboard");
    } else {
      toast.error("Failed to delete workspace");
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-neutral-100">Interface Theme</h3>
        <p className="text-neutral-400 text-sm leading-relaxed">
          Customize how ClipSync looks on your device. Choose between Light, Dark, or System configurations.
        </p>
        <div className="flex flex-wrap gap-6 mt-3">
          {/* System Mode Card */}
          <div className="flex flex-col items-center gap-2">
            <div
              className={cn(
                "rounded-xl overflow-hidden cursor-pointer border transition-all duration-200 hover:scale-[1.01]",
                theme == "system" 
                  ? "border-indigo-500 ring-2 ring-indigo-500/20" 
                  : "border-neutral-900 hover:border-neutral-800"
              )}
              onClick={() => setTheme("system")}
            >
              <SystemMode />
            </div>
            <span className={cn(
              "text-[10px] font-bold uppercase tracking-wider",
              theme == "system" ? "text-indigo-400" : "text-neutral-500"
            )}>
              System
            </span>
          </div>

          {/* Light Mode Card */}
          <div className="flex flex-col items-center gap-2">
            <div
              className={cn(
                "rounded-xl overflow-hidden cursor-pointer border transition-all duration-200 hover:scale-[1.01]",
                theme == "light" 
                  ? "border-indigo-500 ring-2 ring-indigo-500/20" 
                  : "border-neutral-900 hover:border-neutral-800"
              )}
              onClick={() => setTheme("light")}
            >
              <LightMode />
            </div>
            <span className={cn(
              "text-[10px] font-bold uppercase tracking-wider",
              theme == "light" ? "text-indigo-400" : "text-neutral-500"
            )}>
              Light
            </span>
          </div>

          {/* Dark Mode Card */}
          <div className="flex flex-col items-center gap-2">
            <div
              className={cn(
                "rounded-xl overflow-hidden cursor-pointer border transition-all duration-200 hover:scale-[1.01]",
                theme == "dark" 
                  ? "border-indigo-500 ring-2 ring-indigo-500/20" 
                  : "border-neutral-900 hover:border-neutral-800"
              )}
              onClick={() => setTheme("dark")}
            >
              <DarkMode />
            </div>
            <span className={cn(
              "text-[10px] font-bold uppercase tracking-wider",
              theme == "dark" ? "text-indigo-400" : "text-neutral-500"
            )}>
              Dark
            </span>
          </div>
        </div>
      </div>

      <div className="bg-[#09090b]/40 backdrop-blur-sm border border-neutral-900 rounded-2xl p-6 flex flex-col gap-4 max-w-2xl mt-4">
        <div>
          <h2 className="text-base font-semibold text-neutral-100">
            Video Sharing Preferences
          </h2>
          <p className="text-neutral-400 text-xs leading-relaxed mt-1">
            Activating this feature will send you a notification the first time someone watches your video. It can be a valuable tool for client outreach.
          </p>
        </div>
        <div className="border-t border-neutral-900/60 pt-4 mt-2">
          <Label className="flex items-center justify-between cursor-pointer group">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold text-neutral-300 group-hover:text-neutral-200 transition-colors">
                Enable First View Notifications
              </span>
              <span className="text-xs text-neutral-500">
                Receive instant alerts on initial audience views
              </span>
            </div>
            <Switch
              onCheckedChange={switchState}
              disabled={firstView === undefined}
              checked={firstView}
              onClick={() => setFirstView(!firstView)}
              className="data-[state=checked]:bg-indigo-600"
            />
          </Label>
        </div>
      </div>

      <div className="bg-rose-950/10 backdrop-blur-sm border border-rose-900/30 rounded-2xl p-6 flex flex-col gap-4 max-w-2xl mt-4">
        <div>
          <h2 className="text-base font-semibold text-rose-400">
            Danger Zone
          </h2>
          <p className="text-neutral-400 text-xs leading-relaxed mt-1">
            Moving this workspace to Trash will hide it from your active list. You can restore it from the Trash page if needed.
          </p>
        </div>
        <div className="border-t border-rose-900/20 pt-4 mt-2 flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold text-neutral-300">
              Delete Workspace
            </span>
            <span className="text-xs text-neutral-500">
              Move this workspace and all its contents to trash
            </span>
          </div>
          <Button
            variant="destructive"
            disabled={isDeleting}
            onClick={handleDeleteClick}
            className="bg-rose-950/20 hover:bg-rose-900/40 text-rose-400 hover:text-rose-300 border border-rose-900/30 rounded-xl px-5 py-2 font-medium transition duration-200"
          >
            {isDeleting ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2 animate-duration-1000" />
            ) : null}
            Delete Workspace
          </Button>
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Move Workspace to Trash"
        description="Are you sure you want to move this workspace to Trash? You will be automatically redirected to your dashboard home."
        loading={isDeleting}
      />
    </div>
  );
};

export default SettingsPage;
