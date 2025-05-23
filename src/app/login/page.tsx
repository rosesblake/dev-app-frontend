"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/lib/stores/useAuthStore";
import api from "@/lib/api";
import { useUiStore } from "@/lib/stores/useUiStore";
import { Spinner } from "@/components/ui/Spinner";
import { cn } from "@/lib/utils"; // if you have clsx or cn helper
import Link from "next/link";
import { useModalStore } from "@/lib/stores/modalStore";

interface LoginPageProps {
  onSuccess?: () => void;
  isModal?: boolean;
}

export default function LoginPage({ onSuccess, isModal }: LoginPageProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setAccessToken, setCurrentUser } = useAuthStore();
  const { isLoading, setLoading } = useUiStore();
  const { closeModal } = useModalStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { access_token } = await api.users.login(email, password);
      setAccessToken(access_token);

      const user = await api.users.getMe(access_token);
      setCurrentUser(user);

      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/");
      }
    } catch (err) {
      setError("Invalid login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className={cn(
        "px-4",
        !isModal && "min-h-screen flex items-center justify-center"
      )}
    >
      <form
        onSubmit={handleLogin}
        className={cn(
          "w-full max-w-sm space-y-6 border border-border bg-card p-6 rounded-xl shadow-md",
          isModal && "mx-auto"
        )}
      >
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Log in</h1>
          <p className="text-sm text-muted-foreground">Access your account</p>
        </div>
        <div className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <Spinner className="w-4 h-4" /> : "Log in"}
        </Button>
        <p className="text-center text-sm">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={() => {
              closeModal();
              router.push("/register");
            }}
            className="text-primary underline hover:text-primary/80"
          >
            Register here
          </button>
        </p>
      </form>
    </main>
  );
}
