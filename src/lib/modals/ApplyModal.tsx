"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useApplyModal } from "@/lib/stores/useApplyModal";

export default function ApplyModal() {
  const { isOpen, projectId, closeModal } = useApplyModal();

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent>
        <DialogTitle>Apply to Project {projectId}</DialogTitle>
        <DialogDescription>
          Tell the project creator why you’d be a good fit.
        </DialogDescription>

        <p className="text-sm mt-2">Pitch yourself here!</p>

        <button onClick={closeModal} className="mt-4 underline text-sm">
          Close
        </button>
      </DialogContent>
    </Dialog>
  );
}
