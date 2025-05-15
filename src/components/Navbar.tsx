"use client";

import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const isLoggedIn = true;

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed w-full border-b border-border bg-sidebar z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-primary"
          >
            DevMatch
          </Link>

          <button
            onClick={toggleTheme}
            className="relative w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-primary transition"
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
          </button>
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
              <div className="bg-muted px-3 py-1.5 rounded-md font-medium text-foreground">
                Blake Roses
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-primary transition">
                Log In
              </Link>
              <Link
                href="/signup"
                className="bg-primary text-primary-foreground px-3 py-1.5 rounded-md font-medium"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
