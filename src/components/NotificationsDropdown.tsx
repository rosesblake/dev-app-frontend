"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { ApplicationRead } from "@/types/application";
import { useRouter } from "next/navigation";

type Props = {
  notifications: ApplicationRead[];
};

export default function NotificationsDropdown({ notifications }: Props) {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="relative p-2 rounded hover:bg-muted transition cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5 text-foreground" />
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 inline-flex h-2 w-2 rounded-full bg-red-500" />
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-80 p-4">
        <h4 className="font-medium text-sm mb-2">New Applications</h4>
        <ul className="max-h-64 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((app) => (
              <li key={app.id} className="mb-2 border-b pb-2">
                <div className="text-sm font-semibold">{app.project.title}</div>
                <div className="text-xs text-muted-foreground">
                  from {app.user.name}
                </div>
                <button
                  onClick={() => router.push(`/projects/${app.project.slug}`)}
                  className="cursor-pointer text-blue-500 hover:underline text-xs mt-1"
                >
                  View project
                </button>
              </li>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No new applications</p>
          )}
        </ul>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
