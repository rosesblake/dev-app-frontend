"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/lib/stores/useAuthStore";
import api from "@/lib/api";
import { useUiStore } from "@/lib/stores/useUiStore";
import Link from "next/link";
import { stackOptions, roleOptions } from "@/lib/constants";
import { MultiSelect } from "@/components/shared/MultiSelect";

export default function RegisterPage() {
  const router = useRouter();
  const { setAccessToken, setCurrentUser } = useAuthStore();
  const { setLoading } = useUiStore();
  const [form, setForm] = useState({
    name: "",
    email: "",
    stack: [] as string[],
    role: [] as string[],
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.users.register(form);
      const { access_token } = await api.users.login(form.email, form.password);
      setAccessToken(access_token);

      const user = await api.users.getMe(access_token);
      setCurrentUser(user);

      router.push("/");
    } catch (err) {
      setError("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const mappedStackOptions = stackOptions.map((opt) => ({
    label: opt,
    value: opt,
  }));
  const mappedRoleOptions = roleOptions.map((opt) => ({
    label: opt,
    value: opt,
  }));

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-sm space-y-6 border border-border bg-card p-6 rounded-xl shadow-md"
      >
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-sm text-muted-foreground">Join the platform</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-1">
            <Label>Tech Stack</Label>
            <MultiSelect
              options={mappedStackOptions}
              values={form.stack}
              onChange={(stack) => setForm((f) => ({ ...f, stack }))}
              placeholder="Select your tech stack"
            />
          </div>

          <div className="space-y-1">
            <Label>Role</Label>
            <MultiSelect
              options={mappedRoleOptions}
              values={form.role}
              onChange={(role) => setForm((f) => ({ ...f, role }))}
              placeholder="Select your role(s)"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" className="w-full">
          Register
        </Button>
        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link
            href={"/login"}
            className="text-primary underline hover:text-primary/80"
          >
            Login here
          </Link>
        </p>
      </form>
    </main>
  );
}
