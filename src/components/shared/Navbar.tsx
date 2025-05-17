"use client";

import Link from "next/link";
import { useTheme } from "@/components/shared/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const isLoggedIn = true;

  return (
    <header className="fixed w-full border-b border-border bg-background z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
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
          {isLoggedIn ? (
            <>
              <Link href="/projects" className="hover:text-primary transition">
                Projects
              </Link>
              <Link href="/profile" className="hover:text-primary transition">
                My Profile
              </Link>
              <span className="cursor-pointer bg-muted rounded-md px-3 py-1.5 text-foreground text-sm font-medium">
                Blake Roses
              </span>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-primary transition">
                Log In
              </Link>
              <Link href="/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
