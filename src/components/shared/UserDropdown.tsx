"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/useAuthStore";
import api from "@/lib/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useNotificationStore } from "@/lib/stores/notificationStore";

export default function UserDropdown() {
  const router = useRouter();
  const { currentUser, logout } = useAuthStore();
  const { clearNotifications } = useNotificationStore();

  const handleLogout = async () => {
    clearNotifications();
    await api.users.logout();
    logout();
    router.push("/login");
  };

  if (!currentUser) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="px-3 py-1.5 text-foreground text-sm font-medium bg-gray-50"
        >
          {currentUser.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => router.push("/my-projects")}>
          My Projects
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
