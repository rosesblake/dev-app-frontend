"use client";

import Link from "next/link";
import { useTheme } from "@/components/shared/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/stores/useAuthStore";
import { useNotificationStore } from "@/lib/stores/notificationStore";
import { toast } from "sonner";
import { useEffect } from "react";
import NotificationsDropdown from "@/components/NotificationsDropdown";
import UserDropdown from "./UserDropdown";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { currentUser } = useAuthStore();
  const { notifications, fetchNotifications, clearNotifications } =
    useNotificationStore();

  useEffect(() => {
    if (!currentUser) {
      clearNotifications();
      return;
    }

    fetchNotifications(currentUser.id).then(() => {
      if (notifications.length > 0) {
        toast(`You have ${notifications.length} new application(s)`);
      }
    });
  }, [currentUser, fetchNotifications, clearNotifications]);

  return (
    <header className="fixed w-full border-b border-border bg-background z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-primary"
          >
            DevMatch
          </Link>

          <Button
            onClick={toggleTheme}
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === "dark" ? (
                <motion.span
                  key="sun"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun size={16} />
                </motion.span>
              ) : (
                <motion.span
                  key="moon"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon size={16} />
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </div>

        <div className="flex items-center gap-4 text-sm">
          {currentUser ? (
            <>
              <UserDropdown />
              <NotificationsDropdown notifications={notifications} />
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-primary transition">
                Log In
              </Link>
              <Link href="/register">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
