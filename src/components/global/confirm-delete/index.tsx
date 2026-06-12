"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  loading?: boolean;
};

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  loading,
}: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-[#09090b]/95 border border-neutral-900 rounded-2xl shadow-xl max-w-md w-full p-6 text-neutral-200 focus:outline-none">
        <DialogHeader className="gap-2">
          <DialogTitle className="text-lg font-bold text-neutral-100">{title}</DialogTitle>
          <DialogDescription className="text-neutral-400 text-sm leading-relaxed">{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-3 mt-6 justify-end">
          <Button
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            disabled={loading}
            className="border-neutral-850 hover:border-neutral-800 bg-transparent hover:bg-neutral-900 text-neutral-300 hover:text-white rounded-xl px-5 h-10"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={(e) => {
              e.stopPropagation();
              onConfirm();
            }}
            disabled={loading}
            className="bg-rose-600 hover:bg-rose-500 text-white border-none rounded-xl px-5 h-10 flex items-center gap-1.5 font-semibold transition"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
