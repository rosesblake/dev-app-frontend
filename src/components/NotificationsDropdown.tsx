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

  if (notifications.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="relative p-2 rounded hover:bg-muted transition cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5 text-foreground" />
          <span className="absolute top-0 right-0 inline-flex h-2 w-2 rounded-full bg-red-500" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-80 p-4">
        <h4 className="font-medium text-sm mb-2">New Applications</h4>
        <ul className="max-h-64 overflow-y-auto">
          {notifications.map((app) => (
            <li key={app.id} className="mb-2 border-b pb-2">
              <div className="text-sm font-semibold">{app.project.title}</div>
              <div className="text-xs text-muted-foreground">
                from {app.user.name}
              </div>
              <button
                onClick={() => router.push(`/projects/${app.project.slug}`)}
                className="cursor-pointer text-sm font-medium text-blue-500 hover:text-primary/80 transition-colors"
              >
                View project →
              </button>
            </li>
          ))}
        </ul>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
