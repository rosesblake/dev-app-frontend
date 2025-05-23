"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useModalStore } from "@/lib/stores/modalStore";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function GlobalModal() {
  const { isOpen, content, closeModal } = useModalStore();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogTitle></DialogTitle>
      <DialogContent className="sm:max-w-lg">{content}</DialogContent>
    </Dialog>
  );
}
