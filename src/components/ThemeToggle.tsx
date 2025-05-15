"use client";

import { useTheme } from "@/components/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="text-sm text-muted-foreground hover:text-primary transition"
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
