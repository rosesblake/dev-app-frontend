"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";

interface AddProjectButtonProps {
  onClick: () => void;
}

export default function AddProjectButton({ onClick }: AddProjectButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-12 right-12 rounded-full h-16 w-16 p-0 shadow-lg z-50"
      variant="default"
      aria-label="Add new project"
    >
      <Plus className="h-6 w-6" />
    </Button>
  );
}
