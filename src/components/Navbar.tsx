"use client";

import Link from "next/link";

// TEMP: replace with real session state when ready
const isLoggedIn = true;

export default function Navbar() {
  return (
    <header className="fixed w-full border-b border-border bg-background z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Left: Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-primary"
        >
          DevMatch
        </Link>

        {/* Right: Auth or Account Nav */}
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
